import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed')
  }

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL
  const FROM_EMAIL = process.env.FROM_EMAIL || 'Le Nid <onboarding@resend.dev>'

  if (!ADMIN_EMAIL || !process.env.RESEND_API_KEY) {
    return res.status(500).json({
      ok: false,
      error: 'Missing ADMIN_EMAIL or RESEND_API_KEY env var'
    })
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: '✅ Test webhook Le Nid',
      html: `<div style="font-family:sans-serif;padding:24px;">
        <h2>Test webhook OK</h2>
        <p>Si tu reçois cet email, Resend fonctionne et ton compte est bien configuré.</p>
        <p style="color:#888;font-size:12px;">${new Date().toISOString()}</p>
      </div>`
    })

    if (error) {
      return res.status(500).json({ ok: false, error: error.message })
    }
    return res.status(200).json({ ok: true, id: data?.id })
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message })
  }
}
