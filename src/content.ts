// Keep personal information in one place. Null means the detail is not supplied;
// the UI will explain that instead of creating a broken or fictional link.
export const profile = {
  name: 'Mossab Laribi',
  firstName: 'Mossab',
  role: 'Full Stack Software Developer',
  github: 'https://github.com/MossabLa',
  email: null as string | null,
  linkedin: null as string | null,
}

export interface Project {
  id: string
  number: string
  name: string
  subtitle: string
  category: string
  year: string
  stack: string[]
  description: string
  challenge: string
  approach: string
  outcome: string
  kind: 'focus' | 'atlas' | 'forma'
}

export const projects: Project[] = [
  {
    id: 'still',
    number: '01',
    name: 'Still.',
    subtitle: 'A little space for deep work.',
    category: 'PRODUCT DESIGN / FRONTEND',
    year: 'DEMONSTRATION',
    stack: ['React', 'TypeScript', 'Web Audio'],
    kind: 'focus',
    description:
      'A focused timer concept that makes the next task feel more manageable. One session, one intention, fewer distractions.',
    challenge:
      'A timer should stay accurate when a tab becomes inactive, and its controls should remain understandable without motion or sound.',
    approach:
      'The interactive demo derives elapsed time from the clock rather than counting interval callbacks. Pause and reset are explicit state transitions, with a separate short-break mode.',
    outcome:
      'A working browser demonstration of focus and break sessions. This is an original portfolio concept, not a shipped client project; no usage or performance claims are made.',
  },
  {
    id: 'atlas',
    number: '02',
    name: 'Atlas',
    subtitle: 'Complex systems. Clear signals.',
    category: 'DATA INTERFACE / API CONCEPT',
    year: 'DEMONSTRATION',
    stack: ['React', 'TypeScript', 'SVG'],
    kind: 'atlas',
    description:
      'An observability interface concept that turns a noisy stream of application activity into a readable, explorable picture.',
    challenge:
      'A dashboard needs to distinguish a real operational signal from an attractive chart, without hiding data behind visual effects.',
    approach:
      'The preview uses a labeled sample dataset and an interactive time-range selector. The chart is SVG, with a textual summary and data points available to assistive technology.',
    outcome:
      'A local interface prototype with explicitly simulated data. No live infrastructure is connected. A production implementation would add authentication, a metrics API, and carefully scoped access.',
  },
  {
    id: 'forma',
    number: '03',
    name: 'Forma',
    subtitle: 'From scattered to structured.',
    category: 'INTERACTION DESIGN / PRODUCT',
    year: 'DEMONSTRATION',
    stack: ['React', 'TypeScript', 'localStorage'],
    kind: 'forma',
    description:
      'A small, deliberate workspace concept for turning a loose collection of tasks into a clear plan.',
    challenge:
      'Task interactions should be equally usable with a keyboard, a touchscreen, or a mouse, and survive a page reload.',
    approach:
      'The demo keeps task state local and persists changes in the browser. Native controls replace drag-only interactions, so completing and filtering tasks never depends on precise pointer movement.',
    outcome:
      'A functional local task-list demonstration with editable tasks, filters, and persistence. Collaborative editing and a server database are design considerations, not implemented claims.',
  },
]
