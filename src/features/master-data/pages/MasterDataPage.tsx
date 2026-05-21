import { Database, KeyRound, Users } from 'lucide-react'
import { Card } from '@/shared/components/Card'
import { PageHeader } from '@/shared/components/PageHeader'
import { units } from '@/shared/data/vmiData'

const masterItems = [
  'Master Pengguna',
  'Master Roles',
  'Master Menu',
  'Master Permission',
  'Master Supplier/Vendor',
  'Master Unit UP3',
  'Master Unit ULP',
  'Master Status Tracking',
  'Master Pegawai',
]

export const MasterDataPage = () => {
  return (
    <div>
      <PageHeader
        description="Pusat referensi data untuk user, roles, permission, supplier, unit, status tracking, dan pegawai."
        title="Master Data"
      />
      <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <Database className="h-5 w-5 text-pln-blue" />
            <h2 className="font-black text-pln-ink">Domain Master</h2>
          </div>
          <div className="mt-5 grid gap-2">
            {masterItems.map((item) => (
              <button
                className="focus-ring flex items-center justify-between rounded-lg border border-pln-line px-3 py-3 text-left text-sm font-bold text-pln-ink"
                key={item}
                type="button"
              >
                {item}
                <KeyRound className="h-4 w-4 text-pln-muted" />
              </button>
            ))}
          </div>
        </Card>
        <Card className="overflow-hidden">
          <div className="border-b border-pln-line p-5">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-pln-blue" />
              <h2 className="text-lg font-black text-pln-ink">Master Unit</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-pln-muted">
                <tr>
                  <th className="px-5 py-3">Kode</th>
                  <th className="px-5 py-3">Nama</th>
                  <th className="px-5 py-3">Tipe</th>
                  <th className="px-5 py-3">Telepon</th>
                  <th className="px-5 py-3">Alamat</th>
                </tr>
              </thead>
              <tbody>
                {units.map((unit) => (
                  <tr className="border-t border-pln-line" key={unit.id}>
                    <td className="px-5 py-4 font-black text-pln-ink">
                      {unit.id}
                    </td>
                    <td className="px-5 py-4">{unit.name}</td>
                    <td className="px-5 py-4">{unit.type}</td>
                    <td className="px-5 py-4">{unit.phone}</td>
                    <td className="px-5 py-4">{unit.address}</td>
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
