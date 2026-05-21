import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '@/app/hooks'
import { login } from '@/features/auth/authSlice'
import { Card } from '@/shared/components/Card'

export const SsoPage = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const provider = params.get('provider') ?? 'google'

  useEffect(() => {
    const timer = window.setTimeout(() => {
      dispatch(login({ email: `sso.${provider}@plnnusadaya.co.id`, remember: true }))
      navigate('/dashboard')
    }, 900)

    return () => window.clearTimeout(timer)
  }, [dispatch, navigate, provider])

  return (
    <Card className="mx-auto w-full max-w-lg p-8 text-center">
      <h2 className="text-2xl font-black capitalize text-pln-ink">
        Menghubungkan {provider}
      </h2>
      <p className="mt-3 text-sm leading-6 text-pln-muted">
        Simulasi integrasi Single Sign On. Endpoint OAuth sebenarnya tinggal
        diarahkan melalui API backend.
      </p>
    </Card>
  )
}
