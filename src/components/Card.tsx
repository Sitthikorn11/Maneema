import type { ReactNode } from 'react'

export type CardColor = 'neutral' | 'noun' | 'verb' | 'adjective' | 'adverb'

type CardProps = {
  children: ReactNode
  color?: CardColor
  selected?: boolean
  interactive?: boolean
  className?: string
}

const colorClasses: Record<CardColor, string> = {
  neutral: 'bg-white',
  noun: 'bg-noun-light',
  verb: 'bg-verb-light',
  adjective: 'bg-adjective-light',
  adverb: 'bg-adverb-light',
}

export function Card({ children, color = 'neutral', selected = false, interactive = true, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-2xl border-[3px] border-ink p-4 shadow-[3px_3px_0_var(--color-ink),0_8px_14px_-6px_rgba(43,33,24,0.3)] transition ${
        interactive ? 'hover:-translate-y-1 hover:shadow-[3px_5px_0_var(--color-ink),0_12px_18px_-6px_rgba(43,33,24,0.35)]' : ''
      } ${colorClasses[color]} ${selected ? 'ring-4 ring-brand ring-offset-2' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
