import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-sm">
          © {year} <span className="text-slate-300 font-medium">Kley Silva</span>. {t('footer.rights')}
        </p>
        <p className="text-slate-600 text-xs">
          {t('footer.built')}
        </p>
      </div>
    </footer>
  )
}
