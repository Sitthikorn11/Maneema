import type { ReactNode } from 'react'

type NotebookPageProps = {
  children: ReactNode
  className?: string
}

export function NotebookPage({ children, className = '' }: NotebookPageProps) {
  return (
    <div
      className={`relative mx-auto w-full max-w-4xl rounded-[28px] border-[3px] border-ink bg-white py-10 pr-8 pl-12 shadow-[10px_10px_0_var(--color-ink),0_25px_40px_-12px_rgba(43,33,24,0.35)] sm:pr-12 sm:pl-16 ${className}`}
    >
      <div
        className="absolute top-6 bottom-6 left-4 w-6 sm:left-6"
        style={{
          backgroundImage:
            'radial-gradient(circle, transparent 0 4px, var(--color-ink) 4px 6px, transparent 6px 100%)',
          backgroundSize: '100% 26px',
          backgroundRepeat: 'repeat-y',
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}
