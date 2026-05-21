import { useQuery } from '@tanstack/react-query'
import { AlertTriangle, ShieldCheck } from 'lucide-react'
import { Card } from '@/shared/components/Card'
import { PageHeader } from '@/shared/components/PageHeader'
import { vmiService } from '@/shared/api/vmiService'
import { formatCurrency, formatNumber } from '@/shared/lib/format'

export const DamagePage = () => {
  const { data = [] } = useQuery({
    queryKey: ['damage-reports'],
    queryFn: vmiService.getDamageReports,
  })

  return (
    <div>
      <PageHeader
        description="Pencatatan kerusakan material dalam perjalanan, pengiriman ke ULP, cacat, kehilangan, dan tindak lanjut asuransi."
        title="Laporan Kerusakan"
      />
      <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <h2 className="font-black text-pln-ink">Ringkasan Risiko</h2>
          </div>
          <div className="mt-5 space-y-4">
            <div className="rounded-lg bg-amber-50 p-4">
              <p className="text-sm font-bold text-amber-800">Material terdampak</p>
              <p className="mt-2 text-3xl font-black text-amber-900">
                {formatNumber(data.reduce((total, item) => total + item.quantity, 0))}
              </p>
            </div>
            <div className="rounded-lg bg-red-50 p-4">
              <p className="text-sm font-bold text-red-800">Estimasi kerugian</p>
              <p className="mt-2 text-3xl font-black text-red-900">
                {formatCurrency(data.reduce((total, item) => total + item.lossValue, 0))}
              </p>
            </div>
          </div>
        </Card>
        <Card className="overflow-hidden">
          <div className="border-b border-pln-line p-5">
            <h2 className="text-lg font-black text-pln-ink">
              Daftar Kerusakan Material
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-pln-muted">
                <tr>
                  <th className="px-5 py-3">Lokasi</th>
                  <th className="px-5 py-3">Kategori</th>
                  <th className="px-5 py-3">Jumlah</th>
                  <th className="px-5 py-3">Kerugian</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((report) => (
                  <tr className="border-t border-pln-line" key={report.id}>
                    <td className="px-5 py-4 font-bold text-pln-ink">
                      {report.location}
                    </td>
                    <td className="px-5 py-4">{report.category}</td>
                    <td className="px-5 py-4">{formatNumber(report.quantity)}</td>
                    <td className="px-5 py-4">{formatCurrency(report.lossValue)}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-pln-blue">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
