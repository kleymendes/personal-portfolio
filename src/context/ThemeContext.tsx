import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  isAnimating: boolean
  animatingTo: Theme | null
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  isAnimating: false,
  animatingTo: null,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const [isAnimating, setIsAnimating] = useState(false)
  const [animatingTo, setAnimatingTo] = useState<Theme | null>(null)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setAnimatingTo(nextTheme)
    setIsAnimating(true)
    setTimeout(() => setTheme(nextTheme), 400)
    setTimeout(() => {
      setIsAnimating(false)
      setAnimatingTo(null)
    }, 1000)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isAnimating, animatingTo }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
