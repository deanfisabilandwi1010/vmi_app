import { useQuery } from '@tanstack/react-query'
import { MapPin, Navigation, RadioTower, Truck } from 'lucide-react'
import { Card } from '@/shared/components/Card'
import { PageHeader } from '@/shared/components/PageHeader'
import { StatusBadge } from '@/shared/components/StatusBadge'
import { vmiService } from '@/shared/api/vmiService'

export const TrackingPage = () => {
  const { data = [] } = useQuery({
    queryKey: ['shipments'],
    queryFn: vmiService.getShipments,
  })

  return (
    <div>
      <PageHeader
        description="Board realtime untuk posisi transportasi, status armada, estimasi tiba, dan kesiapan integrasi Google Map serta GPS tracker IoT."
        title="Tracking Pengiriman"
      />
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden">
          <div className="grid-map relative h-[540px] bg-blue-50">
            <div className="absolute left-[12%] top-[22%] rounded-lg bg-white p-3 shadow-soft">
              <MapPin className="h-6 w-6 text-red-600" />
              <p className="mt-1 text-xs font-black">Pabrik</p>
            </div>
            <div className="absolute left-[46%] top-[42%] rounded-lg bg-white p-3 shadow-soft">
              <Truck className="h-7 w-7 text-pln-blue" />
              <p className="mt-1 text-xs font-black">DD 8401 ND</p>
            </div>
            <div className="absolute right-[12%] top-[58%] rounded-lg bg-white p-3 shadow-soft">
              <MapPin className="h-6 w-6 text-emerald-600" />
              <p className="mt-1 text-xs font-black">ULP Tujuan</p>
            </div>
            <div className="absolute inset-x-[18%] top-[48%] h-1 -rotate-6 rounded-full bg-pln-blue/35" />
            <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-pln-line bg-white/95 p-4 backdrop-blur">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-black text-pln-ink">
                    Integrasi Google Map
                  </p>
                  <p className="text-xs text-pln-muted">
                    Gunakan VITE_GOOGLE_MAPS_API_KEY dan endpoint GPS kendaraan
                    saat backend/mobile tersedia.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-700">
                  <RadioTower className="h-4 w-4" />
                  Signal aktif
                </div>
              </div>
            </div>
          </div>
        </Card>
        <div className="space-y-5">
          {data.map((shipment) => (
            <Card className="p-5" key={shipment.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-black text-pln-ink">{shipment.shipmentNo}</p>
                  <p className="mt-1 text-sm text-pln-muted">
                    {shipment.recipientUnit}
                  </p>
                </div>
                <StatusBadge status={shipment.status} />
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-pln-sky"
                  style={{ width: `${shipment.progress}%` }}
                />
              </div>
              <div className="mt-4 grid gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-pln-blue" />
                  <span className="font-semibold">
                    {shipment.distanceKm} km - {shipment.driver}
                  </span>
                </div>
                <p className="text-pln-muted">
                  {shipment.transportMode} / {shipment.plateNo}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
