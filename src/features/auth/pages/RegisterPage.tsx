import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { z } from 'zod'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'

const registerSchema = z
  .object({
    firstName: z.string().min(2, 'Nama depan wajib diisi'),
    lastName: z.string().optional(),
    email: z.string().email('Format email tidak valid'),
    password: z.string().min(8, 'Password minimal 8 karakter'),
    confirmPassword: z.string().min(8, 'Konfirmasi minimal 8 karakter'),
    acceptTerms: z.boolean().refine(Boolean, 'Persyaratan wajib disetujui'),
    confirmRegistration: z
      .boolean()
      .refine(Boolean, 'Konfirmasi pendaftaran wajib dicentang'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Konfirmasi password tidak sama',
    path: ['confirmPassword'],
  })

type RegisterValues = z.infer<typeof registerSchema>

export const RegisterPage = () => {
  const navigate = useNavigate()
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      acceptTerms: false,
      confirmRegistration: false,
    },
  })

  const handleRegister = handleSubmit(async () => {
    await Swal.fire({
      icon: 'success',
      title: 'Registrasi diterima',
      text: 'Akun akan diverifikasi oleh Super Admin.',
    })
    navigate('/login')
  })

  return (
    <Card className="mx-auto w-full max-w-2xl p-6 md:p-8">
      <h2 className="text-2xl font-black text-pln-ink">Registrasi pengguna</h2>
      <p className="mt-2 text-sm text-pln-muted">
        Form manual untuk staf, manager, supplier, customer, recipient, dan UP3.
      </p>
      <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleRegister}>
        {[
          ['firstName', 'Nama Depan', 'text'],
          ['lastName', 'Nama Belakang', 'text'],
          ['email', 'Email', 'email'],
          ['password', 'Password', 'password'],
          ['confirmPassword', 'Konfirmasi Password', 'password'],
        ].map(([name, label, type]) => (
          <label className="block" key={name}>
            <span className="text-sm font-bold text-pln-ink">{label}</span>
            <input
              className="focus-ring mt-2 h-11 w-full rounded-lg border border-pln-line px-3 outline-none"
              type={type}
              {...register(name as keyof RegisterValues)}
            />
            {errors[name as keyof RegisterValues] ? (
              <span className="mt-1 block text-xs font-semibold text-red-600">
                {errors[name as keyof RegisterValues]?.message as string}
              </span>
            ) : null}
          </label>
        ))}
        <div className="space-y-3 sm:col-span-2">
          <label className="flex items-start gap-2 text-sm font-semibold text-pln-muted">
            <input className="mt-1 h-4 w-4" type="checkbox" {...register('acceptTerms')} />
            Menyetujui persyaratan pendaftaran.
          </label>
          <label className="flex items-start gap-2 text-sm font-semibold text-pln-muted">
            <input
              className="mt-1 h-4 w-4"
              type="checkbox"
              {...register('confirmRegistration')}
            />
            Konfirmasi bahwa data pendaftaran sudah benar.
          </label>
        </div>
        <Button className="sm:col-span-2" disabled={isSubmitting} type="submit">
          Kirim registrasi
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-pln-muted">
        Sudah punya akun?{' '}
        <Link className="font-bold text-pln-blue" to="/login">
          Masuk
        </Link>
      </p>
    </Card>
  )
}
