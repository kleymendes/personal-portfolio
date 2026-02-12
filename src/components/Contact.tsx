import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const N8N_WEBHOOK_URL = 'https://kleysilva.app.n8n.cloud/webhook/d75daefc-60f6-4d95-84bb-94f804aace34/portfolio-contact'

export default function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          sentAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) throw new Error('Erro ao enviar mensagem')

      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setError(t('contact.error_message') || 'Erro ao enviar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const contactLinks = [
    {
      label: t('contact.linkedin'),
      value: 'linkedin.com/in/kleidilsonsilva',
      href: 'https://www.linkedin.com/in/kleidilsonsilva',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: 'Email',
      value: 'kley-m@hotmail.com',
      href: 'mailto:kley-m@hotmail.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: t('contact.phone'),
      value: '+55 (51) 99634-0786',
      href: 'tel:+5551996340786',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      label: t('contact.location'),
      value: t('contact.location_value'),
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ]

  return (
    <section id="contact" className="py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-2">{t('contact.label')}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t('contact.title')}</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4 max-w-md mx-auto text-sm">{t('contact.description')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-semibold text-white mb-2">{t('contact.info_title')}</h3>
            {contactLinks.map((item) => (
              <a key={item.label} href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all duration-200">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">{item.label}</p>
                  <p className="text-slate-300 group-hover:text-white text-sm font-medium transition-colors">{item.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">{t('contact.form_title')}</h3>
            {submitted ? (
              <div className="bg-slate-800 border border-green-500/30 rounded-xl p-8 text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white font-semibold mb-1">{t('contact.success_title')}</p>
                <p className="text-slate-400 text-sm">{t('contact.success_desc')}</p>
                <button onClick={() => setSubmitted(false)} className="mt-4 text-blue-400 text-sm hover:underline">
                  {t('contact.send_another')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs text-slate-400 uppercase tracking-wide mb-1.5" htmlFor="name">{t('contact.name')}</label>
                  <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange}
                    placeholder={t('contact.name_placeholder')}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 uppercase tracking-wide mb-1.5" htmlFor="email">{t('contact.email')}</label>
                  <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                    placeholder={t('contact.email_placeholder')}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 uppercase tracking-wide mb-1.5" htmlFor="message">{t('contact.message')}</label>
                  <textarea id="message" name="message" rows={5} required value={formData.message} onChange={handleChange}
                    placeholder={t('contact.message_placeholder')}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none" />
                </div>
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-sm mt-2 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      {t('contact.sending') || 'Enviando...'}
                    </>
                  ) : (
                    t('contact.send')
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
