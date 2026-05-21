import type { ReactNode } from 'react'
import { useAppSelector } from '@/app/hooks'
import { EmptyState } from '@/shared/components/EmptyState'

type PermissionGuardProps = {
  permission: string
  children: ReactNode
}

export const PermissionGuard = ({
  permission,
  children,
}: PermissionGuardProps) => {
  const user = useAppSelector((state) => state.auth.user)

  if (!user?.permissions.includes(permission)) {
    return (
      <EmptyState
        title="Akses dibatasi"
        description="Akun Anda belum memiliki permission untuk membuka halaman ini."
      />
    )
  }

  return <>{children}</>
}
