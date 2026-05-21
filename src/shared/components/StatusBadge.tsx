import type { RequestStatus, ShipmentStatus } from '@/shared/types/vmi'

type StatusBadgeProps = {
  status: RequestStatus | ShipmentStatus | string
}

const toneMap: Record<string, string> = {
  Pending: 'bg-amber-100 text-amber-800',
  Approve: 'bg-sky-100 text-sky-800',
  Process: 'bg-indigo-100 text-indigo-800',
  Done: 'bg-emerald-100 text-emerald-800',
  'Menunggu Jadwal': 'bg-slate-100 text-slate-700',
  'Siap Muat': 'bg-amber-100 text-amber-800',
  'Dalam Perjalanan': 'bg-indigo-100 text-indigo-800',
  'Tiba di ULP': 'bg-sky-100 text-sky-800',
  Selesai: 'bg-emerald-100 text-emerald-800',
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${toneMap[status] ?? 'bg-slate-100 text-slate-700'}`}
    >
      {status}
    </span>
  )
}
