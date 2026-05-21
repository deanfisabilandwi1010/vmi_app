import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { z } from 'zod'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'

const forgotSchema = z.object({
  email: z.string().email('Format email tidak valid'),
})

type ForgotValues = z.infer<typeof forgotSchema>

export const ForgotPasswordPage = () => {
  const { handleSubmit, register } = useForm<ForgotValues>({
    resolver: zodResolver(forgotSchema),
  })

  const handleForgot = handleSubmit(async (values) => {
    await Swal.fire({
      icon: 'info',
      title: 'Instruksi terkirim',
      text: `Link reset password dikirim ke ${values.email}.`,
    })
  })

  return (
    <Card className="mx-auto w-full max-w-lg p-6 md:p-8">
      <h2 className="text-2xl font-black text-pln-ink">Lupa password</h2>
      <p className="mt-2 text-sm text-pln-muted">
        Masukkan email yang terdaftar untuk menerima link reset password.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleForgot}>
        <input
          className="focus-ring h-11 w-full rounded-lg border border-pln-line px-3 outline-none"
          placeholder="example@gmail.com"
          type="email"
          {...register('email')}
        />
        <Button className="w-full" type="submit">
          Kirim link reset
        </Button>
      </form>
      <Link className="mt-5 block text-center text-sm font-bold text-pln-blue" to="/login">
        Kembali ke login
      </Link>
    </Card>
  )
}
