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
// Vertical centre of each plate in the SVG, used to move the trace packet.
const plateY: Record<LayerId, number> = {
  interface: 140,
  logic: 300,
  data: 460,
}
// Maps an isometric plate's flat 230×230 drawing space onto its top face.
const iso = (top: number) => `matrix(0.8696 0.5 -0.8696 0.5 300 ${top})`

function Plate({
  id,
  cy,
  active,
  children,
}: {
  id: LayerId
  cy: number
  active: boolean
  children: React.ReactNode
}) {
  const layer = layers.find((item) => item.id === id)!
  return (
    <g className={`stack-plate stack-plate-${id}${active ? ' is-active' : ''}`}>
      <g className="stack-plate-body">
        <polygon
          className="plate-side-left"
          points={`100,${cy} 300,${cy + 115} 300,${cy + 129} 100,${cy + 14}`}
        />
        <polygon
          className="plate-side-right"
          points={`300,${cy + 115} 500,${cy} 500,${cy + 14} 300,${cy + 129}`}
        />
        <polygon
          className="plate-face"
          points={`300,${cy - 115} 500,${cy} 300,${cy + 115} 100,${cy}`}
        />
        <g transform={iso(cy - 115)}>{children}</g>
      </g>
      <line className="plate-leader" x1="508" y1={cy} x2="552" y2={cy} />
      <circle className="plate-leader-dot" cx="556" cy={cy} r="3.5" />
      <text className="plate-number" x="568" y={cy - 6}>
        {layer.number}
      </text>
      <text className="plate-label" x="568" y={cy + 11}>
        {layer.title.toUpperCase()}
      </text>
    </g>
  )
}

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
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8
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

  const packetY = plateY[activeLayer] - plateY.interface

  return (
    <div
      className="scene"
      role="group"
      aria-label="Interactive software architecture illustration"
    >
      <div className="scene-heading">
        <span>
          <i /> INTERACTIVE SYSTEM
        </span>
        <span>FIG. 01 // STACK.SCAN</span>
      </div>
      <div
        className={`scene-visual${isTracing ? ' scene-is-tracing' : ''}`}
        onPointerMove={moveScene}
        onPointerLeave={resetScene}
        ref={visualRef}
      >
        <svg
          className="scene-diagram"
          viewBox="0 0 680 620"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="scene-cells"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="5"
                y="5"
                width="22"
                height="22"
                fill="none"
                stroke="#ff5a1f"
                strokeOpacity=".55"
                strokeWidth="1.1"
              />
            </pattern>
            <radialGradient id="scene-sweep" cx="0" cy="1" r="1">
              <stop offset="0" stopColor="#c8ff2e" stopOpacity="0" />
              <stop offset="1" stopColor="#c8ff2e" stopOpacity=".2" />
            </radialGradient>
            <filter
              id="scene-glow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* radar backdrop */}
          <g className="scene-radar">
            <circle cx="300" cy="310" r="290" />
            <circle cx="300" cy="310" r="210" />
            <circle cx="300" cy="310" r="130" strokeDasharray="2 6" />
            <path d="M10 310H590M300 20V600" />
          </g>
          <g className="scene-sweep">
            <path
              d="M300 310 L300 20 A290 290 0 0 1 505 105 Z"
              fill="url(#scene-sweep)"
            />
          </g>
          <path
            className="scene-crosshair"
            d="M8 8h24M8 8v24M672 8h-24M672 8v24M8 612h24M8 612v-24M672 612h-24M672 612v-24"
          />

          <line className="scene-beam" x1="100" y1="154" x2="100" y2="460" />
          <line className="scene-beam" x1="500" y1="154" x2="500" y2="460" />
          <circle
            className="scene-ambient scene-ambient-down"
            cx="500"
            cy="154"
            r="5"
          />
          <circle
            className="scene-ambient scene-ambient-up"
            cx="100"
            cy="460"
            r="5"
          />

          <Plate id="data" cy={460} active={activeLayer === 'data'}>
            <rect
              x="15"
              y="15"
              width="200"
              height="200"
              fill="url(#scene-cells)"
            />
            <rect
              className="cell cell-a blink-1"
              x="52"
              y="52"
              width="22"
              height="22"
              rx="3"
            />
            <rect
              className="cell cell-b blink-2"
              x="116"
              y="84"
              width="22"
              height="22"
              rx="3"
            />
            <rect
              className="cell cell-a blink-3"
              x="148"
              y="148"
              width="22"
              height="22"
              rx="3"
            />
            <rect
              className="cell cell-b blink-1"
              x="84"
              y="180"
              width="22"
              height="22"
              rx="3"
            />
          </Plate>

          <Plate id="logic" cy={300} active={activeLayer === 'logic'}>
            <path
              className="logic-links"
              d="M50 60 115 115M170 50 115 115M55 180 115 115M180 175 115 115M50 60 170 50M55 180 180 175"
            />
            <circle className="logic-core" cx="115" cy="115" r="20" />
            <circle className="logic-pulse" cx="115" cy="115" r="20" />
            <circle className="logic-node" cx="50" cy="60" r="11" />
            <circle className="logic-node" cx="170" cy="50" r="11" />
            <circle className="logic-node" cx="55" cy="180" r="11" />
            <circle className="logic-node is-filled" cx="180" cy="175" r="11" />
          </Plate>

          <Plate id="interface" cy={140} active={activeLayer === 'interface'}>
            <rect
              className="ui-line"
              x="20"
              y="20"
              width="190"
              height="190"
              rx="12"
            />
            <line className="ui-line" x1="20" y1="46" x2="210" y2="46" />
            <circle className="ui-accent" cx="34" cy="33" r="3.5" />
            <circle className="ui-ink" cx="46" cy="33" r="3.5" />
            <circle className="ui-ink" cx="58" cy="33" r="3.5" opacity=".4" />
            <circle className="ui-accent ui-avatar" cx="66" cy="96" r="24" />
            <rect
              className="ui-ink"
              x="104"
              y="80"
              width="84"
              height="9"
              rx="4.5"
            />
            <rect
              className="ui-ink"
              x="104"
              y="97"
              width="62"
              height="7"
              rx="3.5"
              opacity=".35"
            />
            <rect
              className="ui-ink"
              x="104"
              y="110"
              width="72"
              height="7"
              rx="3.5"
              opacity=".35"
            />
            <rect
              className="ui-line"
              x="36"
              y="144"
              width="74"
              height="48"
              rx="7"
            />
            <rect
              className="ui-ink"
              x="120"
              y="144"
              width="74"
              height="48"
              rx="7"
            />
          </Plate>

          {isTracing && (
            <circle
              className="scene-packet"
              cx="500"
              cy={plateY.interface}
              r="7"
              style={{ '--packet-y': `${packetY}px` } as CSSProperties}
            />
          )}
          <text className="scene-svg-micro" x="24" y="604">
            FORM FOLLOWS FUNCTION.
          </text>
        </svg>
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
        <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
      </div>
      <div className="scene-trace-row">
        <button
          className="scene-trace-button"
          type="button"
          disabled={isTracing}
          onClick={() => setIsTracing(true)}
        >
          {traceStep === 4 ? (
            <RotateCcw size={14} aria-hidden="true" />
          ) : (
            <Play size={13} fill="currentColor" aria-hidden="true" />
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
