import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { profile, projects } from './content'
import type { Project } from './content'
import SignatureScene from './components/SignatureScene'
import Practice from './components/Practice'
import ProjectArtwork from './components/ProjectArtwork'
import ProjectDialog from './components/ProjectDialog'
import Contact from './components/Contact'
import Pointer from './components/Pointer'
import { useMotion } from './hooks/useMotion'

function Navigation() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const outside = (event: PointerEvent) => {
      if (
        !navRef.current?.contains(event.target as Node) &&
        !toggleRef.current?.contains(event.target as Node)
      )
        setOpen(false)
    }
    document.addEventListener('keydown', close)
    document.addEventListener('pointerdown', outside)
    return () => {
      document.removeEventListener('keydown', close)
      document.removeEventListener('pointerdown', outside)
    }
  }, [open])
  return (
    <header className="site-header section-shell">
      <a className="brand" href="#top" aria-label="Mossab Laribi, home">
        <span className="wordmark">
          m<span>l</span>
          <i />
        </span>
        <span className="brand-name">
          Mossab Laribi<span>INDEPENDENT THINKING. FULL STACK BUILDING.</span>
        </span>
      </a>
      <button
        ref={toggleRef}
        className="menu-toggle icon-button"
        aria-expanded={open}
        aria-controls="main-navigation"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        ref={navRef}
        id="main-navigation"
        className={open ? 'navigation is-open' : 'navigation'}
        aria-label="Main navigation"
      >
        <a href="#work" onClick={() => setOpen(false)}>
          Work <sup>03</sup>
        </a>
        <a href="#about" onClick={() => setOpen(false)}>
          About
        </a>
        <a href="#expertise" onClick={() => setOpen(false)}>
          The stack
        </a>
        <a
          href="#contact"
          className="nav-contact"
          onClick={() => setOpen(false)}
        >
          Let’s talk <ArrowUpRight size={15} />
        </a>
      </nav>
    </header>
  )
}

function MagneticLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode
  href: string
  className: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onPointerMove={(event) => {
        if (
          !matchMedia(
            '(pointer: fine) and (prefers-reduced-motion: no-preference)',
          ).matches
        )
          return
        const rect = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.09}px, ${(event.clientY - rect.top - rect.height / 2) * 0.15}px)`
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.transform = ''
      }}
    >
      {children}
    </a>
  )
}

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  useMotion()
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div id="top" />
      <Navigation />
      <main id="main-content">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-eyebrow">
            <span className="section-kicker">
              <span className="small-dot" /> {profile.role.toUpperCase()}
            </span>
            <span className="mono hero-edition">PORTFOLIO / VOL. 01</span>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <h1 id="hero-title">
                <span className="hero-line">
                  <span>Built from</span>
                </span>
                <span className="hero-line">
                  <span>the inside</span>
                </span>
                <span className="hero-line">
                  <span>
                    <em>out.</em>
                    <ArrowUpRight
                      className="headline-arrow"
                      strokeWidth={1.2}
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </h1>
              <p className="hero-description">
                Thoughtful interfaces. Solid foundations.
                <br />I connect the details you see to the systems you don’t.
              </p>
              <div className="hero-actions">
                <MagneticLink href="#work" className="primary-button">
                  Explore the work <ArrowDownRight size={20} />
                </MagneticLink>
                <a className="text-link" href="#contact">
                  Let’s build something <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <SignatureScene />
            </div>
          </div>
          <div className="hero-foot">
            <a href="#work" className="scroll-hint">
              <span className="scroll-line" />
              <span>SCROLL TO EXPLORE</span>
              <ArrowDown size={13} />
            </a>
            <span className="hero-foot-center">CRAFT AT EVERY LAYER.</span>
            <span className="mono">DESIGN ↔ ENGINEERING</span>
          </div>
        </section>

        <section
          id="work"
          className="work-section section-shell"
          aria-labelledby="work-title"
        >
          <div className="section-top reveal">
            <span className="section-kicker">01 / SELECTED EXPLORATIONS</span>
            <span className="mono">IDEAS MADE TANGIBLE</span>
          </div>
          <div className="work-heading reveal">
            <h2 id="work-title">
              Less talk.
              <br />
              <span>More making.</span>
            </h2>
            <div>
              <p>
                Three explorations at the intersection
                <br className="desktop-br" /> of utility, clarity, and a little
                curiosity.
              </p>
              <span className="sample-note">
                <span className="small-dot" /> Original demo projects — not
                client work
              </span>
            </div>
          </div>
          <div className="projects-list">
            {projects.map((project) => (
              <article
                key={project.id}
                className={`project project-${project.kind} reveal`}
              >
                <button
                  className="project-visual"
                  aria-label={`Explore ${project.name} project`}
                  onClick={() => setActiveProject(project)}
                  data-cursor="EXPLORE ↗"
                >
                  <ProjectArtwork kind={project.kind} />
                  <span className="project-overlay">
                    <span>EXPLORE THE CONCEPT</span>
                    <ArrowUpRight size={22} />
                  </span>
                  <span className="project-number">/{project.number}</span>
                </button>
                <div className="project-info">
                  <div className="project-title-row">
                    <span className="mono project-index">{project.number}</span>
                    <div>
                      <button
                        className="project-name"
                        onClick={() => setActiveProject(project)}
                      >
                        {project.name} <ArrowUpRight />
                      </button>
                      <p>{project.subtitle}</p>
                    </div>
                  </div>
                  <div className="project-tags">
                    <span className="mono">{project.category}</span>
                    <div>
                      {project.stack.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="work-footer reveal">
            <span className="mono">ALWAYS CURIOUS. ALWAYS ITERATING.</span>
            <a
              className="text-link"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              More on GitHub <ArrowUpRight size={17} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </section>
        <Practice />
      </main>
      <Contact />
      <Pointer />
      {activeProject && (
        <ProjectDialog
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  )
}
