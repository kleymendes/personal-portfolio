interface SkillGroup {
  category: string
  icon: string
  skills: string[]
}

const skillGroups: SkillGroup[] = [
  { category: 'Backend', icon: '⚙️', skills: ['Node.js', 'NestJS', 'Java', 'Express', 'REST APIs', 'GraphQL'] },
  { category: 'Frontend', icon: '🖥️', skills: ['Angular', 'AngularJS', 'React', 'TypeScript', 'JavaScript', 'HTML/CSS'] },
  { category: 'Banco de Dados', icon: '🗄️', skills: ['PostgreSQL', 'MongoDB', 'Oracle', 'Firebase', 'Redis'] },
  { category: 'Cloud & DevOps', icon: '☁️', skills: ['PaaS', 'PWA', 'CI/CD', 'Docker', 'Git', 'GitHub'] },
  { category: 'Integrações & APIs', icon: '🔗', skills: ['Leaflet', 'MQTT', 'WebSocket', 'Chart.js', 'Swagger'] },
  { category: 'Especialidades', icon: '🚀', skills: ['IoT Industrial', 'Indústria 4.0', 'IA aplicada', 'Geolocalização', 'Microsserviços'] },
]

const coreSkills = [
  { name: 'Node.js / NestJS', level: 90 },
  { name: 'TypeScript / JavaScript', level: 92 },
  { name: 'Angular / AngularJS', level: 85 },
  { name: 'PostgreSQL / MongoDB', level: 80 },
  { name: 'React', level: 75 },
  { name: 'Java', level: 65 },
]

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{name}</span>
        <span className="text-xs text-slate-400">{level}%</span>
      </div>
      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${level}%` }} />
      </div>
    </div>
  )
}

function SkillGroupCard({ group }: { group: SkillGroup }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{group.icon}</span>
        <h3 className="font-semibold text-slate-800 dark:text-white">{group.category}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span key={skill} className="text-xs bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-full">
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

import { useTranslation } from 'react-i18next'

export default function Skills() {
  const { t } = useTranslation()
  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-widest mb-2">{t('skills.label')}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">{t('skills.title')}</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">{t('skills.main_tech')}</h3>
            {coreSkills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">{t('skills.full_stack')}</h3>
            <div className="grid gap-4">
              {skillGroups.map((group) => (
                <SkillGroupCard key={group.category} group={group} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
