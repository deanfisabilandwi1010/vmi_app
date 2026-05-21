import { useQuery } from '@tanstack/react-query'
import {
  Activity,
  Boxes,
  Building2,
  CalendarDays,
  Package,
  Truck,
} from 'lucide-react'
import { Card } from '@/shared/components/Card'
import { MetricCard } from '@/shared/components/MetricCard'
import { PageHeader } from '@/shared/components/PageHeader'
import { StatusBadge } from '@/shared/components/StatusBadge'
import { vmiService } from '@/shared/api/vmiService'
import { formatCurrency, formatNumber } from '@/shared/lib/format'

export const DashboardPage = () => {
  const { data } = useQuery({
    queryKey: ['dashboard'],
    queryFn: vmiService.getDashboard,
  })

  const dashboard = data ?? {
    dailyRequests: 0,
    monthlyShipments: 0,
    yearlyVolume: 0,
    warehouseStock: 0,
    requests: [],
    shipments: [],
    units: [],
    inspections: [],
  }

  return (
    <div>
      <PageHeader
        description="Ringkasan aktivitas material, stok gudang Makassar, kebutuhan per UP3/ULP, dan status distribusi KWH Meter secara realtime."
        title="Dashboard Operasional VMI"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={<Activity className="h-5 w-5" />}
          label="Permintaan Hari Ini"
          trend="+12% dibanding kemarin"
          value={formatNumber(dashboard.dailyRequests)}
        />
        <MetricCard
          icon={<Truck className="h-5 w-5" />}
          label="Pengiriman Bulan Ini"
          trend="9 armada aktif"
          value={formatNumber(dashboard.monthlyShipments)}
        />
        <MetricCard
          icon={<Package className="h-5 w-5" />}
          label="Volume Tahunan"
          trend="KWH Meter"
          value={formatNumber(dashboard.yearlyVolume)}
        />
        <MetricCard
          icon={<Boxes className="h-5 w-5" />}
          label="Stok Gudang"
          trend="Gudang PLN Nusa Daya Makassar"
          value={formatNumber(dashboard.warehouseStock)}
        />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="overflow-hidden">
          <div className="border-b border-pln-line p-5">
            <h2 className="text-lg font-black text-pln-ink">
              Aktivitas Material
            </h2>
            <p className="mt-1 text-sm text-pln-muted">
              Permintaan dan pengiriman berdasarkan status proses.
            </p>
          </div>
          <div className="grid gap-4 p-5 md:grid-cols-4">
            {[
              ['Pending', 14, 'Permintaan baru UP3'],
              ['Approve', 22, 'Disetujui PLN Pusat'],
              ['Process', 18, 'Disiapkan logistik'],
              ['Done', 57, 'Selesai diterima ULP'],
            ].map(([label, value, detail]) => (
              <div className="rounded-lg bg-pln-canvas p-4" key={label}>
                <p className="text-sm font-bold text-pln-muted">{label}</p>
                <p className="mt-3 text-3xl font-black text-pln-blue">
                  {value}
                </p>
                <p className="mt-2 text-xs font-semibold text-pln-muted">
                  {detail}
                </p>
              </div>
            ))}
          </div>
          <div className="px-5 pb-5">
            <div className="h-64 rounded-lg border border-pln-line bg-white p-4">
              <div className="flex h-full items-end gap-3">
                {[52, 78, 48, 88, 64, 96, 72].map((height, index) => (
                  <div
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                    key={height}
                  >
                    <div
                      className="min-h-8 w-full rounded-t-lg bg-gradient-to-t from-pln-blue to-pln-sky"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs font-bold text-pln-muted">
                      H{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-pln-blue" />
            <h2 className="text-lg font-black text-pln-ink">
              Kebutuhan Per Unit
            </h2>
          </div>
          <div className="mt-5 space-y-4">
            {dashboard.units
              .filter((unit) => unit.type === 'ULP')
              .map((unit, index) => (
                <div key={unit.id}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-bold text-pln-ink">{unit.name}</span>
                    <span className="font-bold text-pln-blue">
                      {formatNumber((index + 2) * 1250)} pcs
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-pln-sky"
                      style={{ width: `${52 + index * 14}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="border-b border-pln-line p-5">
            <h2 className="text-lg font-black text-pln-ink">
              Permintaan Terbaru
            </h2>
          </div>
          <div className="divide-y divide-pln-line">
            {dashboard.requests.map((request) => (
              <div className="grid gap-3 p-4 md:grid-cols-[1.3fr_1fr_auto]" key={request.id}>
                <div>
                  <p className="text-sm font-black text-pln-ink">
                    {request.orderNo}
                  </p>
                  <p className="mt-1 text-xs text-pln-muted">
                    {request.recipientUnit}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="font-bold text-pln-ink">
                    {formatNumber(request.quantity)} pcs
                  </p>
                  <p className="mt-1 text-xs text-pln-muted">
                    {formatCurrency(request.amount)}
                  </p>
                </div>
                <div className="md:text-right">
                  <StatusBadge status={request.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-pln-blue" />
            <h2 className="text-lg font-black text-pln-ink">
              Bisnis Proses Pilot Project
            </h2>
          </div>
          <div className="mt-5 space-y-3">
            {[
              'Hasil uji KWH Meter dari PLN Pusertif',
              'Pick up KWH Meter ke pabrikan',
              'KWH tiba di Gudang Makassar',
              'Cek dan input ke aplikasi VMI',
              'Penerimaan order UP3 dan penyiapan material',
              'Pengiriman ke ULP dan konfirmasi penerimaan',
            ].map((step, index) => (
              <div className="flex gap-3" key={step}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pln-blue text-xs font-black text-white">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm font-semibold text-pln-ink">{step}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
