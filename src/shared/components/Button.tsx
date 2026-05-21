import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode
  variant?: ButtonVariant
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-pln-blue text-white shadow-sm hover:bg-[#082b63] disabled:bg-slate-300',
  secondary:
    'border border-pln-line bg-white text-pln-ink hover:border-pln-sky hover:text-pln-blue',
  ghost: 'text-pln-muted hover:bg-slate-100 hover:text-pln-ink',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

export const Button = ({
  children,
  className,
  icon,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition',
        variants[variant],
        className,
      )}
      type={type}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  )
}
