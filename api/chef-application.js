import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const TO_EMAIL = 'lenid@sunflowersociety.fr'
const FROM_EMAIL = process.env.FROM_EMAIL || 'Le Nid <onboarding@resend.dev>'

function esc(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function row(label, value) {
  return `<tr>
    <td style="padding:8px 12px;border-bottom:1px solid #ECE6DC;color:#8A8278;font-size:13px;width:140px;">${label}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #ECE6DC;color:#1F1B17;font-size:14px;font-weight:500;">${value || '—'}</td>
  </tr>`
}

async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString('utf8')
  try { return JSON.parse(raw) } catch { return {} }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ ok: false, error: 'Email service not configured' })
  }

  const body = await readJson(req)

  // Honeypot
  if (body.website) return res.status(200).json({ ok: true })

  const { name, email, phone, city, experience, message } = body

  if (!name || !email || !phone) {
    return res.status(400).json({ ok: false, error: 'Champs requis manquants' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Email invalide' })
  }

  const html = `<!doctype html><html><body style="margin:0;background:#F7F4EF;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;padding:32px 16px;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:20px;overflow:hidden;border:1px solid #ECE6DC;">
      <div style="background:#1F1B17;padding:24px 28px;color:#fff;">
        <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;opacity:.8;">Le Nid · Candidature chef</div>
        <div style="font-family:Georgia,serif;font-size:22px;margin-top:6px;">Nouveau chef intéressé 👨‍🍳</div>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        ${row('Nom', esc(name))}
        ${row('Email', `<a href="mailto:${esc(email)}">${esc(email)}</a>`)}
        ${row('Téléphone', `<a href="tel:${esc(phone)}">${esc(phone)}</a>`)}
        ${row('Ville', esc(city))}
        ${row('Expérience', esc(experience))}
        ${row('Message', esc(message).replace(/\n/g, '<br>'))}
      </table>
      <div style="padding:16px 28px;color:#8A8278;font-size:12px;border-top:1px solid #ECE6DC;">
        Reçu le ${new Date().toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' })}
      </div>
    </div>
  </body></html>`

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `👨‍🍳 Candidature chef — ${name}`,
      html
    })
    if (error) return res.status(500).json({ ok: false, error: error.message })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[chef-application]', err)
    return res.status(500).json({ ok: false, error: err.message })
  }
}
