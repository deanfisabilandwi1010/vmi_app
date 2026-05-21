import { Bell, Globe2, Lock, MonitorCog, Shield } from 'lucide-react'
import { Card } from '@/shared/components/Card'
import { PageHeader } from '@/shared/components/PageHeader'

const settings = [
  {
    title: 'Auth Guard dan Permission Guard',
    description: 'Pengaturan role, token session, dan akses halaman.',
    icon: Shield,
  },
  {
    title: 'Integrasi SSO',
    description: 'Google, Facebook, dan Instagram OAuth provider.',
    icon: Lock,
  },
  {
    title: 'PWA dan i18n',
    description: 'Installable web app dan Bahasa Indonesia sebagai default.',
    icon: Globe2,
  },
  {
    title: 'Performance Monitoring',
    description: 'Koneksi Sentry melalui VITE_SENTRY_DSN.',
    icon: MonitorCog,
  },
  {
    title: 'Notifikasi Operasional',
    description: 'Alert approval, pengiriman, dan laporan kerusakan.',
    icon: Bell,
  },
]

export const SettingsPage = () => {
  return (
    <div>
      <PageHeader
        description="Konfigurasi khusus Super Admin untuk keamanan, integrasi, monitoring, dan preferensi sistem."
        title="Setting / Konfigurasi"
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {settings.map((setting) => {
          const Icon = setting.icon
          return (
            <Card className="p-5" key={setting.title}>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-pln-blue">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-lg font-black text-pln-ink">
                {setting.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-pln-muted">
                {setting.description}
              </p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
