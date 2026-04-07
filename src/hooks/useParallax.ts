import { useEffect, useRef, useState } from 'react'

export function useParallax(multiplier: number = 0.5) {
  const ref = useRef<HTMLElement>(null)
  const [translateY, setTranslateY] = useState(0)

  useEffect(() => {
    const target = ref.current
    if (!target) return

    const onScroll = () => {
      const rect = target!.getBoundingClientRect()
      const scrolled = window.innerHeight - rect.top
      const offset = scrolled * multiplier
      setTranslateY(offset)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [multiplier])

  return { ref, style: { transform: `translateY(${translateY}px)` } }
}
