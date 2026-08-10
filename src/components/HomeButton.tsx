type HomeButtonProps = {
  onClick: () => void
  className?: string
}

export function HomeButton({ onClick, className = '' }: HomeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer text-sm font-semibold text-ink/70 underline-offset-2 hover:text-ink hover:underline ${className}`}
    >
      ← Home
    </button>
  )
}
