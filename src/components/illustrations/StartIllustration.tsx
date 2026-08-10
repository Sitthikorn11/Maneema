export function StartIllustration() {
  return (
    <svg
      viewBox="0 0 240 200"
      className="mx-auto h-44 w-auto drop-shadow-[0_10px_10px_rgba(43,33,24,0.25)] sm:h-56"
      aria-hidden="true"
    >
      <ellipse cx="120" cy="178" rx="95" ry="14" fill="var(--color-paper-line)" />

      {/* books */}
      <rect x="55" y="128" width="130" height="20" rx="5" fill="var(--color-adjective-light)" stroke="var(--color-ink)" strokeWidth="4" />
      <rect x="68" y="110" width="104" height="20" rx="5" fill="var(--color-noun-light)" stroke="var(--color-ink)" strokeWidth="4" />

      {/* lightbulb mascot */}
      <g strokeLinecap="round">
        <line x1="120" y1="20" x2="120" y2="8" stroke="var(--color-brand)" strokeWidth="4" />
        <line x1="94" y1="32" x2="84" y2="20" stroke="var(--color-brand)" strokeWidth="4" />
        <line x1="146" y1="32" x2="156" y2="20" stroke="var(--color-brand)" strokeWidth="4" />
      </g>
      <circle cx="120" cy="55" r="30" fill="#ffe07a" stroke="var(--color-ink)" strokeWidth="4" />
      <rect x="104" y="85" width="32" height="11" rx="3" fill="#d6d3c4" stroke="var(--color-ink)" strokeWidth="3" />
      <rect x="108" y="95" width="24" height="6" rx="2" fill="var(--color-ink)" />

      {/* mascot face */}
      <circle cx="98" cy="61" r="5" fill="#ffb6b6" opacity="0.7" />
      <circle cx="142" cy="61" r="5" fill="#ffb6b6" opacity="0.7" />
      <circle cx="109" cy="52" r="3.5" fill="var(--color-ink)" />
      <circle cx="131" cy="52" r="3.5" fill="var(--color-ink)" />
      <path d="M106,62 Q120,73 134,62" stroke="var(--color-ink)" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* letter badges */}
      <g transform="rotate(-10 31 113)">
        <rect x="14" y="96" width="34" height="34" rx="8" fill="var(--color-noun)" stroke="var(--color-ink)" strokeWidth="3" />
        <text x="31" y="119" fontSize="20" fontWeight="bold" fill="white" textAnchor="middle">
          A
        </text>
      </g>
      <g transform="rotate(8 209 109)">
        <rect x="192" y="92" width="34" height="34" rx="8" fill="var(--color-verb)" stroke="var(--color-ink)" strokeWidth="3" />
        <text x="209" y="115" fontSize="20" fontWeight="bold" fill="white" textAnchor="middle">
          B
        </text>
      </g>
      <g transform="rotate(-6 213 167)">
        <rect x="196" y="150" width="34" height="34" rx="8" fill="var(--color-adjective)" stroke="var(--color-ink)" strokeWidth="3" />
        <text x="213" y="173" fontSize="20" fontWeight="bold" fill="white" textAnchor="middle">
          C
        </text>
      </g>

      {/* sparkles */}
      <path
        d="M0,-8 C1,-2 2,-1 8,0 C2,1 1,2 0,8 C-1,2 -2,1 -8,0 C-2,-1 -1,-2 0,-8 Z"
        fill="var(--color-adverb)"
        transform="translate(26,34)"
      />
      <path
        d="M0,-6 C0.7,-1.5 1.5,-0.7 6,0 C1.5,0.7 0.7,1.5 0,6 C-0.7,1.5 -1.5,0.7 -6,0 C-1.5,-0.7 -0.7,-1.5 0,-6 Z"
        fill="var(--color-brand)"
        transform="translate(210,38)"
      />
    </svg>
  )
}
