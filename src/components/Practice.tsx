import { useRef, useState, type KeyboardEvent } from 'react'
import { ArrowDownRight, ArrowUpRight, Braces, Layers3 } from 'lucide-react'
import './Practice.css'

const disciplines = [
  {
    name: 'Frontend',
    number: '01',
    title: 'The part you feel.',
    description:
      'Interfaces should make complex things feel natural. A considered component system connects clear structure, accessible interaction, and just enough motion.',
    skills: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
    flow: ['Intent', 'Interaction', 'Feedback'],
    note: 'Built around the person on the other side of the screen.',
  },
  {
    name: 'Backend',
    number: '02',
    title: 'Quietly doing the work.',
    description:
      'Good services have a clear responsibility. Explicit contracts, predictable errors, and observable behavior make the system easier to trust and easier to change.',
    skills: ['Node.js', 'NestJS', 'Express', 'REST APIs'],
    flow: ['Request', 'Business logic', 'Response'],
    note: 'Deliberate boundaries. Predictable behavior.',
  },
  {
    name: 'Data',
    number: '03',
    title: 'A reliable foundation.',
    description:
      'Start with the relationships that matter. Model the domain carefully, protect integrity at the database, and choose queries that explain what the product needs.',
    skills: ['PostgreSQL', 'SQL Server', 'Prisma ORM', 'Data modeling'],
    flow: ['Model', 'Query', 'Consistency'],
    note: 'Structure that serves the product, today and tomorrow.',
  },
  {
    name: 'Architecture',
    number: '04',
    title: 'Room to evolve.',
    description:
      'Architecture is a series of tradeoffs, not a collection of buzzwords. Keep the core understandable, isolate the things that change, and add complexity only when it earns its place.',
    skills: ['SOLID', 'Clean Architecture', 'Design Patterns', 'API Design'],
    flow: ['Constraints', 'Boundaries', 'Decisions'],
    note: 'The simplest design that holds up under real use.',
  },
  {
    name: 'Tools',
    number: '05',
    title: 'A considered workflow.',
    description:
      'Small, reviewable changes. Reproducible environments. Checks that catch meaningful problems. The work around the code is part of the craft, too.',
    skills: ['Git', 'GitHub', 'Docker', 'Postman'],
    flow: ['Build', 'Verify', 'Deliver'],
    note: 'Less friction between an idea and a working product.',
  },
]

const journey = [
  {
    number: '01',
    title: 'The interface',
    caption: 'MAKE IT UNDERSTANDABLE',
    body: 'How does it feel to use? Start with the interaction, the hierarchy, and the smallest useful detail.',
  },
  {
    number: '02',
    title: 'The system',
    caption: 'MAKE IT DEPENDABLE',
    body: 'What makes it hold together? Connect the interface to clear contracts, thoughtful logic, and reliable data.',
  },
  {
    number: '03',
    title: 'The product',
    caption: 'MAKE IT MATTER',
    body: 'Does it solve the right problem? Bring the pieces together, question the assumptions, and keep refining.',
  },
]

export default function Practice() {
  const [activeTab, setActiveTab] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const current = disciplines[activeTab]

  function handleTabKey(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % disciplines.length
    else if (event.key === 'ArrowLeft')
      next = (index - 1 + disciplines.length) % disciplines.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = disciplines.length - 1
    else return

    event.preventDefault()
    setActiveTab(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <>
      <section
        id="about"
        className="practice-about section-shell"
        aria-labelledby="practice-about-heading"
      >
        <div className="practice-about-top reveal">
          <p className="section-kicker">02 / THE APPROACH</p>
          <span className="practice-margin-note">THOUGHTFUL BY DESIGN</span>
        </div>
        <div className="practice-about-grid">
          <div className="practice-about-title reveal">
            <h2 id="practice-about-heading">
              Clarity is
              <br />a <span>feature.</span>
            </h2>
            <div className="practice-title-mark" aria-hidden="true">
              <ArrowDownRight strokeWidth={1.25} />
            </div>
          </div>
          <div className="practice-about-copy reveal">
            <p className="practice-lead">
              The best software feels simple.
              <br />
              That rarely happens by accident.
            </p>
            <p>
              My approach starts with understanding the problem, then finding
              the clearest way through it. From the first interaction to the
              last database query, every decision should have a reason.
            </p>
            <p>
              I care about the details you notice. And the foundations you
              shouldn’t have to think about.
            </p>
            <div className="practice-principles">
              <div>
                <Braces size={18} strokeWidth={1.5} aria-hidden="true" />
                <span>Readable by people.</span>
              </div>
              <div>
                <Layers3 size={18} strokeWidth={1.5} aria-hidden="true" />
                <span>Built for what comes next.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="practice-bottom-rule" aria-hidden="true">
          <span>LESS NOISE.</span>
          <span>MORE INTENTION.</span>
        </div>
      </section>

      <section
        id="expertise"
        className="practice-expertise"
        aria-labelledby="practice-expertise-heading"
      >
        <div className="section-shell practice-expertise-inner">
          <div className="practice-expertise-top reveal">
            <p className="section-kicker">03 / TECHNICAL TOOLBOX</p>
            <span className="practice-expertise-symbol" aria-hidden="true">
              {'{ }'}
            </span>
          </div>
          <div className="practice-expertise-heading reveal">
            <h2 id="practice-expertise-heading">
              The stack,
              <br />
              <span>connected.</span>
            </h2>
            <p>
              Different layers. <br />
              One considered experience.
            </p>
          </div>

          <div className="practice-stack reveal">
            <div
              className="practice-tabs"
              role="tablist"
              aria-label="Technical disciplines"
            >
              {disciplines.map((discipline, index) => (
                <button
                  key={discipline.name}
                  id={`practice-tab-${index}`}
                  ref={(element) => {
                    tabRefs.current[index] = element
                  }}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === index}
                  aria-controls={`practice-panel-${index}`}
                  tabIndex={activeTab === index ? 0 : -1}
                  onClick={() => setActiveTab(index)}
                  onKeyDown={(event) => handleTabKey(event, index)}
                >
                  <span className="practice-tab-number">
                    {discipline.number}
                  </span>
                  <span>{discipline.name}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              ))}
            </div>
            {disciplines.map((discipline, index) => (
              <div
                key={discipline.name}
                id={`practice-panel-${index}`}
                role="tabpanel"
                aria-labelledby={`practice-tab-${index}`}
                tabIndex={0}
                hidden={activeTab !== index}
                className="practice-tab-panel"
              >
                <div className="practice-panel-main">
                  <div className="practice-panel-index" aria-hidden="true">
                    {discipline.number}
                    <span>/05</span>
                  </div>
                  <h3>{discipline.title}</h3>
                  <p>{discipline.description}</p>
                </div>
                <div className="practice-panel-tools">
                  <p className="practice-tools-label">TOOLS OF THE TRADE</p>
                  <ul>
                    {discipline.skills.map((skill) => (
                      <li key={skill}>
                        <span>{skill}</span>
                        <span aria-hidden="true">+</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="practice-signal-path"
                  aria-label={`${discipline.name} process: ${discipline.flow.join(', ')}`}
                >
                  {discipline.flow.map((step, stepIndex) => (
                    <span key={step}>
                      <i aria-hidden="true" />
                      {step}
                      {stepIndex < 2 && <b aria-hidden="true">⟶</b>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <div className="practice-stack-footer">
              <span className="practice-status-dot" aria-hidden="true" />
              <p>{current.note}</p>
              <span aria-hidden="true">SYS. {current.number}</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="journey"
        className="practice-journey section-shell"
        aria-labelledby="practice-journey-heading"
      >
        <div className="practice-journey-heading reveal">
          <div>
            <p className="section-kicker">04 / THE THROUGHLINE</p>
            <h2 id="practice-journey-heading">
              A practice
              <br />
              in progress.
            </h2>
          </div>
          <div className="practice-journey-note">
            <span>EDITABLE JOURNEY</span>
            <p>
              Three lenses for a growing practice. This is a draft framework for
              personal milestones, not a record of employment.
            </p>
          </div>
        </div>
        <ol className="practice-journey-list">
          {journey.map((step) => (
            <li className="reveal" key={step.number}>
              <div className="practice-journey-line">
                <span>{step.number}</span>
                <i aria-hidden="true" />
              </div>
              <p className="practice-journey-caption">{step.caption}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
