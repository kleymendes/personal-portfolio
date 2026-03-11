import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'

const navKeys = ['home', 'about', 'showcase', 'projects', 'skills', 'contact'] as const
const hrefs = ['#hero', '#about', '#showcase', '#projects', '#skills', '#contact']

const languages = [
  { code: 'pt', label: 'PT', flag: '🇧🇷' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
]

function SunIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  )
}

function LangSelector({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const currentLang = languages.find(l => l.code === i18n.language) || languages[0]

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const changeLang = (code: string) => {
    i18n.changeLanguage(code)
    localStorage.setItem('lang', code)
    setOpen(false)
  }

  const btnClass = scrolled
    ? 'text-slate-500 hover:text-blue-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-slate-800'
    : 'text-slate-300 hover:text-white hover:bg-white/10'

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${btnClass}`}
      >
        <span>{currentLang.flag}</span>
        <span>{currentLang.label}</span>
        <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-lg py-1 min-w-[110px] z-50">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => changeLang(lang.code)}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-700
                ${i18n.language === lang.code
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300'}`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isDark = theme === 'dark'

  return (
    <nav className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${
      scrolled ? 'bg-white dark:bg-slate-900 shadow-md' : 'bg-slate-900/60 backdrop-blur-sm'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
          scrolled ? 'text-slate-800 dark:text-white' : 'text-white'
        }`}>
          Kley<span className="text-blue-400">Silva</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6">
            {navKeys.map((key, i) => (
              <li key={key}>
                <a href={hrefs[i]} className={`font-medium transition-colors duration-200 text-sm hover:text-blue-400 ${
                  scrolled ? 'text-slate-600 dark:text-slate-300' : 'text-slate-200'
                }`}>
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
          </ul>
          <LangSelector scrolled={scrolled} />
          <button onClick={toggleTheme} className={`p-2 rounded-lg transition-colors duration-200 ${
            scrolled
              ? 'text-slate-500 hover:text-blue-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-slate-800'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`} aria-label="Toggle theme">
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <LangSelector scrolled={scrolled} />
          <button onClick={toggleTheme} className="p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors" aria-label="Toggle theme">
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button className="flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-slate-800 dark:bg-white' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-slate-800 dark:bg-white' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-slate-800 dark:bg-white' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-lg">
          <ul className="flex flex-col">
            {navKeys.map((key, i) => (
              <li key={key}>
                <a href={hrefs[i]} onClick={() => setMenuOpen(false)}
                  className="block px-6 py-4 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
