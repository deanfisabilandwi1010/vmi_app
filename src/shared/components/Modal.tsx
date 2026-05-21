import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { cn } from '@/shared/lib/cn'

type ModalProps = {
  children: ReactNode
  description?: string
  isOpen: boolean
  maxWidth?: 'lg' | 'xl' | '2xl' | '4xl' | '6xl'
  onClose: () => void
  title: string
}

const widths = {
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '6xl': 'max-w-6xl',
}

export const Modal = ({
  children,
  description,
  isOpen,
  maxWidth = '4xl',
  onClose,
  title,
}: ModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeydown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
      role="dialog"
    >
      <button
        aria-label="Tutup modal"
        className="absolute inset-0 h-full w-full cursor-default"
        onClick={onClose}
        type="button"
      />
      <section
        className={cn(
          'relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-xl border border-pln-line bg-white shadow-soft',
          widths[maxWidth],
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-pln-line px-5 py-4">
          <div>
            <h2 className="text-xl font-black text-pln-ink">{title}</h2>
            {description ? (
              <p className="mt-1 text-sm leading-6 text-pln-muted">
                {description}
              </p>
            ) : null}
          </div>
          <button
            aria-label="Tutup"
            className="focus-ring rounded-lg border border-pln-line p-2 text-pln-muted hover:text-pln-ink"
            onClick={onClose}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </header>
        <div className="scrollbar-thin overflow-y-auto p-5">{children}</div>
      </section>
    </div>
  )
}
