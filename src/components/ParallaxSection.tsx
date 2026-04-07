import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxSection({ children, speed = 0.1, className }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-speed * 100, speed * 100])

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}
