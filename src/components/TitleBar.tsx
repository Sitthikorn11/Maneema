import type { ReactNode } from 'react'

type TitleBarProps = {
  children: ReactNode
  className?: string
}

export function TitleBar({ children, className = '' }: TitleBarProps) {
  return (
    <div
      className={`rounded-2xl border-[3px] border-ink bg-brand px-6 py-5 text-center text-white shadow-[4px_4px_0_var(--color-ink),0_12px_20px_-8px_rgba(43,33,24,0.4)] ${className}`}
    >
      {children}
    </div>
  )
}
