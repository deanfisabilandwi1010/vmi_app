export type RequestStatus = 'Pending' | 'Approve' | 'Process' | 'Done'
export type ShipmentStatus =
  | 'Menunggu Jadwal'
  | 'Siap Muat'
  | 'Dalam Perjalanan'
  | 'Tiba di ULP'
  | 'Selesai'
export type InspectionDecision = 'Accept' | 'On Hold' | 'Reject'

export type Unit = {
  id: string
  name: string
  type: 'UP3' | 'ULP'
  address: string
  phone: string
  pricePerKg: number
  lat: number
  lng: number
}

export type MaterialRequest = {
  id: string
  orderNo: string
  requesterUnit: string
  recipientUnit: string
  requesterName: string
  recipientName: string
  quantity: number
  weightKg: number
  amount: number
  status: RequestStatus
  createdAt: string
}

export type PickupInspection = {
  id: string
  poNo: string
  doNo: string
  supplier: string
  inspector: string
  orderedQty: number
  acceptedQty: number
  checklistOk: number
  checklistNg: number
  passRate: number
  decision: InspectionDecision
  vehicle: string
  status: string
}

export type Shipment = {
  id: string
  shipmentNo: string
  orderNo: string
  requesterUnit: string
  recipientUnit: string
  schedule: string
  eta: string
  distanceKm: number
  transportMode: string
  plateNo: string
  driver: string
  status: ShipmentStatus
  progress: number
}

export type DamageReport = {
  id: string
  location: string
  category: string
  quantity: number
  lossValue: number
  status: 'Investigasi' | 'Asuransi' | 'Ditutup'
}
