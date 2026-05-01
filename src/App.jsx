import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Problem from './components/Problem.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Offers from './components/Offers.jsx'
import Meals from './components/Meals.jsx'
import Why from './components/Why.jsx'
import Aides from './components/Aides.jsx'
import Faq from './components/Faq.jsx'
import ChefForm from './components/ChefForm.jsx'
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
        <Aides />
        <Faq />
        <ChefForm />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
