const points = [
  {
    icon: '🎁',
    title: 'Un cadeau qui sert vraiment',
    text: 'Pas un énième doudou ou body taille 3 mois jamais porté. Des repas faits maison, mangés, savourés, utiles dès le retour de la maternité.'
  },
  {
    icon: '🤝',
    title: 'Offert à plusieurs, sans gêne',
    text: 'Famille, amis, collègues : chacun participe à hauteur de ce qu’il souhaite. Le total finance une formule Le Nid, sans calculs compliqués.'
  },
  {
    icon: '🌿',
    title: 'Du concret, pas du matériel',
    text: 'Un chef vient cuisiner à domicile. Le frigo se remplit. La maman souffle. Le cadeau se vit pendant des jours, pas dix minutes au déballage.'
  }
]

export default function Gift() {
  return (
    <section id="gift">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">Liste de naissance</span>
          <h2>Idéal pour une liste de naissance</h2>
          <p>
            Le plus beau cadeau de naissance n’est pas dans un paquet. C’est quelques jours
            sans avoir à penser aux repas. Le Nid peut être offert par la famille ou les amis,
            seul ou à plusieurs, pour aider la maman après l’accouchement avec des repas
            faits maison, livrés et préparés à domicile.
          </p>
        </div>

        <div className="why-grid">
          {points.map(p => (
            <div className="why-card" key={p.title}>
              <div className="ic">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>

        <div className="aides-card" style={{ marginTop: 40 }}>
          <div className="aides-content">
            <span className="eyebrow">Le bon réflexe cadeau</span>
            <h2 style={{ marginTop: 14 }}>
              Un cadeau <span className="accent-text">utile, concret, vraiment utilisé</span>.
            </h2>
            <p className="aides-lead">
              Ajoutez Le Nid à votre liste de naissance, ou proposez-le à vos proches.
              Ils participent en quelques clics, vous choisissez votre formule au moment
              qui vous convient — souvent dans les premiers jours après la naissance,
              quand l’aide compte le plus.
            </p>
            <p className="aides-note">
              Pour organiser une cagnotte cadeau Le Nid, écrivez-nous : on s’occupe du reste.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
