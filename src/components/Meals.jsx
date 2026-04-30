const meals = [
  { name: 'Saumon rôti, légumes vapeur', tag: 'Léger', img: '/images/plats/plat1.jpg' },
  { name: 'Risotto crémeux aux champignons', tag: 'Doux', img: '/images/plats/plat2.jpg' },
  { name: 'Curry de lentilles corail', tag: 'Végétarien', img: '/images/plats/plat3.jpg' },
  { name: 'Blanquette de veau', tag: 'Réconfort', img: '/images/plats/plats4.jpg' }
]

export default function Meals() {
  return (
    <section id="meals">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">Exemple de menu</span>
          <h2>Des plats simples, faits maison, pensés pour vous.</h2>
          <p>
            Du batch cooking doux : nourrissant, varié, et adapté à l’allaitement
            si vous le souhaitez.
          </p>
        </div>

        <div className="meals-grid">
          {meals.map(m => (
            <div className="meal" key={m.name}>
              <div className="meal-img">
                <img src={m.img} alt={m.name} loading="lazy" />
              </div>
              <div className="meal-info">
                <h4>{m.name}</h4>
                <span>{m.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
