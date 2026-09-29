import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import VideoDemo from './components/VideoDemo'
import Assessment from './components/Assessment'
import Benefits from './components/Benefits'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Saltar al contenido</a>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <VideoDemo />
        <Assessment />
        <Benefits />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
