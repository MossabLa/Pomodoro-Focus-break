// Animated wireframe covers for each project, drawn like terminal readouts.
// Purely decorative: the name and description are given as text beside them.
const LIME = '#c8ff2e'
const HOT = '#ff5a1f'
const TEXT = '#e6e4da'

function Grid({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={id} width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0V30" fill="none" stroke={LIME} strokeOpacity=".07" />
        </pattern>
      </defs>
      <rect width="600" height="420" fill="#0e110c" />
      <rect width="600" height="420" fill={`url(#${id})`} />
    </>
  )
}

function FocusArt() {
  return (
    <svg
      className="art-svg"
      viewBox="0 0 600 420"
      preserveAspectRatio="xMidYMid meet"
    >
      <Grid id="focus-grid" />
      <g className="art-drift">
        <circle
          cx="300"
          cy="210"
          r="160"
          fill="none"
          stroke={LIME}
          strokeOpacity=".35"
          strokeWidth="10"
          strokeDasharray="1.2 14"
        />
      </g>
      <circle
        cx="300"
        cy="210"
        r="120"
        fill="none"
        stroke="#262a22"
        strokeWidth="6"
      />
      <circle
        className="art-ring art-glow"
        cx="300"
        cy="210"
        r="120"
        fill="none"
        stroke={LIME}
        strokeWidth="4"
        transform="rotate(-90 300 210)"
      />
      <g className="art-orbit">
        <rect x="294" y="34" width="12" height="12" fill={HOT} />
      </g>
      <text x="300" y="226" textAnchor="middle" className="art-clock">
        25:00
      </text>
      <text x="300" y="256" textAnchor="middle" className="art-caption">
        FOCUS · ONE INTENTION
      </text>
      <text x="28" y="40" className="art-caption">
        PID 01 · still.exe
      </text>
      <text x="572" y="396" textAnchor="end" className="art-caption">
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
      preserveAspectRatio="xMidYMid meet"
    >
      <Grid id="atlas-grid" />
      <path
        d="M30 340 L90 330 L150 336 L210 318 L270 326 L330 300 L390 310 L450 282 L510 296 L570 270"
        fill="none"
        stroke={HOT}
        strokeWidth="1.8"
        className="art-flow"
      />
      <path
        className="art-draw art-glow"
        d={signal}
        fill="none"
        stroke={LIME}
        strokeWidth="3"
      />
      <rect x="315" y="235" width="10" height="10" fill={TEXT} />
      <rect
        className="art-pulse"
        x="314"
        y="234"
        width="12"
        height="12"
        fill="none"
        stroke={LIME}
      />
      <rect x="475" y="155" width="10" height="10" fill={TEXT} />
      <rect
        className="art-pulse art-pulse-late"
        x="474"
        y="154"
        width="12"
        height="12"
        fill="none"
        stroke={LIME}
      />
      <rect
        className="art-scan"
        x="0"
        y="0"
        width="1.5"
        height="420"
        fill={LIME}
        fillOpacity=".5"
      />
      <text x="28" y="40" className="art-caption">
        PID 02 · atlas --sample
      </text>
      <g className="art-caption">
        <rect
          x="420"
          y="24"
          width="152"
          height="28"
          fill="none"
          stroke="#3a3f34"
        />
        <rect x="470" y="24" width="52" height="28" fill={LIME} />
        <text x="445" y="43" textAnchor="middle">
          1H
        </text>
        <text x="496" y="43" textAnchor="middle" fill="#0a0c09">
          24H
        </text>
        <text x="547" y="43" textAnchor="middle">
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
      preserveAspectRatio="xMidYMid meet"
    >
      <Grid id="forma-grid" />
      <g fill="none" stroke="#262a22">
        <rect x="30" y="70" width="168" height="320" />
        <rect x="216" y="70" width="168" height="320" />
        <rect x="402" y="70" width="168" height="320" />
      </g>
      <g className="art-caption">
        <text x="46" y="98">
          TO_DO
        </text>
        <text x="232" y="98">
          DOING
        </text>
        <text x="418" y="98" fill={LIME}>
          DONE
        </text>
      </g>
      <text x="28" y="40" className="art-caption">
        PID 03 · forma --plan
      </text>
      <g fill="none" stroke={TEXT} strokeOpacity=".4">
        <rect x="44" y="176" width="140" height="50" />
        <rect x="44" y="238" width="140" height="50" />
        <rect x="230" y="114" width="140" height="50" />
      </g>
      <g fill="none" stroke={LIME} strokeWidth="1.6" className="art-glow">
        <rect x="416" y="114" width="140" height="50" />
        <rect x="416" y="176" width="140" height="50" />
        <path d="M430 139l5 5 9-9M430 201l5 5 9-9" />
      </g>
      <g fill={LIME} opacity=".6">
        <rect x="456" y="136" width="80" height="5" />
        <rect x="456" y="198" width="64" height="5" />
      </g>
      <g className="art-hop">
        <rect x="44" y="114" width="140" height="50" fill={HOT} />
        <rect
          x="58"
          y="132"
          width="14"
          height="14"
          fill="none"
          stroke="#0a0c09"
          strokeWidth="2"
        />
        <rect x="82" y="137" width="84" height="5" fill="#0a0c09" />
      </g>
      <rect
        className="art-blink"
        x="556"
        y="30"
        width="10"
        height="10"
        fill={LIME}
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
