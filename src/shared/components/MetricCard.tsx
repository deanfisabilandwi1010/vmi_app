import type { ReactNode } from 'react'
import { Card } from '@/shared/components/Card'

type MetricCardProps = {
  icon: ReactNode
  label: string
  value: string
  trend: string
}

export const MetricCard = ({ icon, label, trend, value }: MetricCardProps) => {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-pln-muted">{label}</p>
          <p className="mt-3 text-3xl font-black text-pln-ink">{value}</p>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 text-pln-blue">{icon}</div>
      </div>
      <p className="mt-4 text-xs font-semibold text-emerald-700">{trend}</p>
    </Card>
  )
}
