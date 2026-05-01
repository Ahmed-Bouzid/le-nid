import { useState } from 'react'

export default function ChefForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const data = Object.fromEntries(new FormData(e.target).entries())

    try {
      const res = await fetch('/api/chef-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || 'Erreur')
      setStatus('sent')
      e.target.reset()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  return (
    <section id="devenir-chef" className="chef-form">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">Vous êtes chef ?</span>
          <h2>Rejoignez Le Nid.</h2>
          <p>
            Vous aimez cuisiner sain, simple, généreux ? Vous voulez accompagner
            de jeunes mamans dans un moment unique ? On a hâte de vous lire.
          </p>
        </div>

        <form className="chef-form-card" onSubmit={onSubmit}>
          {/* honeypot anti-spam */}
          <input
            type="text"
            name="website"
            tabIndex="-1"
            autoComplete="off"
            style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
            aria-hidden="true"
          />

          <div className="form-row">
            <label>
              Nom complet *
              <input name="name" type="text" required placeholder="Marie Dupont" />
            </label>
            <label>
              Email *
              <input name="email" type="email" required placeholder="marie@email.com" />
            </label>
          </div>

          <div className="form-row">
            <label>
              Téléphone *
              <input name="phone" type="tel" required placeholder="06 12 34 56 78" />
            </label>
            <label>
              Ville
              <input name="city" type="text" placeholder="Paris" />
            </label>
          </div>

          <label>
            Votre expérience
            <input name="experience" type="text" placeholder="Restaurant, traiteur, autodidacte…" />
          </label>

          <label>
            Pourquoi voulez-vous rejoindre Le Nid ?
            <textarea name="message" rows="4" placeholder="Quelques mots sur vous, votre cuisine, vos disponibilités…" />
          </label>

          <div className="chef-form-footer">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={status === 'sending' || status === 'sent'}
            >
              {status === 'sending' ? 'Envoi…' : status === 'sent' ? 'Envoyé ✓' : 'Envoyer ma candidature'}
            </button>
            {status === 'sent' && (
              <p className="form-msg ok">
                Merci, votre message est bien arrivé. Nous revenons vers vous très vite.
              </p>
            )}
            {status === 'error' && (
              <p className="form-msg err">
                Une erreur est survenue : {errorMsg}. Vous pouvez aussi nous écrire à
                {' '}<a href="mailto:lenid@sunflowersociety.fr">lenid@sunflowersociety.fr</a>.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
