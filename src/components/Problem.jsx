export default function Problem() {
  return (
    <section className="problem">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">Le post-partum, en vrai</span>
          <h2>Devenir maman, c’est merveilleux. Mais épuisant.</h2>
          <p>
            Nuits courtes, allaitement, hormones, visites, linge… La dernière
            chose dont vous avez besoin : penser au dîner.
          </p>
        </div>

        <div className="problem-grid">
          <div className="problem-card">
            <span className="tag">Sans Le Nid</span>
            <h3>La charge mentale s’accumule</h3>
            <ul>
              <li>Penser aux courses chaque semaine</li>
              <li>Cuisiner épuisée, entre deux tétées</li>
              <li>Manger trop vite, pas toujours sainement</li>
              <li>Compter sur les autres, ou sur les plats livrés</li>
            </ul>
          </div>
          <div className="problem-card solution">
            <span className="tag">Avec Le Nid</span>
            <h3>On respire. On profite. On mange bien.</h3>
            <ul>
              <li>Un chef vient à vous, pas l’inverse</li>
              <li>Des repas faits maison, équilibrés</li>
              <li>Plusieurs jours couverts en une seule visite</li>
              <li>Du temps retrouvé avec votre bébé</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
