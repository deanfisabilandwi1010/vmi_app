import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, LockKeyhole, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { z } from 'zod'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { login } from '@/features/auth/authSlice'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'

const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  remember: z.boolean(),
})

type LoginValues = z.infer<typeof loginSchema>

export const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const rememberedEmail = useAppSelector((state) => state.auth.rememberedEmail)
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: rememberedEmail ?? 'admin@plnnusadaya.co.id',
      password: 'password123',
      remember: true,
    },
  })

  const handleLogin = handleSubmit(async (values) => {
    dispatch(login({ email: values.email, remember: values.remember }))
    await Swal.fire({
      icon: 'success',
      title: 'Login berhasil',
      text: 'Anda masuk sebagai Admin Logistik PLN Nusa Daya.',
      timer: 1200,
      showConfirmButton: false,
    })
    navigate('/dashboard')
  })

  return (
    <Card className="mx-auto w-full max-w-xl p-6 md:p-8">
      <h2 className="text-2xl font-black text-pln-ink">Masuk ke VMI</h2>
      <p className="mt-2 text-sm leading-6 text-pln-muted">
        Gunakan akun internal, atau lanjutkan dengan SSO untuk Google,
        Facebook, dan Instagram.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleLogin}>
        <label className="block">
          <span className="text-sm font-bold text-pln-ink">Email</span>
          <span className="mt-2 flex items-center gap-2 rounded-lg border border-pln-line bg-white px-3">
            <Mail className="h-4 w-4 text-pln-muted" />
            <input
              className="h-11 w-full outline-none"
              placeholder="example@gmail.com"
              type="email"
              {...register('email')}
            />
          </span>
          {errors.email ? (
            <span className="mt-1 block text-xs font-semibold text-red-600">
              {errors.email.message}
            </span>
          ) : null}
        </label>
        <label className="block">
          <span className="text-sm font-bold text-pln-ink">Password</span>
          <span className="mt-2 flex items-center gap-2 rounded-lg border border-pln-line bg-white px-3">
            <LockKeyhole className="h-4 w-4 text-pln-muted" />
            <input
              className="h-11 w-full outline-none"
              placeholder="Minimal 8 karakter"
              type="password"
              {...register('password')}
            />
            <Eye className="h-4 w-4 text-pln-muted" />
          </span>
          {errors.password ? (
            <span className="mt-1 block text-xs font-semibold text-red-600">
              {errors.password.message}
            </span>
          ) : null}
        </label>
        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 font-semibold text-pln-muted">
            <input className="h-4 w-4" type="checkbox" {...register('remember')} />
            Remember me
          </label>
          <Link className="font-bold text-pln-blue" to="/forgot-password">
            Lupa password?
          </Link>
        </div>
        <Button className="w-full" disabled={isSubmitting} type="submit">
          Masuk
        </Button>
      </form>
      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        {['Google', 'Facebook', 'Instagram'].map((provider) => (
          <Link
            className="focus-ring rounded-lg border border-pln-line px-3 py-2 text-center text-sm font-bold text-pln-ink hover:border-pln-sky"
            key={provider}
            to={`/sso?provider=${provider.toLowerCase()}`}
          >
            {provider}
          </Link>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-pln-muted">
        Belum punya akun?{' '}
        <Link className="font-bold text-pln-blue" to="/register">
          Daftar manual
        </Link>
      </p>
    </Card>
  )
}
