import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#" className="brand">
          <img src="/images/plats/logo.png" alt="Le Nid" className="brand-logo" />
        </a>
        <nav className="nav-links">
          <a href="#how">Comment ça marche</a>
          <a href="#offers">Formules</a>
          <a href="#meals">Les repas</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a href="#offers" className="btn btn-primary">Réserver un chef</a>
      </div>
    </header>
  )
}
