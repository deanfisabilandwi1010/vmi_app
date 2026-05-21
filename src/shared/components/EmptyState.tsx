import { ShieldAlert } from 'lucide-react'
import { Card } from '@/shared/components/Card'

type EmptyStateProps = {
  title: string
  description: string
}

export const EmptyState = ({ description, title }: EmptyStateProps) => {
  return (
    <Card className="flex min-h-80 flex-col items-center justify-center p-10 text-center">
      <ShieldAlert className="mb-4 h-10 w-10 text-pln-sky" />
      <h2 className="text-xl font-black text-pln-ink">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-pln-muted">
        {description}
      </p>
    </Card>
  )
}
