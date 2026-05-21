import { useQuery } from '@tanstack/react-query'
import { FileSpreadsheet, ReceiptText, WalletCards } from 'lucide-react'
import { Card } from '@/shared/components/Card'
import { PageHeader } from '@/shared/components/PageHeader'
import { vmiService } from '@/shared/api/vmiService'
import { formatCurrency, formatNumber } from '@/shared/lib/format'

export const FinancePage = () => {
  const { data = [] } = useQuery({
    queryKey: ['requests'],
    queryFn: vmiService.getRequests,
  })
  const delivered = data.filter((request) => request.status === 'Done')
  const draft = data.filter((request) => request.status !== 'Done')
  const draftValue = draft.reduce((total, item) => total + item.amount, 0)

  return (
    <div>
      <PageHeader
        description="Monitoring tagihan permintaan material, draft tagihan, dan kerugian material akibat kerusakan atau klaim asuransi."
        title="Finansial"
      />
      <div className="grid gap-5 md:grid-cols-3">
        <FinanceCard
          icon={<ReceiptText className="h-5 w-5" />}
          label="Tagihan siap invoice"
          value={formatCurrency(
            delivered.reduce((total, item) => total + item.amount, 0),
          )}
        />
        <FinanceCard
          icon={<FileSpreadsheet className="h-5 w-5" />}
          label="Draft tagihan"
          value={formatCurrency(draftValue)}
        />
        <FinanceCard
          icon={<WalletCards className="h-5 w-5" />}
          label="Estimasi kerugian"
          value={formatCurrency(7_800_000)}
        />
      </div>
      <Card className="mt-6 overflow-hidden">
        <div className="border-b border-pln-line p-5">
          <h2 className="text-lg font-black text-pln-ink">
            Laporan Draf Tagihan Permintaan Material
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-pln-muted">
              <tr>
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">ULP</th>
                <th className="px-5 py-3">Qty</th>
                <th className="px-5 py-3">Berat</th>
                <th className="px-5 py-3">Nilai</th>
              </tr>
            </thead>
            <tbody>
              {draft.map((request) => (
                <tr className="border-t border-pln-line" key={request.id}>
                  <td className="px-5 py-4 font-black text-pln-ink">
                    {request.orderNo}
                  </td>
                  <td className="px-5 py-4">{request.recipientUnit}</td>
                  <td className="px-5 py-4">{formatNumber(request.quantity)}</td>
                  <td className="px-5 py-4">{formatNumber(request.weightKg)} kg</td>
                  <td className="px-5 py-4">{formatCurrency(request.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

type FinanceCardProps = {
  icon: React.ReactNode
  label: string
  value: string
}

const FinanceCard = ({ icon, label, value }: FinanceCardProps) => (
  <Card className="p-5">
    <div className="flex items-center gap-3 text-pln-blue">{icon}</div>
    <p className="mt-4 text-sm font-bold text-pln-muted">{label}</p>
    <p className="mt-3 text-2xl font-black text-pln-ink">{value}</p>
  </Card>
)
