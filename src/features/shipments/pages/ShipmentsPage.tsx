import { useQuery } from '@tanstack/react-query'
import { CalendarClock, FilePlus2, Map, Send, Truck } from 'lucide-react'
import Swal from 'sweetalert2'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { PageHeader } from '@/shared/components/PageHeader'
import { StatusBadge } from '@/shared/components/StatusBadge'
import { vmiService } from '@/shared/api/vmiService'
import { formatDate, formatNumber } from '@/shared/lib/format'

const shipmentStatuses = [
  'Menunggu Jadwal',
  'Siap Muat',
  'Dalam Perjalanan',
  'Tiba di ULP',
  'Selesai',
]

export const ShipmentsPage = () => {
  const { data = [] } = useQuery({
    queryKey: ['shipments'],
    queryFn: vmiService.getShipments,
  })

  const handleIssueLetter = async (shipmentNo: string) => {
    await Swal.fire({
      icon: 'success',
      title: 'Surat pengiriman diterbitkan',
      text: shipmentNo,
    })
  }

  return (
    <div>
      <PageHeader
        actions={
          <Button icon={<FilePlus2 className="h-4 w-4" />}>
            Terbit Surat Pengiriman
          </Button>
        }
        description="Kelola jadwal pengiriman, surat jalan, moda transportasi, driver, dan pelaporan pengiriman material ke ULP."
        title="Pengiriman Material"
      />

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden">
          <div className="border-b border-pln-line p-5">
            <h2 className="text-lg font-black text-pln-ink">
              Informasi Pengiriman
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-pln-muted">
                <tr>
                  <th className="px-5 py-3">No Pengiriman</th>
                  <th className="px-5 py-3">Rute</th>
                  <th className="px-5 py-3">Jadwal</th>
                  <th className="px-5 py-3">Armada</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((shipment) => (
                  <tr className="border-t border-pln-line" key={shipment.id}>
                    <td className="px-5 py-4">
                      <p className="font-black text-pln-ink">
                        {shipment.shipmentNo}
                      </p>
                      <p className="text-xs text-pln-muted">{shipment.orderNo}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-bold">{shipment.requesterUnit}</p>
                      <p className="text-xs text-pln-muted">
                        ke {shipment.recipientUnit}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p>{formatDate(shipment.schedule)}</p>
                      <p className="text-xs text-pln-muted">
                        ETA {formatDate(shipment.eta)}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-bold">{shipment.plateNo}</p>
                      <p className="text-xs text-pln-muted">{shipment.driver}</p>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={shipment.status} />
                    </td>
                    <td className="px-5 py-4">
                      <Button
                        className="min-h-9 px-3"
                        onClick={() => handleIssueLetter(shipment.shipmentNo)}
                        variant="secondary"
                      >
                        Surat Jalan
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <Send className="h-5 w-5 text-pln-blue" />
            <h2 className="text-lg font-black text-pln-ink">
              Form Terbit Surat Pengiriman
            </h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              ['No. Pengiriman', 'Auto Generate'],
              ['No. Pemesanan', 'ORD/VMI/2026/0001'],
              ['Pengirim', 'PT. PLN Nusa Daya'],
              ['Unit Pemesan', 'UP3 Sulselrabar'],
              ['Unit Penerima', 'ULP Makassar Timur'],
              ['Jadwal Pengiriman', '2026-05-21'],
              ['Estimasi Tiba', '2026-05-21'],
              ['Kilometer Perjalanan', '18 km'],
              ['Moda Transportasi', 'Truk Box'],
              ['No. Plat Kendaraan', 'DD 8401 ND'],
              ['Driver/Pengemudi', 'Irfan Saputra'],
              ['Upload Surat Jalan', 'surat-jalan.pdf'],
            ].map(([label, value]) => (
              <label className="block" key={label}>
                <span className="text-xs font-black uppercase text-pln-muted">
                  {label}
                </span>
                <input
                  className="focus-ring mt-2 h-10 w-full rounded-lg border border-pln-line px-3 text-sm outline-none read-only:bg-slate-50"
                  defaultValue={value}
                  readOnly={['No. Pengiriman', 'Pengirim', 'Unit Pemesan', 'Unit Penerima', 'Kilometer Perjalanan'].includes(label)}
                />
              </label>
            ))}
          </div>
          <Button className="mt-5 w-full">Simpan Surat Pengiriman</Button>
        </Card>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <CalendarClock className="h-5 w-5 text-pln-blue" />
            <h2 className="font-black text-pln-ink">Status Pengiriman</h2>
          </div>
          <div className="mt-5 space-y-4">
            {shipmentStatuses.map((status, index) => (
              <div className="flex items-center gap-3" key={status}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pln-blue text-xs font-black text-white">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-pln-ink">{status}</p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-pln-sky"
                      style={{ width: `${Math.min(100, (index + 1) * 20)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <Map className="h-5 w-5 text-pln-blue" />
            <h2 className="font-black text-pln-ink">Laporan Pengiriman</h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              ['Total jarak', `${formatNumber(460)} km`],
              ['Pengiriman aktif', `${formatNumber(data.length)} order`],
              ['SLA tepat waktu', '96%'],
            ].map(([label, value]) => (
              <div className="rounded-lg bg-pln-canvas p-4" key={label}>
                <p className="text-sm font-bold text-pln-muted">{label}</p>
                <p className="mt-2 text-2xl font-black text-pln-blue">{value}</p>
              </div>
            ))}
          </div>
          <div className="grid-map mt-5 h-64 rounded-lg border border-pln-line bg-blue-50">
            <div className="flex h-full items-center justify-center gap-4 text-pln-blue">
              <Truck className="h-11 w-11" />
              <div>
                <p className="font-black">Simulasi Google Map</p>
                <p className="text-sm text-pln-muted">
                  Siap dihubungkan ke API Maps dan IoT GPS Tracker.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
