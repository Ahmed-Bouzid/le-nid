export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="#" className="brand" style={{ marginBottom: 16 }}>
              <img src="/images/plats/logo.png" alt="Le Nid" className="brand-logo" />
            </a>
            <p style={{ marginTop: 16 }}>
              Un chef à domicile pour les jeunes mamans.
              Pour souffler, manger bien, et profiter de bébé.
            </p>
          </div>
          <div>
            <h5>Le service</h5>
            <ul>
              <li><a href="#how">Comment ça marche</a></li>
              <li><a href="#offers">Formules</a></li>
              <li><a href="#meals">Les repas</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h5>Le Nid</h5>
            <ul>
              <li><a href="#">À propos</a></li>
              <li><a href="#">Nos chefs</a></li>
              <li><a href="#">Cartes-cadeaux</a></li>
              <li><a href="#">Presse</a></li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li><a href="mailto:bonjour@lenid.fr">bonjour@lenid.fr</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Devenir chef partenaire</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Le Nid. Avec soin, depuis Paris.</span>
          <span><a href="#">Mentions légales</a> · <a href="#">CGV</a> · <a href="#">Confidentialité</a></span>
        </div>
      </div>
    </footer>
  )
}
