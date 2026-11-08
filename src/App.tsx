import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { profile, projects } from './content'
import type { Project } from './content'
import SignatureScene from './components/SignatureScene'
import Practice from './components/Practice'
import ProjectArtwork from './components/ProjectArtwork'
import ProjectDialog from './components/ProjectDialog'
import Contact from './components/Contact'
import Pointer from './components/Pointer'
import Logo from './components/Logo'
import { useMotion } from './hooks/useMotion'

const marqueeItems = [
  'React',
  'TypeScript',
  'Node.js',
  'NestJS',
  'PostgreSQL',
  'Prisma',
  'Docker',
  'Clean Architecture',
  'REST APIs',
  'Web Audio',
]

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
        <Logo />
        <span className="brand-name">
          Mossab Laribi<span>FULL STACK · INSIDE OUT</span>
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
          Approach
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
  return (
    <a
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
        event.currentTarget.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.12}px, ${(event.clientY - rect.top - rect.height / 2) * 0.2}px)`
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.transform = ''
      }}
    >
      {children}
    </a>
  )
}

function Marquee() {
  const items = [...marqueeItems, ...marqueeItems]
  return (
    <div className="marquee-frame" aria-hidden="true">
      <div className="marquee">
        <div className="marquee-track">
          {items.map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0z" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function HeadlineMark() {
  return (
    <svg className="headline-mark" viewBox="0 0 120 120" aria-hidden="true">
      <circle
        className="headline-mark-ring"
        cx="60"
        cy="60"
        r="56"
        fill="none"
        strokeWidth="2"
        strokeDasharray="3 7"
      />
      <path
        d="M38 82 82 38M46 38h36v36"
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
              <span className="small-dot is-live" />{' '}
              {profile.role.toUpperCase()}
            </span>
            <span className="mono hero-edition">PORTFOLIO / VOL. 02</span>
            <span className="mono hero-edition hero-axis">
              INTERFACE ↔ SYSTEM ↔ DATA
            </span>
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
                  <span className="hero-line-last">
                    <em>out.</em>
                    <HeadlineMark />
                  </span>
                </span>
              </h1>
              <p className="hero-description">
                Thoughtful interfaces. Solid foundations. I connect the details
                you see to the systems you don’t.
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
              <svg
                width="22"
                height="34"
                viewBox="0 0 22 34"
                aria-hidden="true"
              >
                <rect
                  x="1"
                  y="1"
                  width="20"
                  height="32"
                  rx="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <circle className="scroll-wheel" cx="11" cy="10" r="2.5" />
              </svg>
              <span>SCROLL TO EXPLORE</span>
            </a>
            <span className="hero-foot-center">CRAFT AT EVERY LAYER.</span>
            <span className="mono">DESIGN ↔ ENGINEERING</span>
          </div>
        </section>

        <Marquee />

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
                Three explorations at the intersection of utility, clarity, and
                a little curiosity.
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
                  <span className="project-overlay" aria-hidden="true">
                    <span>EXPLORE THE CONCEPT</span>
                    <ArrowUpRight size={18} />
                  </span>
                </button>
                <div className="project-info">
                  <div className="project-text">
                    <span className="mono project-category">
                      {project.number} — {project.category}
                    </span>
                    <h3>
                      <button
                        className="project-name"
                        onClick={() => setActiveProject(project)}
                      >
                        {project.name}
                      </button>
                    </h3>
                    <p>{project.subtitle}</p>
                  </div>
                  <div className="project-meta">
                    <ul className="project-tags" aria-label="Built with">
                      {project.stack.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                    <span className="project-cta" aria-hidden="true">
                      <ArrowUpRight strokeWidth={1.6} />
                    </span>
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
