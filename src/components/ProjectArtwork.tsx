// Animated vector covers for each project. Purely decorative: the project's
// name and description are provided as text next to the artwork.
function FocusArt() {
  return (
    <svg
      className="art-svg"
      viewBox="0 0 600 420"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="600" height="420" fill="#e7e3d6" />
      <g className="art-focus-drift">
        <circle
          cx="300"
          cy="210"
          r="168"
          fill="none"
          stroke="#1c1f1b"
          strokeOpacity=".07"
          strokeWidth="56"
        />
        <circle
          cx="300"
          cy="210"
          r="150"
          fill="none"
          stroke="#1c1f1b"
          strokeOpacity=".4"
          strokeWidth="10"
          strokeDasharray="1.2 14.5"
        />
      </g>
      <circle
        cx="300"
        cy="210"
        r="120"
        fill="none"
        stroke="#d3cebf"
        strokeWidth="14"
      />
      <circle
        className="art-ring"
        cx="300"
        cy="210"
        r="120"
        fill="none"
        stroke="#e8532a"
        strokeWidth="14"
        strokeLinecap="round"
        transform="rotate(-90 300 210)"
      />
      <circle className="art-breathe" cx="300" cy="210" r="92" fill="#f3f1e9" />
      <g className="art-orbit">
        <circle cx="300" cy="28" r="7" fill="#1c1f1b" />
      </g>
      <text x="300" y="224" textAnchor="middle" className="art-clock">
        25:00
      </text>
      <text x="300" y="252" textAnchor="middle" className="art-caption">
        FOCUS · ONE INTENTION
      </text>
      <text x="32" y="44" className="art-caption art-caption-strong">
        /01 STILL.
      </text>
      <text x="568" y="396" textAnchor="end" className="art-caption">
        LESS NOISE. MORE INTENTION.
      </text>
    </svg>
  )
}

function AtlasArt() {
  const signal =
    'M30 300 C 90 280, 120 200, 180 220 S 260 320, 320 240 S 420 120, 480 160 S 560 230, 580 190'
  return (
    <svg
      className="art-svg"
      viewBox="0 0 600 420"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="atlas-grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M40 0H0V40"
            fill="none"
            stroke="#f3f1e9"
            strokeOpacity=".07"
          />
        </pattern>
        <linearGradient id="atlas-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8532a" stopOpacity=".35" />
          <stop offset="1" stopColor="#e8532a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="600" height="420" fill="#1c1f1b" />
      <rect width="600" height="420" fill="url(#atlas-grid)" />
      <g fill="none" stroke="#f3f1e9" className="art-contours">
        <path
          d="M-10 120 C 80 80, 160 160, 260 110 S 420 60, 610 130"
          strokeOpacity=".12"
        />
        <path
          d="M-10 160 C 90 120, 170 200, 270 150 S 430 100, 610 170"
          strokeOpacity=".1"
        />
        <path
          d="M-10 350 C 100 320, 200 380, 300 340 S 480 300, 610 350"
          strokeOpacity=".1"
        />
      </g>
      <path d={`${signal} L580 380 L30 380 Z`} fill="url(#atlas-fade)" />
      <path
        className="art-draw"
        d={signal}
        fill="none"
        stroke="#e8532a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="320" cy="240" r="5" fill="#f3f1e9" />
      <circle
        className="art-pulse"
        cx="320"
        cy="240"
        r="6"
        fill="none"
        stroke="#f3f1e9"
        strokeWidth="1.5"
      />
      <circle cx="480" cy="160" r="5" fill="#f3f1e9" />
      <circle
        className="art-pulse art-pulse-late"
        cx="480"
        cy="160"
        r="6"
        fill="none"
        stroke="#f3f1e9"
        strokeWidth="1.5"
      />
      <rect
        className="art-scan"
        x="0"
        y="0"
        width="1.5"
        height="420"
        fill="#f3f1e9"
        fillOpacity=".45"
      />
      <text x="32" y="44" className="art-caption art-caption-light">
        /02 ATLAS · SAMPLE DATA
      </text>
      <rect
        x="420"
        y="26"
        width="148"
        height="30"
        rx="15"
        fill="none"
        stroke="#f3f1e9"
        strokeOpacity=".3"
      />
      <rect x="468" y="29" width="52" height="24" rx="12" fill="#f3f1e9" />
      <g className="art-caption" textAnchor="middle">
        <text x="444" y="46" fill="#f3f1e9">
          1H
        </text>
        <text x="494" y="46" fill="#1c1f1b">
          24H
        </text>
        <text x="544" y="46" fill="#f3f1e9">
          7D
        </text>
      </g>
    </svg>
  )
}

function FormaArt() {
  return (
    <svg
      className="art-svg"
      viewBox="0 0 600 420"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="600" height="420" fill="#e8532a" />
      <g fill="#fbfaf4" fillOpacity=".16">
        <rect x="30" y="70" width="168" height="320" rx="16" />
        <rect x="216" y="70" width="168" height="320" rx="16" />
        <rect x="402" y="70" width="168" height="320" rx="16" />
      </g>
      <g className="art-caption" fill="#fbfaf4">
        <text x="46" y="98">
          TO DO
        </text>
        <text x="232" y="98">
          DOING
        </text>
        <text x="418" y="98">
          DONE
        </text>
      </g>
      <text x="32" y="44" className="art-caption art-caption-light">
        /03 FORMA
      </text>
      <g fill="#fbfaf4">
        <rect x="44" y="176" width="140" height="50" rx="10" opacity=".55" />
        <rect x="44" y="238" width="140" height="50" rx="10" opacity=".55" />
        <rect x="230" y="114" width="140" height="50" rx="10" opacity=".55" />
        <rect x="230" y="300" width="140" height="50" rx="10" opacity=".3" />
        <rect x="416" y="114" width="140" height="50" rx="10" />
        <rect x="416" y="176" width="140" height="50" rx="10" />
      </g>
      <g
        stroke="#1c1f1b"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="436" cy="139" r="9" />
        <path d="M431.5 139l3 3 6-6" />
        <circle cx="436" cy="201" r="9" />
        <path d="M431.5 201l3 3 6-6" />
      </g>
      <g fill="#1c1f1b" opacity=".75">
        <rect x="454" y="134" width="80" height="6" rx="3" />
        <rect x="454" y="196" width="64" height="6" rx="3" />
      </g>
      <g className="art-hop">
        <rect x="44" y="114" width="140" height="50" rx="10" fill="#1c1f1b" />
        <circle
          cx="64"
          cy="139"
          r="9"
          fill="none"
          stroke="#fbfaf4"
          strokeWidth="2"
        />
        <rect x="82" y="134" width="84" height="6" rx="3" fill="#fbfaf4" />
      </g>
      <path
        className="art-spark"
        d="M560 22c.6 4.8 4.2 8.4 9 9-4.8.6-8.4 4.2-9 9-.6-4.8-4.2-8.4-9-9 4.8-.6 8.4-4.2 9-9z"
        fill="#fbfaf4"
      />
    </svg>
  )
}

export default function ProjectArtwork({
  kind,
}: {
  kind: 'focus' | 'atlas' | 'forma'
}) {
  return (
    <span className={`artwork artwork-${kind}`} aria-hidden="true">
      {kind === 'focus' ? (
        <FocusArt />
      ) : kind === 'atlas' ? (
        <AtlasArt />
      ) : (
        <FormaArt />
      )}
    </span>
  )
}
