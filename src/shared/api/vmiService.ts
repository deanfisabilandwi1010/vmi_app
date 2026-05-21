import {
  damageReports,
  inspections,
  materialRequests,
  shipments,
  units,
} from '@/shared/data/vmiData'

const wait = (ms = 240) => new Promise((resolve) => window.setTimeout(resolve, ms))

export const vmiService = {
  async getDashboard() {
    await wait()
    return {
      dailyRequests: 18,
      monthlyShipments: 74,
      yearlyVolume: 128_400,
      warehouseStock: 18_750,
      requests: materialRequests,
      shipments,
      inspections,
      units,
    }
  },
  async getRequests() {
    await wait()
    return materialRequests
  },
  async getInspections() {
    await wait()
    return inspections
  },
  async getShipments() {
    await wait()
    return shipments
  },
  async getDamageReports() {
    await wait()
    return damageReports
  },
}
