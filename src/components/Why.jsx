const reasons = [
  {
    icon: '⏱',
    title: 'Du temps retrouvé',
    text: 'Plus de courses, plus de cuisine. Vous récupérez plusieurs heures par semaine pour vous, votre bébé, votre couple.'
  },
  {
    icon: '♡',
    title: 'Une vraie nourriture',
    text: 'Des plats faits maison, frais, équilibrés. Pensés pour le post-partum et l’allaitement si vous le souhaitez.'
  },
  {
    icon: '✿',
    title: 'De la sérénité',
    text: 'Un chef bienveillant, discret, qui respecte votre bulle. On vient soulager, pas envahir.'
  }
]

export default function Why() {
  return (
    <section>
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">Pourquoi Le Nid</span>
          <h2>Trois raisons d’oser vous faire aider.</h2>
        </div>

        <div className="why-grid">
          {reasons.map(r => (
            <div className="why-card" key={r.title}>
              <div className="ic">{r.icon}</div>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
