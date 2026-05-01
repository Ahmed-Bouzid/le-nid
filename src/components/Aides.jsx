export default function Aides() {
  return (
    <section id="aides" className="aides">
      <div className="container">
        <div className="aides-card">
          <div className="aides-badge">−50%</div>

          <div className="aides-content">
            <span className="eyebrow">Crédit d’impôt</span>
            <h2>
              <span className="accent-text">50% remboursés</span> grâce au crédit d’impôt
            </h2>
            <p className="aides-lead">
              Le Nid est éligible au dispositif <strong>“services à la personne”</strong>.
              Vous bénéficiez d’un <strong>crédit d’impôt de 50%</strong> sur vos dépenses :
              concrètement, vous ne payez que la moitié du prix réel.
            </p>

            <div className="aides-examples">
              <div className="aide-ex">
                <span className="ex-label">Express</span>
                <div className="ex-price"><s>230€</s> <strong>115€</strong></div>
                <span className="ex-after">après crédit d’impôt</span>
              </div>
              <div className="aide-ex">
                <span className="ex-label">Semaine</span>
                <div className="ex-price"><s>370€</s> <strong>185€</strong></div>
                <span className="ex-after">après crédit d’impôt</span>
              </div>
              <div className="aide-ex">
                <span className="ex-label">Cocon</span>
                <div className="ex-price"><s>640€</s> <strong>320€</strong></div>
                <span className="ex-after">après crédit d’impôt</span>
              </div>
            </div>

            <p className="aides-note">
              Sur simple demande, nous vous fournissons l’attestation fiscale à joindre
              à votre déclaration. <em>Selon votre situation fiscale.</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
