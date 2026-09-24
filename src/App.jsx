import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhyUs from './components/WhyUs'
import Services from './components/Services'
import Assessment from './components/Assessment'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Saltar al contenido</a>
      <Navbar />
      <main id="main">
        <Hero />
        <section className="band">
          <div className="container split">
            <WhyUs />
            <Services />
          </div>
        </section>
        <section className="band">
          <div className="container split">
            <Assessment />
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
