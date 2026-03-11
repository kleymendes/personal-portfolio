import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow, iconAnchor: [12, 41] })
L.Marker.prototype.options.icon = DefaultIcon

const sensorData = [
  { time: '08:00', temp: 72 },
  { time: '09:00', temp: 75 },
  { time: '10:00', temp: 80 },
  { time: '11:00', temp: 78 },
  { time: '12:00', temp: 85 },
  { time: '13:00', temp: 82 },
  { time: '14:00', temp: 88 },
]

const deliveryData = [
  { day: 'Seg', entregas: 14 },
  { day: 'Ter', entregas: 21 },
  { day: 'Qua', entregas: 18 },
  { day: 'Qui', entregas: 25 },
  { day: 'Sex', entregas: 30 },
  { day: 'Sáb', entregas: 12 },
]

const mapPoints = [
  { id: 1, pos: [-29.6914, -53.8008] as [number, number], label: 'Unidade Santa Maria', status: 'online' },
  { id: 2, pos: [-30.0346, -51.2177] as [number, number], label: 'Unidade Porto Alegre', status: 'online' },
  { id: 3, pos: [-29.1678, -51.1794] as [number, number], label: 'Unidade Caxias do Sul', status: 'alert' },
  { id: 4, pos: [-23.1896, -47.3147] as [number, number], label: 'Unidade Jundiaí', status: 'online' },
  { id: 5, pos: [-23.5505, -46.6333] as [number, number], label: 'Unidade São Paulo', status: 'offline' },
]

const routeLine: [number, number][] = [
  [-30.0346, -51.2177],
  [-29.6914, -53.8008],
  [-29.1678, -51.1794],
]

const statusColor: Record<string, string> = {
  online: '#22c55e',
  alert: '#f59e0b',
  offline: '#ef4444',
}

function StatusDot({ status }: { status: string }) {
  return <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: statusColor[status] }} />
}

function getMarkerIcon(status: string) {
  const color = statusColor[status]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24S24 21 24 12C24 5.373 18.627 0 12 0z" fill="${color}"/>
    <circle cx="12" cy="12" r="5" fill="white"/>
  </svg>`
  return L.divIcon({ html: svg, className: '', iconSize: [24, 36], iconAnchor: [12, 36], popupAnchor: [0, -36] })
}

export default function Showcase() {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const isDark = theme === 'dark'

  const gridColor = isDark ? '#334155' : '#f1f5f9'
  const tickColor = isDark ? '#64748b' : '#94a3b8'
  const tooltipStyle = isDark
    ? { fontSize: 12, borderRadius: 8, border: '1px solid #334155', backgroundColor: '#1e293b', color: '#e2e8f0' }
    : { fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#1e293b' }

  return (
    <section id="showcase" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-widest mb-2">{t('showcase.label')}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">{t('showcase.title')}</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 dark:text-slate-300 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            {t('showcase.description')}
          </p>
        </div>

        {/* IoT Dashboard */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 mb-8 transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-lg">{t('showcase.dashboard_title')}</h3>
              <p className="text-slate-400 text-xs mt-0.5">{t('showcase.dashboard_subtitle')}</p>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 px-3 py-1 rounded-full font-medium">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse" />
                {t('showcase.online')}
              </span>
              <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full font-medium">{t('showcase.sensors')}</span>
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { labelKey: 'showcase.temp', value: '88°C', delta: '+3%', ok: false },
              { labelKey: 'showcase.pressure', value: '4.4 bar', delta: '+2%', ok: true },
              { labelKey: 'showcase.rpm', value: '1.380', delta: '-1%', ok: true },
              { labelKey: 'showcase.uptime', value: '99.7%', delta: '+0.1%', ok: true },
            ].map((kpi) => (
              <div key={kpi.labelKey} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-100 dark:border-slate-600">
                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">{t(kpi.labelKey)}</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">{kpi.value}</p>
                <p className={`text-xs font-medium mt-1 ${kpi.ok ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                  {kpi.delta} {t('showcase.since_yesterday')}
                </p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{t('showcase.chart_temp')}</p>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={sensorData}>
                  <defs>
                    <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number | undefined) => [`${v ?? ''}°C`, 'Temp']} />
                  <Area type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} fill="url(#tempGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{t('showcase.chart_deliveries')}</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={deliveryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number | undefined) => [v ?? '', 'Entregas']} />
                  <Bar dataKey="entregas" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-lg">{t('showcase.map_title')}</h3>
              <p className="text-slate-400 text-xs mt-0.5">{t('showcase.map_subtitle')}</p>
            </div>
            <div className="hidden md:flex gap-3 text-xs">
              {(Object.entries(statusColor) as [string, string][]).map(([s, c]) => (
                <span key={s} className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
                  {t(`showcase.status_${s}`)}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-600" style={{ height: 340 }}>
              <MapContainer center={[-28.5, -50.5]} zoom={6} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <Polyline positions={routeLine} pathOptions={{ color: '#3b82f6', weight: 2, dashArray: '6 4' }} />
                {mapPoints.map((point) => (
                  <Marker key={point.id} position={point.pos} icon={getMarkerIcon(point.status)}>
                    <Popup>
                      <div className="text-sm font-medium">{point.label}</div>
                      <div className="text-xs text-slate-500 capitalize mt-0.5">Status: {point.status}</div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Unidades</p>
              {mapPoints.map((point) => (
                <div key={point.id} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg px-3 py-2.5 border border-slate-100 dark:border-slate-600">
                  <StatusDot status={point.status} />
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{point.label}</p>
                    <p className="text-xs text-slate-400 capitalize">{point.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
