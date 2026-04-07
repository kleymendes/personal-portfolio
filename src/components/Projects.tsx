import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { motion } from 'framer-motion'

interface Project {
  title: string
  description: string
  tags: string[]
  link?: string
  repo?: string
  highlight?: boolean
}

const projects: Project[] = [
  {
    title: 'Plataforma IoT Industrial',
    description: 'Sistema de monitoramento em tempo real para dispositivos IoT industriais. Dashboard com gráficos, alertas e integração com sensores físicos via MQTT e WebSocket.',
    tags: ['AngularJS', 'Node.js', 'MongoDB', 'Chart.js', 'MQTT'],
    highlight: true,
  },
  {
    title: 'API RESTful com NestJS',
    description: 'Arquitetura de microsserviços com NestJS, autenticação JWT, guards e interceptors. Documentação automática com Swagger e testes com Jest.',
    tags: ['NestJS', 'TypeScript', 'Postgres', 'JWT', 'Swagger'],
    highlight: true,
  },
  {
    title: 'Dashboard de Geolocalização',
    description: 'Aplicação Angular integrada com Leaflet para rastreamento e otimização de rotas. Exibição de dados em tempo real com atualização dinâmica de marcadores.',
    tags: ['Angular', 'Leaflet', 'TypeScript', 'Node.js'],
    highlight: false,
  },
  {
    title: 'Sistema de Gestão Full Stack',
    description: 'Aplicação completa com frontend React, backend Node.js e banco de dados PostgreSQL. Autenticação, CRUD completo, paginação e filtros avançados.',
    tags: ['ReactJS', 'Node.js', 'PostgreSQL', 'Firebase', 'Java'],
    highlight: false,
  },
  {
    title: 'PWA com Push Notifications',
    description: 'Progressive Web App com suporte offline, cache inteligente e notificações push. Deploy em PaaS com CI/CD automatizado e Redis para cache de sessão.',
    tags: ['PWA', 'JavaScript', 'Redis', 'Node.js', 'PaaS'],
    highlight: false,
  },
  {
    title: 'Integração IA + Planejamento Industrial',
    description: 'Projeto focado em aplicar inteligência artificial para aumentar a eficiência do planejamento industrial, baseado em estudos de Indústria 4.0 e IoT.',
    tags: ['IA', 'IoT', 'Indústria 4.0', 'Node.js'],
    highlight: false,
  },
]

function TagBadge({ label }: { label: string }) {
  return (
    <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800 px-2.5 py-1 rounded-full font-medium">
      {label}
    </span>
  )
}

function ProjectCard({ project, t }: { project: Project; t: TFunction }) {
  return (
    <motion.div
      className={`rounded-xl border bg-white dark:bg-slate-800 p-6 flex flex-col gap-4 h-full ${
        project.highlight ? 'border-blue-200 dark:border-blue-700 shadow-md' : 'border-slate-100 dark:border-slate-700 shadow-sm'
      }`}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
      whileTap={{ scale: 0.98 }}
    >
      {project.highlight && (
        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{t('projects.highlight')}</span>
      )}
      <h3 className="text-lg font-bold text-slate-800 dark:text-white">{project.title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => <TagBadge key={tag} label={tag} />)}
      </div>
      {(project.link || project.repo) && (
        <div className="flex gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
              {t('projects.view')}
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer"
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-medium">
              {t('projects.github')}
            </a>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useTranslation()
  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-widest mb-2">{t('projects.label')}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">{t('projects.title')}</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 dark:text-slate-300 mt-4 max-w-xl mx-auto text-sm leading-relaxed">{t('projects.description')}</p>
        </motion.div>
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {projects.map((project, i) => (
            <motion.div className="h-full" key={i} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as unknown as string } } }}>
              <ProjectCard project={project} t={t} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
