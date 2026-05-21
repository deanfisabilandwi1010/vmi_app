import { useQuery } from '@tanstack/react-query'
import {
  Camera,
  Check,
  ClipboardList,
  FileCheck2,
  MapPinned,
  PackageSearch,
  Star,
  Truck,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { PageHeader } from '@/shared/components/PageHeader'
import { vmiService } from '@/shared/api/vmiService'
import { formatNumber } from '@/shared/lib/format'

const checklistItems = [
  'Dokumen Surat Jalan/Delivery Order.',
  'Kuantitas sesuai dengan yang dipesan.',
  'Label dan marking material terbaca jelas.',
  'Kondisi kemasan dalam keadaan baik.',
  'Tidak ada kerusakan fisik pada material.',
  'Dokumen Sertifikat/CoA/CoC tersedia.',
  'Tanggal kadaluarsa masih berlaku.',
  'Spesifikasi sesuai dokumen teknis.',
  'Segel/seal tidak rusak.',
  'Material tidak berbahaya/B3 sesuai MSDS.',
  'Invoice/Faktur tersedia dan sesuai.',
]

const steps = [
  { title: 'Data Material', icon: PackageSearch },
  { title: 'Checklist', icon: ClipboardList },
  { title: 'Bukti Foto', icon: Camera },
  { title: 'Keputusan', icon: FileCheck2 },
]

export const PickupPage = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [checks, setChecks] = useState<Record<string, boolean>>(
    Object.fromEntries(checklistItems.map((item) => [item, true])),
  )
  const { data = [] } = useQuery({
    queryKey: ['inspections'],
    queryFn: vmiService.getInspections,
  })

  const okCount = useMemo(
    () => Object.values(checks).filter(Boolean).length,
    [checks],
  )
  const ngCount = checklistItems.length - okCount
  const passRate = Math.round((okCount / checklistItems.length) * 100)

  return (
    <div>
      <PageHeader
        actions={<Button>Tambah Inspeksi Material</Button>}
        description="Proses pengambilan dan inspeksi material dari pabrik menuju Gudang PLN Nusa Daya Makassar dengan template form wizard."
        title="Pengambilan Material"
      />

      <div className="grid gap-5">
        <Card className="overflow-hidden">
          <div className="border-b border-pln-line p-5">
            <h2 className="text-lg font-black text-pln-ink">
              Informasi Pengambilan Material
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-pln-muted">
                <tr>
                  <th className="px-5 py-3">PO / DO</th>
                  <th className="px-5 py-3">Supplier</th>
                  <th className="px-5 py-3">Qty</th>
                  <th className="px-5 py-3">Keputusan</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((inspection) => (
                  <tr className="border-t border-pln-line" key={inspection.id}>
                    <td className="px-5 py-4">
                      <p className="font-black text-pln-ink">{inspection.poNo}</p>
                      <p className="text-xs text-pln-muted">{inspection.doNo}</p>
                    </td>
                    <td className="px-5 py-4">{inspection.supplier}</td>
                    <td className="px-5 py-4">
                      {formatNumber(inspection.acceptedQty)} /{' '}
                      {formatNumber(inspection.orderedQty)}
                    </td>
                    <td className="px-5 py-4 font-bold">
                      {inspection.decision}
                    </td>
                    <td className="px-5 py-4">{inspection.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex flex-wrap gap-2">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <button
                  className={`focus-ring flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold ${activeStep === index ? 'bg-pln-blue text-white' : 'bg-slate-100 text-pln-muted'}`}
                  key={step.title}
                  onClick={() => setActiveStep(index)}
                  type="button"
                >
                  <Icon className="h-4 w-4" />
                  {step.title}
                </button>
              )
            })}
          </div>

          <div className="mt-6">
            {activeStep === 0 ? <MaterialStep /> : null}
            {activeStep === 1 ? (
              <ChecklistStep checks={checks} setChecks={setChecks} />
            ) : null}
            {activeStep === 2 ? <PhotoStep /> : null}
            {activeStep === 3 ? (
              <DecisionStep ngCount={ngCount} okCount={okCount} passRate={passRate} />
            ) : null}
          </div>

          <div className="mt-6 flex justify-between gap-3">
            <Button
              disabled={activeStep === 0}
              onClick={() => setActiveStep((step) => Math.max(0, step - 1))}
              variant="secondary"
            >
              Kembali
            </Button>
            <Button
              onClick={() =>
                setActiveStep((step) => Math.min(steps.length - 1, step + 1))
              }
            >
              Lanjutkan
            </Button>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <MapPinned className="h-5 w-5 text-pln-blue" />
            <h2 className="font-black text-pln-ink">GPS Penjemputan</h2>
          </div>
          <div className="grid-map mt-4 h-56 rounded-lg border border-pln-line bg-blue-50 p-4">
            <div className="flex h-full items-center justify-center">
              <Truck className="h-10 w-10 text-pln-blue" />
            </div>
          </div>
        </Card>
        <Card className="p-5 lg:col-span-2">
          <h2 className="font-black text-pln-ink">Board Analisis Pengambilan</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              ['Inspeksi', '2 aktif', 'Material sedang diverifikasi'],
              ['Penghantaran', '1 armada', 'Menuju Gudang Makassar'],
              ['Gudang', '18.750 pcs', 'Stok siap order'],
            ].map(([label, value, detail]) => (
              <div className="rounded-lg bg-pln-canvas p-4" key={label}>
                <p className="text-sm font-bold text-pln-muted">{label}</p>
                <p className="mt-2 text-2xl font-black text-pln-blue">{value}</p>
                <p className="mt-2 text-xs font-semibold text-pln-muted">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

const MaterialStep = () => (
  <div className="grid gap-4 md:grid-cols-2">
    {[
      ['No. PO/Purchase Order', 'PO-PLN-260503'],
      ['Nama Material', 'KWH Meter'],
      ['Supplier/Vendor', 'PLN Pusertif'],
      ['Qty Dipesan', '6000'],
      ['Satuan', 'pcs'],
      ['Nama Inspektor', 'M. Fauzan'],
      ['No. DO/Delivery Order', 'DO-KWH-9902'],
      ['Kode File Verifikasi', 'VRF-260521-A'],
    ].map(([label, value]) => (
      <label className="block" key={label}>
        <span className="text-xs font-black uppercase text-pln-muted">
          {label}
        </span>
        <input
          className="focus-ring mt-2 h-10 w-full rounded-lg border border-pln-line px-3 text-sm outline-none"
          defaultValue={value}
          readOnly={label === 'Nama Material' || label === 'Satuan'}
        />
      </label>
    ))}
    <label className="block md:col-span-2">
      <span className="text-xs font-black uppercase text-pln-muted">
        Upload Bukti Label Verifikasi
      </span>
      <input
        className="focus-ring mt-2 h-10 w-full rounded-lg border border-pln-line px-3 text-sm outline-none"
        defaultValue="label-verifikasi.pdf, foto-label.jpg"
      />
    </label>
  </div>
)

type ChecklistStepProps = {
  checks: Record<string, boolean>
  setChecks: (checks: Record<string, boolean>) => void
}

const ChecklistStep = ({ checks, setChecks }: ChecklistStepProps) => (
  <div className="space-y-3">
    {checklistItems.map((item) => (
      <div
        className="grid gap-3 rounded-lg border border-pln-line p-3 md:grid-cols-[1fr_auto]"
        key={item}
      >
        <p className="text-sm font-semibold text-pln-ink">{item}</p>
        <div className="flex gap-2">
          {[true, false].map((value) => (
            <button
              className={`rounded-lg px-3 py-1 text-xs font-black ${checks[item] === value ? 'bg-pln-blue text-white' : 'bg-slate-100 text-pln-muted'}`}
              key={String(value)}
              onClick={() => setChecks({ ...checks, [item]: value })}
              type="button"
            >
              {value ? 'Ada' : 'Tidak Ada'}
            </button>
          ))}
        </div>
      </div>
    ))}
    <textarea
      className="focus-ring min-h-24 w-full rounded-lg border border-pln-line p-3 text-sm outline-none"
      placeholder="Catatan temuan opsional"
    />
  </div>
)

const PhotoStep = () => (
  <div className="space-y-5">
    {['Kondisi Kemasan', 'Kondisi Material/Fisik', 'Kelengkapan Dokumen'].map(
      (label) => (
        <div className="flex items-center justify-between gap-4" key={label}>
          <span className="text-sm font-bold text-pln-ink">{label}</span>
          <div className="flex gap-1 text-pln-yellow">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star className="h-5 w-5 fill-current" key={index} />
            ))}
          </div>
        </div>
      ),
    )}
    <div className="rounded-lg border border-dashed border-pln-line bg-slate-50 p-8 text-center">
      <Camera className="mx-auto h-8 w-8 text-pln-blue" />
      <p className="mt-3 text-sm font-bold text-pln-ink">
        Upload bukti foto kondisi material
      </p>
      <p className="mt-1 text-xs text-pln-muted">jpg atau jpeg</p>
    </div>
  </div>
)

type DecisionStepProps = {
  okCount: number
  ngCount: number
  passRate: number
}

const DecisionStep = ({ ngCount, okCount, passRate }: DecisionStepProps) => (
  <div className="space-y-5">
    <div className="grid gap-3 md:grid-cols-3">
      {[
        ['Item OK', okCount],
        ['Item NG', ngCount],
        ['Pass Rate', `${passRate}%`],
      ].map(([label, value]) => (
        <div className="rounded-lg bg-pln-canvas p-4 text-center" key={label}>
          <p className="text-2xl font-black text-pln-blue">{value}</p>
          <p className="text-xs font-bold uppercase text-pln-muted">{label}</p>
        </div>
      ))}
    </div>
    <div className="rounded-lg border border-pln-line p-4">
      <h3 className="font-black text-pln-ink">Informasi Material</h3>
      <dl className="mt-3 grid gap-2 text-sm md:grid-cols-2">
        {[
          ['Material', 'KWH Meter'],
          ['Supplier', 'PLN Pusertif'],
          ['No. PO', 'PO-PLN-260503'],
          ['Qty Diterima', '6000 pcs'],
          ['Foto Bukti', '3 foto'],
          ['Inspector', 'M. Fauzan'],
        ].map(([label, value]) => (
          <div className="flex justify-between gap-4" key={label}>
            <dt className="text-pln-muted">{label}</dt>
            <dd className="font-bold text-pln-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
    <div>
      <p className="text-sm font-black text-pln-ink">Keputusan Akhir</p>
      <div className="mt-3 grid gap-2 md:grid-cols-3">
        {['Terima (Accept)', 'Tahan (On Hold)', 'Tolak (Reject)'].map(
          (label, index) => (
            <label
              className="flex items-center gap-2 rounded-lg border border-pln-line p-3 text-sm font-bold"
              key={label}
            >
              <input defaultChecked={index === 0} name="decision" type="radio" />
              {label}
            </label>
          ),
        )}
      </div>
    </div>
    <textarea
      className="focus-ring min-h-24 w-full rounded-lg border border-pln-line p-3 text-sm outline-none"
      placeholder="Alasan / justifikasi keputusan"
    />
    <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm font-bold text-emerald-700">
      <Check className="h-4 w-4" />
      Draft hasil inspeksi siap disubmit.
    </div>
  </div>
)
