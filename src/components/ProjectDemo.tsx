import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowUpRight,
  Asterisk,
  Check,
  ChevronRight,
  Layers3,
  Pause,
  Pencil,
  Play,
  Plus,
  RotateCcw,
  Trash2,
  Volume2,
  VolumeX,
} from 'lucide-react'
import './ProjectDemo.css'

type DemoKind = 'focus' | 'atlas' | 'forma'

function FocusDemo() {
  const [mode, setMode] = useState<'focus' | 'break'>('focus')
  const [remaining, setRemaining] = useState(25 * 60_000)
  const [running, setRunning] = useState(false)
  const [sound, setSound] = useState(false)
  const [notice, setNotice] = useState('A little space for deep work.')
  const deadline = useRef(0)
  const audio = useRef<AudioContext | null>(null)
  const duration = (mode === 'focus' ? 25 : 5) * 60_000

  useEffect(() => {
    if (!running) return
    const update = () => {
      const next = Math.max(0, deadline.current - Date.now())
      setRemaining(next)
      if (next === 0) {
        setRunning(false)
        setNotice(
          mode === 'focus'
            ? 'Session complete. Make a little room to rest.'
            : 'Break complete. Ready for a fresh start?',
        )
        if (sound && audio.current?.state === 'running') {
          const context = audio.current
          const oscillator = context.createOscillator()
          const gain = context.createGain()
          oscillator.connect(gain)
          gain.connect(context.destination)
          oscillator.frequency.value = 660
          gain.gain.setValueAtTime(0.12, context.currentTime)
          gain.gain.exponentialRampToValueAtTime(
            0.001,
            context.currentTime + 0.7,
          )
          oscillator.start()
          oscillator.stop(context.currentTime + 0.7)
        }
      }
    }
    update()
    const interval = window.setInterval(update, 200)
    return () => window.clearInterval(interval)
  }, [running, mode, sound])

  useEffect(
    () => () => {
      void audio.current?.close()
    },
    [],
  )

  function changeMode(next: 'focus' | 'break') {
    setRunning(false)
    setMode(next)
    setRemaining((next === 'focus' ? 25 : 5) * 60_000)
    setNotice(
      next === 'focus'
        ? 'A little space for deep work.'
        : 'Step back. Come back clearer.',
    )
  }

  function toggleTimer() {
    if (running) {
      setRemaining(Math.max(0, deadline.current - Date.now()))
      setRunning(false)
      setNotice('Paused. Pick up where you left off.')
    } else {
      const next = remaining > 0 ? remaining : duration
      setRemaining(next)
      deadline.current = Date.now() + next
      setRunning(true)
      setNotice(
        mode === 'focus'
          ? 'One thing at a time.'
          : 'There is nothing to do right now.',
      )
    }
  }

  async function toggleSound() {
    if (sound) {
      setSound(false)
      return
    }
    try {
      audio.current ??= new AudioContext()
      await audio.current.resume()
      setSound(true)
    } catch {
      setNotice('Sound is unavailable. The visual timer still works.')
    }
  }

  const seconds = Math.ceil(remaining / 1000)
  const clock = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

  return (
    <section
      className="demo-focus"
      aria-label="Still focus timer demonstration"
    >
      <div className="demo-topline">
        <span className="demo-still-logo">still.</span>
        <span className="demo-mono">A MOMENT, WELL SPENT.</span>
      </div>
      <div className="demo-mode" aria-label="Session type">
        <button
          type="button"
          aria-pressed={mode === 'focus'}
          onClick={() => changeMode('focus')}
        >
          Focus
        </button>
        <button
          type="button"
          aria-pressed={mode === 'break'}
          onClick={() => changeMode('break')}
        >
          Short break
        </button>
      </div>
      <div className="demo-clock-wrap">
        <svg
          className="demo-clock-ring"
          viewBox="0 0 260 260"
          aria-hidden="true"
        >
          <circle cx="130" cy="130" r="117" />
          <circle
            className="demo-clock-progress"
            cx="130"
            cy="130"
            r="117"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={100 - (remaining / duration) * 100}
          />
        </svg>
        <div className="demo-clock-center">
          <span className="demo-mono">
            {mode === 'focus'
              ? 'SETTLE INTO YOUR FLOW'
              : 'A LITTLE BREATHING ROOM'}
          </span>
          <output
            className="demo-clock"
            role="timer"
            aria-live="off"
            aria-label={`${Math.floor(seconds / 60)} minutes and ${seconds % 60} seconds remaining`}
          >
            {clock}
          </output>
          <span className="demo-clock-detail">
            {running
              ? 'in progress'
              : remaining === 0
                ? 'complete'
                : 'your time, your pace'}
          </span>
        </div>
      </div>
      <div className="demo-timer-controls">
        <button
          className="demo-icon-button"
          aria-label="Reset timer"
          onClick={() => {
            setRunning(false)
            setRemaining(duration)
            setNotice('A fresh start.')
          }}
        >
          <RotateCcw size={17} />
        </button>
        <button className="demo-timer-start" onClick={toggleTimer}>
          {running ? (
            <Pause size={15} fill="currentColor" />
          ) : (
            <Play size={15} fill="currentColor" />
          )}
          {running ? 'Pause session' : 'Start session'}
        </button>
        <button
          className="demo-icon-button"
          aria-label={
            sound ? 'Mute completion sound' : 'Enable completion sound'
          }
          aria-pressed={sound}
          onClick={() => void toggleSound()}
        >
          {sound ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>
      <p className="demo-timer-notice" role="status">
        {notice}
      </p>
      <div className="demo-bottom-note demo-mono">
        <span>LESS NOISE. MORE INTENTION.</span>
        <span>LOCAL DEMO · 01</span>
      </div>
    </section>
  )
}

const sample7 = [426, 682, 534, 910, 760, 1130, 980]
const sample30 = [
  420, 390, 540, 510, 460, 680, 610, 570, 720, 640, 830, 780, 940, 690, 750,
  880, 770, 1020, 940, 860, 1080, 970, 1120, 1040, 990, 1170, 1090, 1260, 1180,
  1320,
]

function AtlasDemo() {
  const [range, setRange] = useState<7 | 30>(7)
  const chartId = useId()
  const values = range === 7 ? sample7 : sample30
  const total = values.reduce((sum, value) => sum + value, 0)
  const points = values
    .map(
      (value, i) =>
        `${44 + (i / (values.length - 1)) * 536},${185 - (value / 1500) * 150}`,
    )
    .join(' ')
  return (
    <section className="demo-atlas" aria-label="Atlas dashboard demonstration">
      <div className="demo-atlas-header">
        <span className="demo-atlas-brand">
          <Layers3 size={23} /> atlas<span className="demo-atlas-slash">/</span>
          <span className="demo-atlas-workspace">overview</span>
        </span>
        <span className="demo-sample-label">
          <i />
          SAMPLE DATA
        </span>
      </div>
      <div className="demo-atlas-title">
        <div>
          <span className="demo-mono">YOUR SYSTEM, AT A GLANCE</span>
          <h3>
            Less noise.
            <br />
            More signal.
          </h3>
        </div>
        <div className="demo-range" aria-label="Chart time range">
          <button
            aria-pressed={range === 7}
            onClick={() => setRange(7)}
            aria-label="7 days"
          >
            7D
          </button>
          <button
            aria-pressed={range === 30}
            onClick={() => setRange(30)}
            aria-label="30 days"
          >
            30D
          </button>
        </div>
      </div>
      <div className="demo-atlas-metrics">
        <div>
          <span className="demo-mono">SAMPLE REQUESTS</span>
          <strong>{total.toLocaleString('en-US')}</strong>
          <span>across {range} simulated days</span>
        </div>
        <div>
          <span className="demo-mono">DAILY AVERAGE</span>
          <strong>
            {Math.round(total / range).toLocaleString('en-US')}
            <ArrowUpRight size={21} />
          </strong>
          <span>illustrative activity only</span>
        </div>
      </div>
      <div className="demo-chart-wrap">
        <div className="demo-chart-caption">
          <span>Request volume</span>
          <span className="demo-mono">{range} DAY WINDOW</span>
        </div>
        <svg
          className="demo-chart"
          viewBox="0 0 600 220"
          role="img"
          aria-labelledby={`${chartId}-title ${chartId}-desc`}
        >
          <title id={`${chartId}-title`}>
            Simulated request volume over {range} days
          </title>
          <desc id={`${chartId}-desc`}>
            {values.map((v, i) => `Day ${i + 1}: ${v} requests`).join('; ')}.
            This is sample data, not a live service.
          </desc>
          {[0, 500, 1000, 1500].map((v) => (
            <g key={v}>
              <line
                x1="44"
                x2="580"
                y1={185 - (v / 1500) * 150}
                y2={185 - (v / 1500) * 150}
                className="demo-chart-grid"
              />
              <text x="32" y={189 - (v / 1500) * 150} textAnchor="end">
                {v === 1000 ? '1k' : v === 1500 ? '1.5k' : v}
              </text>
            </g>
          ))}
          <polygon
            points={`44,185 ${points} 580,185`}
            className="demo-chart-fill"
          />
          <polyline points={points} className="demo-chart-line" />
          {values.map((v, i) => (
            <circle
              key={i}
              cx={44 + (i / (values.length - 1)) * 536}
              cy={185 - (v / 1500) * 150}
              r={range === 7 ? 3 : 1.8}
              className="demo-chart-point"
            />
          ))}
          <text x="44" y="211">
            DAY 01
          </text>
          <text x="580" y="211" textAnchor="end">
            DAY {range}
          </text>
        </svg>
      </div>
      <div className="demo-atlas-footer">
        <span>
          <i /> Interactive interface prototype
        </span>
        <span>No live infrastructure connected</span>
      </div>
    </section>
  )
}

interface Task {
  id: string
  title: string
  done: boolean
}
const taskKey = 'mossab-forma-demo-v1'
const initialTasks: Task[] = [
  { id: 'seed-1', title: 'Give the idea a little structure', done: true },
  { id: 'seed-2', title: 'Make the first useful thing', done: false },
  { id: 'seed-3', title: 'Leave it better than you found it', done: false },
]

function readTasks(): Task[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(taskKey) ?? 'null')
    if (
      Array.isArray(raw) &&
      raw.length <= 100 &&
      raw.every(
        (t) =>
          t &&
          typeof t.id === 'string' &&
          typeof t.title === 'string' &&
          t.title.trim().length > 0 &&
          t.title.length <= 120 &&
          typeof t.done === 'boolean',
      ) &&
      new Set(raw.map((t) => t.id)).size === raw.length
    )
      return raw
  } catch {
    /* An unavailable store should never prevent using the demo. */
  }
  return initialTasks
}

function FormaDemo() {
  const [tasks, setTasks] = useState<Task[]>(readTasks)
  const [filter, setFilter] = useState<'all' | 'open' | 'done'>('all')
  const [draft, setDraft] = useState('')
  const [editing, setEditing] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [storageAvailable, setStorageAvailable] = useState(true)
  const [message, setMessage] = useState('')
  const taskId = useId()

  useEffect(() => {
    try {
      localStorage.setItem(taskKey, JSON.stringify(tasks))
      setStorageAvailable(true)
    } catch {
      setStorageAvailable(false)
    }
  }, [tasks])

  function addTask(event: FormEvent) {
    event.preventDefault()
    const title = draft.trim()
    if (!title || tasks.length >= 100) return
    setTasks((current) => [
      ...current,
      { id: crypto.randomUUID(), title, done: false },
    ])
    setDraft('')
    setFilter('all')
    setMessage('Task added.')
  }

  function saveTask(event: FormEvent) {
    event.preventDefault()
    if (!editTitle.trim()) return
    setTasks((current) =>
      current.map((t) =>
        t.id === editing ? { ...t, title: editTitle.trim() } : t,
      ),
    )
    setEditing(null)
    setMessage('Task updated.')
  }

  const done = tasks.filter((t) => t.done).length
  const filtered = tasks.filter(
    (t) => filter === 'all' || (filter === 'done' ? t.done : !t.done),
  )
  return (
    <section
      className="demo-forma"
      aria-label="Forma task workspace demonstration"
    >
      <div className="demo-forma-header">
        <span className="demo-forma-logo">
          <Asterisk size={29} strokeWidth={1.7} aria-hidden="true" /> forma
        </span>
        <span className="demo-mono">A SMALL SPACE TO MAKE PROGRESS</span>
      </div>
      <div className="demo-forma-title">
        <span className="demo-mono">
          PERSONAL WORKSPACE <ChevronRight size={12} /> TODAY
        </span>
        <h3>
          Room to think.
          <br />
          Space to do.
        </h3>
        <p>Give the next good idea somewhere to go.</p>
      </div>
      <div className="demo-forma-toolbar">
        <div className="demo-task-filters" aria-label="Filter tasks">
          {(['all', 'open', 'done'] as const).map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All tasks' : f === 'open' ? 'Open' : 'Done'}
              <span>
                {f === 'all'
                  ? tasks.length
                  : f === 'open'
                    ? tasks.length - done
                    : done}
              </span>
            </button>
          ))}
        </div>
        <span className="demo-task-progress demo-mono">
          {done}/{tasks.length} COMPLETE
        </span>
      </div>
      <ul className="demo-task-list">
        {filtered.map((task) => (
          <li key={task.id} className={task.done ? 'demo-task-done' : ''}>
            {editing === task.id ? (
              <form className="demo-edit-form" onSubmit={saveTask}>
                <label className="demo-sr-only" htmlFor={`${taskId}-edit`}>
                  Edit task
                </label>
                <input
                  id={`${taskId}-edit`}
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  maxLength={120}
                  autoFocus
                  required
                />
                <button type="submit" disabled={!editTitle.trim()}>
                  Save
                </button>
                <button type="button" onClick={() => setEditing(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <label className="demo-task-label">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => {
                      setTasks((current) =>
                        current.map((t) =>
                          t.id === task.id ? { ...t, done: !t.done } : t,
                        ),
                      )
                      setMessage(
                        task.done ? 'Task reopened.' : 'Task completed.',
                      )
                    }}
                  />
                  <span className="demo-task-check" aria-hidden="true">
                    {task.done && <Check size={13} strokeWidth={3} />}
                  </span>
                  <span>{task.title}</span>
                </label>
                <div className="demo-task-actions">
                  <button
                    aria-label={`Edit task: ${task.title}`}
                    onClick={() => {
                      setEditing(task.id)
                      setEditTitle(task.title)
                    }}
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    aria-label={`Delete task: ${task.title}`}
                    onClick={() => {
                      setTasks((current) =>
                        current.filter((t) => t.id !== task.id),
                      )
                      setMessage('Task deleted.')
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      {filtered.length === 0 && (
        <p className="demo-task-empty">
          {filter === 'done'
            ? 'A fresh start. Your completed tasks will appear here.'
            : 'A little breathing room. Add a task when you’re ready.'}
        </p>
      )}
      <form className="demo-task-add" onSubmit={addTask}>
        <Plus size={17} aria-hidden="true" />
        <label className="demo-sr-only" htmlFor={`${taskId}-new`}>
          New task
        </label>
        <input
          id={`${taskId}-new`}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={120}
          placeholder="What’s the next small step?"
          disabled={tasks.length >= 100}
        />
        <button
          type="submit"
          aria-label="Add task"
          disabled={!draft.trim() || tasks.length >= 100}
        >
          <ArrowUpRight size={18} />
        </button>
      </form>
      <div className="demo-forma-footer">
        <span className="demo-mono">
          {storageAvailable
            ? 'SAVED IN THIS BROWSER'
            : 'STORAGE UNAVAILABLE — THIS SESSION ONLY'}
        </span>
        <span className="demo-mono">LOCAL DEMO · 03</span>
      </div>
      <p className="demo-sr-only" role="status">
        {message}
        {tasks.length >= 100
          ? ' Workspace full: remove a task to add another.'
          : ''}
      </p>
    </section>
  )
}

export default function ProjectDemo({ kind }: { kind: DemoKind }) {
  if (kind === 'focus') return <FocusDemo />
  if (kind === 'atlas') return <AtlasDemo />
  return <FormaDemo />
}
