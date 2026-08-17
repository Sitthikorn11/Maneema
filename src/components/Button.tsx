import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'sm'
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  secondary: 'bg-white text-ink hover:bg-paper',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  md: 'px-8 py-3 text-lg',
  sm: 'px-4 py-2 text-sm',
}

export function Button({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-2xl border-[3px] border-ink font-bold shadow-[3px_3px_0_var(--color-ink),0_10px_16px_-6px_rgba(43,33,24,0.35)] transition hover:scale-105 hover:shadow-[3px_3px_0_var(--color-ink),0_14px_20px_-6px_rgba(43,33,24,0.4)] active:translate-x-[1px] active:translate-y-[1px] active:scale-100 active:shadow-[1px_1px_0_var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-[3px_3px_0_var(--color-ink)] disabled:hover:scale-100 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
