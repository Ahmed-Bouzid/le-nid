const packs = [
  {
    name: 'Express',
    price: 249,
    desc: 'Une bouffée d’air pour démarrer en douceur.',
    duration: '2 à 4 jours de repas',
    features: [
      '3h de chef à domicile',
      'Courses incluses',
      '10 à 15 portions',
      'Plats simples & réconfortants'
    ],
    featured: false,
    url: 'https://buy.stripe.com/6oU00dghG2Ab86w7tH6oo04'
  },
  {
    name: 'Essentiel',
    price: 439,
    desc: 'La formule la plus choisie. Une semaine sereine.',
    duration: '5 à 7 jours de repas',
    features: [
      '6h de chef à domicile',
      'Courses incluses',
      '20 à 25 portions',
      'Menus adaptés à vos goûts',
      'Conservation frigo + congélateur'
    ],
    featured: true,
    badge: 'Le plus choisi',
    url: 'https://buy.stripe.com/dRmfZbfdCdeP72s15j6oo05'
  },
  {
    name: 'Cocon',
    price: 779,
    desc: 'Deux passages, pour un post-partum tout en douceur.',
    duration: '10 à 14 jours de repas',
    features: [
      '2 visites de 6h',
      'Courses incluses',
      '40 à 50 portions',
      'Menus variés sur plusieurs jours',
      'Suivi & ajustements'
    ],
    featured: false,
    url: 'https://buy.stripe.com/7sYbIV9TieiTcmM6pD6oo06'
  }
]

export default function Offers() {
  return (
    <section id="offers" className="offers">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">Nos formules</span>
          <h2>Trois formules. Une seule promesse : vous laisser souffler.</h2>
          <p>Pas d’abonnement. Vous payez ce dont vous avez besoin, quand vous en avez besoin.</p>
        </div>

        <div className="pricing">
          {packs.map(p => (
            <div key={p.name} className={`pack ${p.featured ? 'featured' : ''}`}>
              {p.badge && <span className="badge">{p.badge}</span>}
              <span className="name">{p.name}</span>
              <h3>{p.desc}</h3>
              <div className="price">
                {p.price}€
              </div>
              <div className="duration">{p.duration}</div>
              <ul>
                {p.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${p.featured ? 'btn-primary' : 'btn-ghost'}`}
              >
                Réserver {p.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
