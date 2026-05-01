import Stripe from 'stripe'
import { Resend } from 'resend'

export const config = {
  api: {
    bodyParser: false
  }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const FROM_EMAIL = process.env.FROM_EMAIL || 'Le Nid <onboarding@resend.dev>'

async function readRawBody(req) {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

function fmtAmount(amount, currency = 'eur') {
  if (amount == null) return '—'
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency.toUpperCase()
  }).format(amount / 100)
}

async function sendMail({ subject, html }) {
  if (!ADMIN_EMAIL || !process.env.RESEND_API_KEY) {
    console.warn('[mail] missing ADMIN_EMAIL or RESEND_API_KEY — skipping')
    return
  }
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject,
      html
    })
  } catch (err) {
    console.error('[mail] send error', err)
  }
}

function row(label, value) {
  return `<tr>
    <td style="padding:8px 12px;border-bottom:1px solid #ECE6DC;color:#8A8278;font-size:13px;">${label}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #ECE6DC;color:#1F1B17;font-size:14px;font-weight:500;">${value ?? '—'}</td>
  </tr>`
}

function emailLayout({ title, accent, rows, footer }) {
  return `<!doctype html><html><body style="margin:0;background:#F7F4EF;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;padding:32px 16px;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:20px;overflow:hidden;border:1px solid #ECE6DC;">
      <div style="background:${accent};padding:24px 28px;color:#fff;">
        <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;opacity:.8;">Le Nid · Stripe</div>
        <div style="font-family:Georgia,serif;font-size:22px;margin-top:6px;">${title}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;">${rows.join('')}</table>
      ${footer ? `<div style="padding:16px 28px;color:#8A8278;font-size:12px;border-top:1px solid #ECE6DC;">${footer}</div>` : ''}
    </div>
  </body></html>`
}

async function handleEvent(event) {
  const obj = event.data.object

  switch (event.type) {
    case 'checkout.session.completed': {
      const subject = `💰 Nouveau paiement — ${fmtAmount(obj.amount_total, obj.currency)}`
      const rows = [
        row('Client', obj.customer_details?.email || obj.customer_email || '—'),
        row('Nom', obj.customer_details?.name || '—'),
        row('Montant', fmtAmount(obj.amount_total, obj.currency)),
        row('Mode', obj.payment_method_types?.join(', ') || '—'),
        row('Session ID', obj.id),
        row('Payment Intent', obj.payment_intent || '—')
      ]
      await sendMail({
        subject,
        html: emailLayout({
          title: 'Paiement réussi 🎉',
          accent: '#8AA68A',
          rows,
          footer: 'Pense à confirmer la date d’intervention avec le client.'
        })
      })
      break
    }

    case 'payment_intent.payment_failed': {
      const subject = `❌ Paiement échoué — ${fmtAmount(obj.amount, obj.currency)}`
      const rows = [
        row('Client', obj.receipt_email || obj.charges?.data?.[0]?.billing_details?.email || '—'),
        row('Montant', fmtAmount(obj.amount, obj.currency)),
        row('Raison', obj.last_payment_error?.message || '—'),
        row('Code', obj.last_payment_error?.code || '—'),
        row('Payment Intent', obj.id)
      ]
      await sendMail({
        subject,
        html: emailLayout({
          title: 'Paiement échoué',
          accent: '#C77B5C',
          rows
        })
      })
      break
    }

    case 'charge.refunded': {
      const subject = `💸 Remboursement — ${fmtAmount(obj.amount_refunded, obj.currency)}`
      const rows = [
        row('Client', obj.billing_details?.email || '—'),
        row('Montant remboursé', fmtAmount(obj.amount_refunded, obj.currency)),
        row('Montant initial', fmtAmount(obj.amount, obj.currency)),
        row('Charge ID', obj.id)
      ]
      await sendMail({
        subject,
        html: emailLayout({
          title: 'Remboursement effectué',
          accent: '#A85F42',
          rows
        })
      })
      console.log('[stripe] refund', obj.id, obj.amount_refunded)
      break
    }

    case 'charge.dispute.created': {
      const subject = `🚨 URGENT — Litige ouvert ${fmtAmount(obj.amount, obj.currency)}`
      const rows = [
        row('Montant', fmtAmount(obj.amount, obj.currency)),
        row('Raison', obj.reason || '—'),
        row('Statut', obj.status || '—'),
        row('Charge', obj.charge || '—'),
        row('Dispute ID', obj.id),
        row('Échéance', obj.evidence_details?.due_by
          ? new Date(obj.evidence_details.due_by * 1000).toLocaleString('fr-FR')
          : '—')
      ]
      await sendMail({
        subject,
        html: emailLayout({
          title: 'Litige Stripe — action requise',
          accent: '#A85F42',
          rows,
          footer: 'Va sur ton dashboard Stripe pour fournir des preuves avant la date limite.'
        })
      })
      break
    }

    default:
      console.log('[stripe] event ignored:', event.type)
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed')
  }

  const sig = req.headers['stripe-signature']
  const secret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !secret) {
    return res.status(400).send('Missing signature or webhook secret')
  }

  let event
  try {
    const rawBody = await readRawBody(req)
    event = stripe.webhooks.constructEvent(rawBody, sig, secret)
  } catch (err) {
    console.error('[stripe] signature error', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  try {
    await handleEvent(event)
  } catch (err) {
    console.error('[stripe] handler error', err)
  }

  return res.status(200).json({ received: true })
}
