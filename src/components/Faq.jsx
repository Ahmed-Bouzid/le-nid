import { useState } from 'react'

const faqs = [
  {
    q: 'Combien de temps dure l’intervention ?',
    a: '3 heures à votre domicile pour les formules Express et Semaine. La formule Cocon comprend deux passages de 3 heures, espacés selon vos besoins.'
  },
  {
    q: 'Les courses sont-elles incluses ?',
    a: 'Oui, toujours. Le chef arrive avec tous les ingrédients, sélectionnés selon vos goûts, vos allergies et la saison. Vous n’avez rien à prévoir.'
  },
  {
    q: 'Quel type de chef vient chez moi ?',
    a: 'Des chefs professionnels, formés, bienveillants, sélectionnés à la main. Tous sont sensibilisés au post-partum et à la nutrition des jeunes mamans.'
  },
  {
    q: 'Combien de temps se conservent les repas ?',
    a: '3 à 4 jours au frigo, jusqu’à 2 mois au congélateur. Tout est étiqueté, daté et organisé pour que vous n’ayez qu’à réchauffer.'
  },
  {
    q: 'Puis-je bénéficier d’un crédit d’impôt ou d’une aide ?',
    a: 'Notre prestation peut être éligible au dispositif “services à la personne”, qui ouvre droit à un crédit d’impôt de 50% sur vos dépenses (selon votre situation fiscale). Sur demande, nous vous fournissons une attestation à joindre à votre déclaration.'
  },
  {
    q: 'Puis-je offrir Le Nid en cadeau de naissance ?',
    a: 'Oui, c’est même l’un des plus beaux cadeaux possibles. Nous proposons des cartes-cadeaux pour toutes les formules.'
  }
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="faq">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">FAQ</span>
          <h2>Vos questions, nos réponses.</h2>
        </div>

        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>
                <span className="chev">+</span>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
