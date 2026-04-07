import { useTranslation, Trans } from 'react-i18next'
import { motion } from 'framer-motion'

const experiences = [
  { company: 'Sirros IoT', role: 'Desenvolvedor Full Stack', period: 'Fev 2023 – Abr 2026', location: 'Novo Hamburgo, RS', stack: 'JavaScript, TypeScript, Node.js, NestJS, Angular, AngularJS, HTML, CSS, SCSS, PostgreSQL, MongoDB, Google Maps API, IoT (integrações em tempo real), Integrações com APIs externas', current: false },
  { company: 'Paipe | Tecnologia e Inovação', role: 'Full Stack Developer', period: 'Nov 2021 – Jan 2023', location: 'Campo Bom, RS', stack: 'JavaScript, TypeScript, Java, Node.js, NestJS, ReactJS, Oracle, Postgres, Firebase', current: false },
  { company: 'Growdev', role: 'Full Stack Developer', period: 'Fev 2021 – Jan 2022', location: 'Rio Grande do Sul, RS', stack: 'HTML, CSS, JavaScript, TypeScript, Node.js, ReactJS, PWA, PaaS, Postgres, Redis', current: false },
  { company: 'Sirros IoT', role: 'Desenvolvedor de Software', period: 'Jul 2021 – Nov 2021', location: 'Novo Hamburgo, RS', stack: 'JavaScript, AngularJS, MongoDB, Chart.js', current: false },
]

const education = [
  { institution: 'UNINTER', course: 'Bacharelado em Engenharia de Software', period: '2026 – 2029' },
  { institution: 'Anhanguera Educacional', course: 'Análise e Desenvolvimento de Sistemas', period: '2022 – 2024' },
  { institution: 'Growdev', course: 'Programa Web Full Stack', period: '2021 – 2022' },
  { institution: 'PUCRS', course: 'Indústria 4.0', period: 'Jan 2024' },
]

const slideIn = (x: number, delay = 0) => ({
  hidden: { opacity: 0, x },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as unknown as string } },
})

export default function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-widest mb-2">{t('about.label')}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">{t('about.title')}</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.div variants={slideIn(-30)}>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">{t('about.subtitle')}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              <Trans i18nKey="about.p1" components={[<span key="0"/>,<strong key="1" className="text-slate-800 dark:text-slate-200"/>,<span key="2"/>,<strong key="3" className="text-slate-800 dark:text-slate-200"/>,<span key="4"/>,<strong key="5" className="text-slate-800 dark:text-slate-200"/>,<span key="6"/>,<strong key="7" className="text-slate-800 dark:text-slate-200"/>]} />
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              <Trans i18nKey="about.p2" components={[<span key="0"/>,<strong key="1" className="text-slate-800 dark:text-slate-200"/>,<span key="2"/>,<strong key="3" className="text-slate-800 dark:text-slate-200"/>]} />
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">{t('about.p3')}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { label: t('about.location'), value: t('about.location_value') },
                { label: 'Email', value: 'kley-m@hotmail.com' },
                { label: t('about.experience'), value: t('about.experience_value') },
                { label: t('about.focus'), value: t('about.focus_value') },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -2 }}
                >
                  <span className="text-slate-400 uppercase tracking-wide text-xs">{item.label}</span>
                  <p className="text-slate-700 dark:text-slate-300 font-medium mt-1">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={slideIn(30)}>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              {t('about.exp_title')}
            </h3>
            <ol className="relative border-l border-slate-200 dark:border-slate-700 ml-3 space-y-6 mb-10">
              {experiences.map((exp, i) => (
                <motion.li
                  key={i}
                  className="ml-6"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <span className={`absolute -left-2 flex items-center justify-center w-4 h-4 rounded-full ring-2 ring-white dark:ring-slate-900 ${exp.current ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'}`} />
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <h4 className="font-semibold text-slate-800 dark:text-white text-sm">{exp.company}</h4>
                    {exp.current && (
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-medium">{t('about.current')}</span>
                    )}
                  </div>
                  <p className="text-blue-600 dark:text-blue-400 text-xs font-medium">{exp.role}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{exp.period} · {exp.location}</p>
                  {exp.stack && <p className="text-slate-500 text-xs mt-1 leading-relaxed">{exp.stack}</p>}
                </motion.li>
              ))}
            </ol>

            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              {t('about.edu_title')}
            </h3>
            <ul className="space-y-3">
              {education.map((edu, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-3 items-start"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-800 dark:text-slate-200 font-medium text-sm">{edu.institution}</p>
                    <p className="text-slate-500 text-xs">{edu.course} · {edu.period}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
