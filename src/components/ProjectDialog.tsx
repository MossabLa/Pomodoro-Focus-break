import { lazy, Suspense, useEffect, useRef } from 'react'
import { ArrowDown, X } from 'lucide-react'
import type { Project } from '../content'

const ProjectDemo = lazy(() => import('./ProjectDemo'))

export default function ProjectDialog({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const demoRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const dialog = dialogRef.current!
    const previouslyFocused = document.activeElement as HTMLElement | null
    dialog.showModal()
    const scrollY = window.scrollY
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus({ preventScroll: true })
      window.scrollTo({ top: scrollY, behavior: 'instant' })
    }
  }, [])
  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="dialog-inner">
        <div className="dialog-top">
          <span className="mono">PROJECT STUDY / {project.number}</span>
          <button
            className="icon-button close-dialog"
            onClick={onClose}
            aria-label="Close project"
          >
            <X size={24} />
          </button>
        </div>
        <span className="demo-label">
          Independent demonstration · editable portfolio content
        </span>
        <h2 id="dialog-title">{project.name}</h2>
        <p className="dialog-lead">{project.description}</p>
        <div className="dialog-meta">
          <div>
            <span>CONTRIBUTION</span>
            <p>Concept, interface & interactive prototype</p>
          </div>
          <div>
            <span>BUILT WITH</span>
            <p>{project.stack.join(' / ')}</p>
          </div>
        </div>
        <button
          className="text-link"
          onClick={() =>
            demoRef.current?.scrollIntoView({
              behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'instant'
                : 'smooth',
              block: 'start',
            })
          }
        >
          Try the working demo <ArrowDown size={16} />
        </button>
        <div className="case-study">
          <div>
            <h3>The challenge</h3>
            <p>{project.challenge}</p>
          </div>
          <div>
            <h3>The approach</h3>
            <p>{project.approach}</p>
          </div>
          <div>
            <h3>What’s here</h3>
            <p>{project.outcome}</p>
          </div>
        </div>
        <div ref={demoRef} className="dialog-demo">
          <span className="section-kicker">
            LIVE IN YOUR BROWSER / INTERACTIVE DEMO
          </span>
          <Suspense
            fallback={
              <div className="demo-loading" role="status">
                Preparing the demo…
              </div>
            }
          >
            <ProjectDemo kind={project.kind} />
          </Suspense>
        </div>
        <div className="dialog-bottom">
          <span className="mono">CONCEPT → CODE → CONSIDERATION</span>
          <button className="text-link" onClick={onClose}>
            Back to selected work <X size={15} />
          </button>
        </div>
      </div>
    </dialog>
  )
}
