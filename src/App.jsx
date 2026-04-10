import Header from './components/Header'
import Hero from './components/Hero'
import Resume from './components/Resume'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackgroundEffects from './components/BackgroundEffects'
import Skills from './components/Skills'

function App() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Contact />
        <Resume />
      </main>
      <Footer />
    </>
  )
}

export default App
