import { useEffect, useState } from 'react'

const heroImages = [
  '/images/plats/maman.png',
  '/images/plats/chefmaison.png'
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % heroImages.length)
    }, 7500)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">● Pour les jeunes mamans</span>
          <h1 style={{ marginTop: 18 }}>
            Un chef vient cuisiner <span className="accent">chez vous</span>,
            pour que vous puissiez <span className="accent">souffler</span>.
          </h1>
          <p className="lead">
            Après l’accouchement, on s’occupe de tout. 3 heures à votre domicile,
            des repas faits maison pour plusieurs jours. Sans courses, sans cuisine,
            sans charge mentale.
          </p>
          <div className="hero-cta">
            <a href="#offers" className="btn btn-primary btn-lg">Réserver un chef</a>
            <a href="#how" className="btn btn-ghost btn-lg">Comment ça marche</a>
          </div>
          <div className="hero-meta">
            <div className="item">
              <strong>3h</strong>
              <span>à votre domicile</span>
            </div>
            <div className="item">
              <strong>+ de 10 repas</strong>
              <span>prêts à réchauffer</span>
            </div>
            <div className="item">
              <strong>0 course</strong>
              <span>on s’occupe de tout</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          {heroImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`hero-img ${i === index ? 'is-active' : ''}`}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
          <div className="hero-card top">
            <div className="icon">♡</div>
            <div>
              <strong>Repas maison</strong>
              <span>cuisinés devant vous</span>
            </div>
          </div>
          <div className="hero-card bottom">
            <div className="icon" style={{ background: '#F5E4DA', color: '#A85F42' }}>★</div>
            <div>
              <strong>Chef passionné</strong>
              <span>sélectionné avec soin</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
