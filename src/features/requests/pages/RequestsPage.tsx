import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import {
  CheckCircle2,
  Download,
  Edit,
  Eye,
  Plus,
  Search,
  Trash2,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import Swal from 'sweetalert2'
import { z } from 'zod'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { Modal } from '@/shared/components/Modal'
import { PageHeader } from '@/shared/components/PageHeader'
import { StatusBadge } from '@/shared/components/StatusBadge'
import { units } from '@/shared/data/vmiData'
import { vmiService } from '@/shared/api/vmiService'
import { formatCurrency, formatDate, formatNumber } from '@/shared/lib/format'

const requestSchema = z.object({
  requesterUnit: z.string().min(1, 'Unit pemesan wajib dipilih'),
  requesterAddress: z.string(),
  requesterPhone: z.string(),
  requesterName: z.string().min(2, 'Nama pemesan wajib diisi'),
  recipientUnit: z.string().min(1, 'Unit penerima wajib dipilih'),
  recipientAddress: z.string(),
  recipientPhone: z.string(),
  recipientName: z.string().min(2, 'Nama penerima wajib diisi'),
  material: z.literal('KWH Meter'),
  quantity: z.number().min(1000, 'Jumlah minimal 1000 pcs'),
  weightKg: z.number(),
  amount: z.number(),
  document: z.string().min(1, 'Dokumen permintaan wajib diunggah'),
})

type RequestValues = z.infer<typeof requestSchema>

const up3Units = units.filter((unit) => unit.type === 'UP3')
const ulpUnits = units.filter((unit) => unit.type === 'ULP')

export const RequestsPage = () => {
  const [filter, setFilter] = useState('all')
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { data = [] } = useQuery({
    queryKey: ['requests'],
    queryFn: vmiService.getRequests,
  })
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    control,
  } = useForm<RequestValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      requesterUnit: up3Units[0]?.id,
      requesterName: '',
      recipientUnit: ulpUnits[0]?.id,
      recipientName: '',
      material: 'KWH Meter',
      quantity: 1000,
      weightKg: 1200,
      amount: 5_280_000,
      document: '',
    },
  })

  const watchedValues = useWatch({ control })
  const requesterUnitId = watchedValues.requesterUnit
  const recipientUnitId = watchedValues.recipientUnit
  const quantity = watchedValues.quantity
  const selectedRecipient = ulpUnits.find((unit) => unit.id === recipientUnitId)

  useEffect(() => {
    const requester = up3Units.find((unit) => unit.id === requesterUnitId)
    const recipient = ulpUnits.find((unit) => unit.id === recipientUnitId)
    if (requester) {
      setValue('requesterAddress', requester.address)
      setValue('requesterPhone', requester.phone)
    }
    if (recipient) {
      setValue('recipientAddress', recipient.address)
      setValue('recipientPhone', recipient.phone)
    }
  }, [recipientUnitId, requesterUnitId, setValue])

  useEffect(() => {
    const weight = Number(quantity || 0) * 1.2
    setValue('weightKg', weight)
    setValue('amount', weight * (selectedRecipient?.pricePerKg ?? 0))
  }, [quantity, selectedRecipient?.pricePerKg, setValue])

  const filteredRequests = useMemo(() => {
    return data.filter((request) => {
      const matchesFilter = filter === 'all' || request.status === filter
      const term = search.toLowerCase()
      const matchesSearch = [
        request.orderNo,
        request.requesterUnit,
        request.recipientUnit,
        request.requesterName,
        request.recipientName,
      ]
        .join(' ')
        .toLowerCase()
        .includes(term)
      return matchesFilter && matchesSearch
    })
  }, [data, filter, search])

  const handleSave = handleSubmit(async (values) => {
    await Swal.fire({
      icon: 'success',
      title: 'Permintaan divalidasi',
      html: `Order ${formatNumber(values.quantity)} pcs dengan berat ${formatNumber(values.weightKg)} kg siap dikirim ke workflow approval.`,
    })
    setIsRequestModalOpen(false)
  })

  const handleApprove = async (orderNo: string) => {
    await Swal.fire({
      icon: 'success',
      title: 'Permintaan disetujui',
      text: `${orderNo} masuk ke tahap penyiapan material.`,
    })
  }

  return (
    <div>
      <PageHeader
        actions={
          <>
            <Button icon={<Download className="h-4 w-4" />} variant="secondary">
              Export Data
            </Button>
            <Button
              icon={<Plus className="h-4 w-4" />}
              onClick={() => setIsRequestModalOpen(true)}
            >
              Tambah Permintaan
            </Button>
          </>
        }
        description="Kelola order material dari UP3, approval PLN Pusat, auto kalkulasi berat dan harga berdasarkan harga ketentuan lokasi ULP."
        title="Permintaan Material"
      />

      <div className="grid gap-5">
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-pln-line p-5 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pln-muted" />
              <input
                className="focus-ring h-11 w-full rounded-lg border border-pln-line pl-10 pr-3 text-sm outline-none"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari pemesan, penerima, jumlah, atau status"
                value={search}
              />
            </div>
            <select
              className="focus-ring h-11 rounded-lg border border-pln-line px-3 text-sm font-semibold outline-none"
              onChange={(event) => setFilter(event.target.value)}
              value={filter}
            >
              <option value="all">Semua status</option>
              <option value="Pending">Pending</option>
              <option value="Approve">Approve</option>
              <option value="Process">Process</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-pln-muted">
                <tr>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Pemesan</th>
                  <th className="px-5 py-3">Penerima</th>
                  <th className="px-5 py-3">Jumlah</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr className="border-t border-pln-line" key={request.id}>
                    <td className="px-5 py-4">
                      <p className="font-black text-pln-ink">{request.orderNo}</p>
                      <p className="text-xs text-pln-muted">
                        {formatDate(request.createdAt)}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-bold">{request.requesterUnit}</p>
                      <p className="text-xs text-pln-muted">
                        {request.requesterName}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-bold">{request.recipientUnit}</p>
                      <p className="text-xs text-pln-muted">
                        {request.recipientName}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      {formatNumber(request.quantity)} pcs
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={request.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          aria-label="Edit"
                          className="rounded-lg border border-pln-line p-2 text-pln-muted"
                          onClick={() => setIsRequestModalOpen(true)}
                          type="button"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button aria-label="Detail" className="rounded-lg border border-pln-line p-2 text-pln-muted">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          aria-label="Hapus"
                          className="rounded-lg border border-pln-line p-2 text-red-600 disabled:text-slate-300"
                          disabled={request.status !== 'Pending'}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button
                          aria-label="Approve"
                          className="rounded-lg border border-pln-line p-2 text-emerald-700"
                          onClick={() => handleApprove(request.orderNo)}
                          type="button"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Modal
        description="Lengkapi data pemesan, unit penerima, jumlah KWH Meter, dan dokumen surat permintaan dalam satu dialog terfokus."
        isOpen={isRequestModalOpen}
        maxWidth="6xl"
        onClose={() => setIsRequestModalOpen(false)}
        title="Form Tambah / Update Permintaan"
      >
        <form className="grid gap-4" onSubmit={handleSave}>
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField label="Unit Pemesan (UP3)" {...register('requesterUnit')}>
              {up3Units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </SelectField>
            <InputField label="Nama Pemesan" {...register('requesterName')} />
            <InputField
              label="Alamat Unit"
              readOnly
              {...register('requesterAddress')}
            />
            <InputField
              label="Telepon/WA"
              readOnly
              {...register('requesterPhone')}
            />
            <SelectField label="Unit Penerima (ULP)" {...register('recipientUnit')}>
              {ulpUnits.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </SelectField>
            <InputField label="Nama Penerima" {...register('recipientName')} />
            <InputField
              label="Alamat Penerima"
              readOnly
              {...register('recipientAddress')}
            />
            <InputField
              label="Telepon/WA Penerima"
              readOnly
              {...register('recipientPhone')}
            />
            <InputField label="Jenis Barang" readOnly {...register('material')} />
            <InputField
              label="Jumlah Barang"
              min={1000}
              type="number"
              {...register('quantity', { valueAsNumber: true })}
            />
            <InputField
              label="Berat Barang (kg)"
              readOnly
              type="number"
              {...register('weightKg', { valueAsNumber: true })}
            />
            <InputField
              label="Harga Barang"
              readOnly
              value={formatCurrency(watchedValues.amount || 0)}
            />
            <InputField
              label="Upload Dokumen"
              placeholder="surat-permintaan.pdf"
              {...register('document')}
            />
          </div>
          {Object.values(errors).length > 0 ? (
            <p className="rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">
              Mohon lengkapi field wajib. Jumlah minimal 1000 pcs dan dokumen
              wajib berupa pdf/docx/jpg/jpeg/xlsx.
            </p>
          ) : null}
          <div className="flex flex-col-reverse gap-3 border-t border-pln-line pt-4 sm:flex-row sm:justify-end">
            <Button
              onClick={() => setIsRequestModalOpen(false)}
              type="button"
              variant="secondary"
            >
              Batal
            </Button>
            <Button type="submit">Checkout Permintaan</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

const InputField = ({ label, ...props }: FieldProps) => (
  <label className="block">
    <span className="text-xs font-black uppercase text-pln-muted">{label}</span>
    <input
      className="focus-ring mt-2 h-10 w-full rounded-lg border border-pln-line px-3 text-sm outline-none read-only:bg-slate-50"
      {...props}
    />
  </label>
)

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
}

const SelectField = ({ children, label, ...props }: SelectFieldProps) => (
  <label className="block">
    <span className="text-xs font-black uppercase text-pln-muted">{label}</span>
    <select
      className="focus-ring mt-2 h-10 w-full rounded-lg border border-pln-line px-3 text-sm outline-none"
      {...props}
    >
      {children}
    </select>
  </label>
)
