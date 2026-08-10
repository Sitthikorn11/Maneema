const sparklePath =
  'M0,-10 C1.2,-2.5 2.5,-1.2 10,0 C2.5,1.2 1.2,2.5 0,10 C-1.2,2.5 -2.5,1.2 -10,0 C-2.5,-1.2 -1.2,-2.5 0,-10 Z'

type ShapeProps = { color: string; size: number }

function Sparkle({ color, size }: ShapeProps) {
  return (
    <svg viewBox="-10 -10 20 20" style={{ height: size, width: size }} className="drop-shadow-[0_4px_4px_rgba(43,33,24,0.15)]">
      <path d={sparklePath} fill={color} />
    </svg>
  )
}

function DotCluster({ color, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 40 40" style={{ height: size, width: size }} className="drop-shadow-[0_4px_4px_rgba(43,33,24,0.15)]">
      <circle cx="8" cy="30" r="4" fill={color} />
      <circle cx="20" cy="18" r="5" fill={color} />
      <circle cx="33" cy="8" r="3" fill={color} />
    </svg>
  )
}

function TiltedSquare({ color, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 32 32" style={{ height: size, width: size }} className="drop-shadow-[0_4px_4px_rgba(43,33,24,0.15)]">
      <rect x="4" y="4" width="24" height="24" rx="6" fill={color} stroke="var(--color-ink)" strokeWidth="2.5" />
    </svg>
  )
}

type Piece = {
  shape: 'sparkle' | 'dots' | 'square'
  color: string
  size: number
  top?: string
  bottom?: string
  left?: string
  right?: string
  rotate: number
  opacity?: number
}

const pieces: Piece[] = [
  // left-side cluster, bunched toward the upper third, uneven spacing
  { shape: 'sparkle', color: 'var(--color-adverb)', size: 72, top: '22px', left: '26px', rotate: -18 },
  { shape: 'square', color: 'var(--color-verb-light)', size: 42, top: '98px', left: '92px', rotate: 30 },
  { shape: 'dots', color: 'var(--color-noun)', size: 62, top: '54px', left: '6px', rotate: 8, opacity: 0.9 },
  { shape: 'sparkle', color: 'var(--color-brand)', size: 50, top: '64%', left: '44px', rotate: 42, opacity: 0.85 },
  // right-side cluster — different shape order/count so it doesn't mirror the left
  { shape: 'dots', color: 'var(--color-adjective)', size: 76, top: '96px', right: '18px', rotate: -10 },
  { shape: 'square', color: 'var(--color-adverb-light)', size: 54, top: '36%', right: '62px', rotate: -25 },
  { shape: 'sparkle', color: 'var(--color-verb)', size: 66, top: '58%', right: '14px', rotate: 15, opacity: 0.9 },
  { shape: 'square', color: 'var(--color-noun-light)', size: 38, bottom: '40px', right: '74px', rotate: 12 },
]

function Piece({ piece }: { piece: Piece }) {
  const Shape = piece.shape === 'sparkle' ? Sparkle : piece.shape === 'dots' ? DotCluster : TiltedSquare
  return (
    <div
      className="absolute"
      style={{
        top: piece.top,
        bottom: piece.bottom,
        left: piece.left,
        right: piece.right,
        transform: `rotate(${piece.rotate}deg)`,
        opacity: piece.opacity ?? 1,
      }}
    >
      <Shape color={piece.color} size={piece.size} />
    </div>
  )
}

export function BackgroundDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 hidden xl:block">
      {pieces.map((piece, i) => (
        <Piece key={i} piece={piece} />
      ))}
    </div>
  )
}
