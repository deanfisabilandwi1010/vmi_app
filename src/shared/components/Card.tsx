import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

type CardProps = {
  children: ReactNode
  className?: string
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <section
      className={cn(
        'rounded-lg border border-pln-line bg-white shadow-sm',
        className,
      )}
    >
      {children}
    </section>
  )
}
