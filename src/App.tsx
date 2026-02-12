import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Showcase from './components/Showcase'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="font-sans antialiased text-slate-800">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Showcase />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
