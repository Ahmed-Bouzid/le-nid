const steps = [
  {
    n: '01',
    title: 'Vous réservez en ligne',
    text: 'Choisissez une formule et une date. On vous demande vos goûts, allergies, et le matériel dispo chez vous.',
    img: '/images/plats/chef1.jpg'
  },
  {
    n: '02',
    title: 'Le chef vient chez vous',
    text: 'Il arrive avec les courses, son tablier et son sourire. Pendant 3 heures, il cuisine dans votre cuisine.',
    img: '/images/plats/chef2.jpg'
  },
  {
    n: '03',
    title: 'Des repas pour la semaine',
    text: 'Plats faits maison, portionnés, étiquetés. Au frigo et au congélateur. Vous n’avez plus qu’à réchauffer.',
    img: '/images/plats/plat5.jpg'
  }
]

export default function HowItWorks() {
  return (
    <section id="how">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">Comment ça marche</span>
          <h2>Trois étapes. C’est tout.</h2>
          <p>
            Aussi simple qu’un rendez-vous. Aussi doux qu’une parenthèse pour soi.
          </p>
        </div>

        <div className="steps">
          {steps.map(s => (
            <div className="step" key={s.n}>
              <div className="step-img">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </div>
              <div className="num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
