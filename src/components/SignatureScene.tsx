import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent } from 'react'
import { ArrowUpRight, Play, RotateCcw } from 'lucide-react'
import './SignatureScene.css'

type LayerId = 'interface' | 'logic' | 'data'
const layers: {
  id: LayerId
  number: string
  title: string
  description: string
  detail: string
}[] = [
  {
    id: 'interface',
    number: '01',
    title: 'Interface',
    description: 'The part you feel.',
    detail:
      'Clear feedback. Accessible interactions. Every detail earns its place.',
  },
  {
    id: 'logic',
    number: '02',
    title: 'Logic',
    description: 'The decisions underneath.',
    detail:
      'Small, explicit contracts turn complex problems into dependable behavior.',
  },
  {
    id: 'data',
    number: '03',
    title: 'Data',
    description: 'A foundation you can trust.',
    detail: 'Well-shaped information. Consistent relationships. Room to grow.',
  },
]
const traceLabels = [
  'Interface → request',
  'Logic → validate',
  'Data → resolve',
  'Response → interface',
  'Request complete. Every layer connected.',
]

export default function SignatureScene() {
  const [activeLayer, setActiveLayer] = useState<LayerId>('interface')
  const [traceStep, setTraceStep] = useState<number | null>(null)
  const [isTracing, setIsTracing] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const visualRef = useRef<HTMLDivElement>(null)
  const pointerFrame = useRef<number | null>(null)
  const active = layers.find((layer) => layer.id === activeLayer)!

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => {
      media.removeEventListener('change', update)
      if (pointerFrame.current !== null)
        cancelAnimationFrame(pointerFrame.current)
    }
  }, [])

  useEffect(() => {
    if (!isTracing) return
    if (reduceMotion) {
      setTraceStep(4)
      setActiveLayer('interface')
      setIsTracing(false)
      return
    }
    const stages: LayerId[] = ['interface', 'logic', 'data', 'interface']
    setTraceStep(0)
    setActiveLayer('interface')
    const timers = [1, 2, 3, 4].map((step) =>
      window.setTimeout(() => {
        setTraceStep(step)
        if (step < 4) setActiveLayer(stages[step])
        else setIsTracing(false)
      }, step * 650),
    )
    return () => timers.forEach(window.clearTimeout)
  }, [isTracing, reduceMotion])

  function moveScene(event: PointerEvent<HTMLDivElement>) {
    if (
      reduceMotion ||
      event.pointerType !== 'mouse' ||
      !window.matchMedia('(pointer: fine)').matches
    )
      return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 6
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -6
    if (pointerFrame.current !== null)
      cancelAnimationFrame(pointerFrame.current)
    pointerFrame.current = requestAnimationFrame(() => {
      visualRef.current?.style.setProperty('--scene-rx', `${y}deg`)
      visualRef.current?.style.setProperty('--scene-ry', `${x}deg`)
    })
  }

  function resetScene() {
    if (pointerFrame.current !== null)
      cancelAnimationFrame(pointerFrame.current)
    visualRef.current?.style.setProperty('--scene-rx', '0deg')
    visualRef.current?.style.setProperty('--scene-ry', '0deg')
  }

  function selectLayer(id: LayerId) {
    setIsTracing(false)
    setTraceStep(null)
    setActiveLayer(id)
  }

  return (
    <div
      className="scene"
      aria-label="Interactive software architecture illustration"
    >
      <div className="scene-heading">
        <span>
          <i /> INTERACTIVE SYSTEM
        </span>
        <span>FIG. 01</span>
      </div>
      <div
        className={`scene-visual${isTracing ? ' scene-is-tracing' : ''}`}
        onPointerMove={moveScene}
        onPointerLeave={resetScene}
        ref={visualRef}
      >
        <div
          className="scene-coordinate scene-coordinate-top"
          aria-hidden="true"
        >
          X: 032 / Y: 064
        </div>
        <svg
          className="scene-diagram"
          viewBox="0 0 540 460"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="scene-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M24 0H0V24"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.45"
                opacity=".16"
              />
            </pattern>
            <pattern
              id="scene-dots"
              width="14"
              height="14"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r=".7" fill="currentColor" opacity=".24" />
            </pattern>
          </defs>
          <path
            className="scene-ground"
            d="M40 324 270 195 500 324 270 453Z"
            fill="url(#scene-grid)"
          />
          <path
            d="M110 150V325M270 60V235M430 150V325"
            stroke="currentColor"
            strokeOpacity=".28"
            strokeWidth=".8"
            strokeDasharray="3 6"
          />
          <g
            className={`scene-layer scene-layer-data${activeLayer === 'data' ? ' scene-layer-active' : ''}`}
          >
            <path
              d="m110 302 160 90 160-90v14l-160 90-160-90Z"
              fill="#171c18"
              stroke="#20231f"
              strokeWidth="1"
            />
            <path
              d="m270 212 160 90-160 90-160-90Z"
              fill="#303b33"
              stroke="#20231f"
              strokeWidth="1"
            />
            <path d="m270 212 160 90-160 90-160-90Z" fill="url(#scene-dots)" />
            <g transform="matrix(.83 .467 -.83 .467 270 249)">
              <rect
                x="0"
                y="0"
                width="121"
                height="92"
                rx="4"
                fill="#3a473e"
                stroke="#94a194"
                strokeWidth="1"
              />
              <path
                d="M0 25h121M0 47h121M0 69h121M36 25v67"
                stroke="#94a194"
                strokeWidth=".8"
              />
              <path
                d="M11 13h22M47 13h37M49 36h49M49 58h36M49 80h45"
                stroke="#b8c2b5"
                strokeWidth="2"
              />
              <circle cx="17" cy="36" r="3" fill="#f15a30" />
              <circle cx="17" cy="58" r="3" fill="#b8c2b5" />
              <circle cx="17" cy="80" r="3" fill="#b8c2b5" />
            </g>
            <path
              d="m421 321 36 20h34"
              stroke="currentColor"
              strokeWidth=".7"
            />
            <text x="496" y="345" className="scene-svg-number">
              03
            </text>
          </g>
          <g
            className={`scene-layer scene-layer-logic${activeLayer === 'logic' ? ' scene-layer-active' : ''}`}
          >
            <path
              d="m110 226 160 90 160-90v14l-160 90-160-90Z"
              fill="#d4d3c6"
              stroke="#20231f"
              strokeWidth="1"
            />
            <path
              d="m270 136 160 90-160 90-160-90Z"
              fill="#e4e4d7"
              stroke="#20231f"
              strokeWidth="1"
            />
            <g transform="matrix(.83 .467 -.83 .467 270 167)">
              <rect
                x="0"
                y="0"
                width="132"
                height="115"
                rx="3"
                stroke="#62695c"
                strokeWidth="1"
              />
              <path d="M0 22h132" stroke="#62695c" strokeWidth=".8" />
              <circle cx="10" cy="11" r="2.5" fill="#62695c" />
              <circle cx="19" cy="11" r="2.5" fill="#62695c" opacity=".5" />
              <circle cx="28" cy="11" r="2.5" fill="#62695c" opacity=".3" />
              <path
                d="M16 39h33M25 52h70M25 65h51M25 78h66M16 91h33"
                stroke="#62695c"
                strokeWidth="3"
              />
              <path
                d="M59 39h42M103 52h12M84 65h25"
                stroke="#f15a30"
                strokeWidth="3"
              />
            </g>
            <path
              d="m421 245 36 20h34"
              stroke="currentColor"
              strokeWidth=".7"
            />
            <text x="496" y="269" className="scene-svg-number">
              02
            </text>
          </g>
          <g
            className={`scene-layer scene-layer-interface${activeLayer === 'interface' ? ' scene-layer-active' : ''}`}
          >
            <path
              d="m110 150 160 90 160-90v14l-160 90-160-90Z"
              fill="#ca4625"
              stroke="#20231f"
              strokeWidth="1"
            />
            <path
              d="m270 60 160 90-160 90-160-90Z"
              fill="#f15a30"
              stroke="#20231f"
              strokeWidth="1"
            />
            <g transform="matrix(.83 .467 -.83 .467 270 89)">
              <rect
                width="140"
                height="118"
                rx="4"
                fill="#f5b493"
                stroke="#46291f"
                strokeWidth="1"
              />
              <path d="M0 22h140" stroke="#46291f" strokeWidth="1" />
              <circle cx="11" cy="11" r="2.5" fill="#46291f" />
              <circle cx="21" cy="11" r="2.5" fill="#46291f" opacity=".55" />
              <circle cx="31" cy="11" r="2.5" fill="#46291f" opacity=".3" />
              <rect
                x="11"
                y="34"
                width="48"
                height="71"
                rx="2"
                fill="#f16b43"
              />
              <path d="M69 40h53M69 48h39" stroke="#46291f" strokeWidth="4" />
              <path
                d="M69 63h53M69 69h47M69 75h50"
                stroke="#88543e"
                strokeWidth="2"
              />
              <rect
                x="69"
                y="88"
                width="36"
                height="15"
                rx="2"
                fill="#46291f"
              />
              <path
                d="m24 62 9 9-9 9m22-18-9 18"
                stroke="#46291f"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
            <path
              d="m421 169 36 20h34"
              stroke="currentColor"
              strokeWidth=".7"
            />
            <text x="496" y="193" className="scene-svg-number">
              01
            </text>
          </g>
          <path
            d="M80 176v147"
            stroke="#20231f"
            strokeWidth=".8"
            strokeDasharray="2 5"
            opacity=".45"
          />
          {[0, 1, 2].map((step) => (
            <circle
              key={step}
              cx="80"
              cy={176 + step * 76}
              r="3"
              fill={layers[step].id === activeLayer ? '#f15a30' : '#f3f1e9'}
              stroke={layers[step].id === activeLayer ? '#f15a30' : '#899083'}
              strokeWidth="1"
            />
          ))}
          {isTracing && (
            <circle
              className="scene-packet"
              cx="80"
              cy="176"
              r="5"
              fill="#f15a30"
              style={
                {
                  '--packet-y': `${traceStep === 1 ? 76 : traceStep === 2 ? 152 : 0}px`,
                } as CSSProperties
              }
            />
          )}
          <path
            d="M45 47h13M51.5 40.5v13M480 395h13M486.5 388.5v13"
            stroke="#8c9186"
            strokeWidth=".8"
          />
          <text x="40" y="427" className="scene-svg-micro">
            FORM FOLLOWS FUNCTION.
          </text>
        </svg>
        <span className="scene-visual-note" aria-hidden="true">
          THREE LAYERS. ONE EXPERIENCE.
        </span>
      </div>
      <div
        className="scene-controls"
        role="group"
        aria-label="Explore architecture layers"
      >
        {layers.map((layer) => (
          <button
            type="button"
            key={layer.id}
            onClick={() => selectLayer(layer.id)}
            className={`scene-layer-button${activeLayer === layer.id ? ' scene-selected' : ''}`}
            aria-pressed={activeLayer === layer.id}
          >
            <span>{layer.number}</span>
            {layer.title}
          </button>
        ))}
      </div>
      <div className="scene-detail">
        <div>
          <p className="scene-detail-title">{active.description}</p>
          <p className="scene-detail-copy">{active.detail}</p>
        </div>
        <ArrowUpRight size={19} strokeWidth={1.3} aria-hidden="true" />
      </div>
      <div className="scene-trace-row">
        <button
          className="scene-trace-button"
          type="button"
          disabled={isTracing}
          onClick={() => setIsTracing(true)}
        >
          {traceStep === 4 ? (
            <RotateCcw size={12} aria-hidden="true" />
          ) : (
            <Play size={11} fill="currentColor" aria-hidden="true" />
          )}
          {isTracing
            ? 'Tracing request'
            : traceStep === 4
              ? 'Trace again'
              : 'Trace a request'}
        </button>
        <span className="scene-trace-status" role="status" aria-live="polite">
          {traceStep === null ? 'CONCEPTUAL MODEL' : traceLabels[traceStep]}
        </span>
      </div>
    </div>
  )
}
