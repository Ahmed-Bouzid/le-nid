import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Problem from './components/Problem.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Offers from './components/Offers.jsx'
import Meals from './components/Meals.jsx'
import Why from './components/Why.jsx'
import Faq from './components/Faq.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Offers />
        <Meals />
        <Why />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
