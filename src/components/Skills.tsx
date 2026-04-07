import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Tech {
  name: string
  icon: string
  color: string
}

const techs: Tech[] = [
  { name: 'Node.js', icon: '⬢', color: '#3C873A' },
  { name: 'NestJS', icon: '🔴', color: '#E0234E' },
  { name: 'Java', icon: '☕', color: '#ED8B00' },
  { name: 'Express', icon: '◆', color: '#9EA09E' },
  { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
  { name: 'MongoDB', icon: '🍃', color: '#00684A' },
  { name: 'Oracle', icon: '🔶', color: '#F80000' },
  { name: 'GraphQL', icon: '◈', color: '#E535AB' },
  { name: 'Redis', icon: '⚡', color: '#FF4438' },
  { name: 'Firebase', icon: '🔥', color: '#FFA000' },
  { name: 'Angular', icon: '🅰', color: '#DD0031' },
  { name: 'React', icon: '⚛', color: '#61DAFB' },
  { name: 'TypeScript', icon: '🔷', color: '#3178C6' },
  { name: 'JavaScript', icon: '🟨', color: '#F7DF1E' },
  { name: 'HTML5', icon: '🟧', color: '#E34F26' },
  { name: 'CSS3', icon: '🟦', color: '#1572B6' },
  { name: 'SCSS', icon: '💅', color: '#CD6799' },
  { name: 'Docker', icon: '🐳', color: '#2496ED' },
  { name: 'Git', icon: '🔀', color: '#F05032' },
  { name: 'CI/CD', icon: '🔄', color: '#6B7D2D' },
  { name: 'PWA', icon: '📱', color: '#5A0FC8' },
  { name: 'IoT', icon: '📡', color: '#087E8B' },
  { name: 'MQTT', icon: '🔌', color: '#660066' },
  { name: 'WebSocket', icon: '🔗', color: '#4A4A4A' },
  { name: 'Leaflet', icon: '🗺', color: '#199900' },
  { name: 'Chart.js', icon: '📊', color: '#FF6384' },
]

function TechCard({ tech, index }: { tech: Tech; index: number }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 40)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <motion.div
      className={`group rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm cursor-default
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{
        transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        borderTop: `3px solid ${tech.color}`,
      }}
      whileHover={{ y: -6, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="p-4 flex flex-col items-center text-center gap-2">
        <motion.span className="text-2xl" whileHover={{ scale: 1.2, rotate: 10 }}>{tech.icon}</motion.span>
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{tech.name}</span>
        <motion.span
          className="w-4 h-1 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: tech.color }}
          whileHover={{ width: 24 }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-widest mb-2">{t('skills.label')}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">{t('skills.title')}</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {techs.map((tech, i) => (
            <TechCard key={tech.name} tech={tech} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
