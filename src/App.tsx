import Particles from './components/Particles'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Showcase from './components/Showcase'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParallaxSection from './components/ParallaxSection'
import ThemeTransition from './components/ThemeTransition'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className="font-sans antialiased text-slate-800 relative overflow-hidden">
      <Particles />
      <ThemeTransition />
      <div className="relative z-10">
      <Navbar />
      <main>
        <Hero />
        <ParallaxSection speed={0.05}>
          <About />
        </ParallaxSection>
        <Showcase />
        <ParallaxSection speed={0.05}>
          <Projects />
        </ParallaxSection>
        <ParallaxSection speed={0.05}>
          <Skills />
        </ParallaxSection>
        <ParallaxSection speed={0.05}>
          <Contact />
        </ParallaxSection>
      </main>
      <Footer />
      </div>
      <ScrollToTop />
    </div>
  )
}

export default App
