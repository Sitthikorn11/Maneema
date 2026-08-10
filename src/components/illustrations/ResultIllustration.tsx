import winnersSvg from '../../assets/illustrations/winners.svg?raw'

export function ResultIllustration() {
  return (
    <div
      className="mx-auto h-40 w-auto text-brand drop-shadow-[0_10px_10px_rgba(43,33,24,0.25)] sm:h-52 [&>svg]:h-full [&>svg]:w-auto"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: winnersSvg }}
    />
  )
}
