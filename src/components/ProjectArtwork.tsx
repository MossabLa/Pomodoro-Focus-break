import {
  ArrowUpRight,
  Asterisk,
  Check,
  Plus,
  MoreHorizontal,
  Activity,
} from 'lucide-react'

export default function ProjectArtwork({
  kind,
}: {
  kind: 'focus' | 'atlas' | 'forma'
}) {
  if (kind === 'focus')
    return (
      <div className="artwork artwork-focus" aria-hidden="true">
        <div className="artwork-grain" />
        <div className="focus-orbit orbit-one" />
        <div className="focus-orbit orbit-two" />
        <div className="focus-window">
          <div className="mock-top">
            <span className="still-brand">still.</span>
            <span className="tiny-label">MAKE ROOM FOR FOCUS</span>
            <MoreHorizontal size={18} />
          </div>
          <div className="focus-mode">
            <span className="small-dot" /> A moment of focus
          </div>
          <div className="focus-clock">
            25<span>:</span>00
          </div>
          <div className="focus-intention">One thing at a time.</div>
          <div className="mock-start">
            Begin your session <ArrowUpRight size={15} />
          </div>
          <div className="focus-bottom">
            <span>FOCUS / 25 MIN</span>
            <span>BREAK / 05 MIN</span>
          </div>
        </div>
        <span className="artwork-footnote">LESS NOISE. MORE INTENTION.</span>
      </div>
    )
  if (kind === 'atlas')
    return (
      <div className="artwork artwork-atlas" aria-hidden="true">
        <div className="atlas-rings" />
        <div className="atlas-window">
          <div className="atlas-sidebar">
            <Activity size={20} />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="atlas-content">
            <div className="mock-top">
              <span className="atlas-brand">atlas</span>
              <span className="atlas-status">
                <span className="small-dot" /> SAMPLE SYSTEM
              </span>
            </div>
            <div className="atlas-overview">
              <span>Overview</span>
              <span className="atlas-period">Last 7 days</span>
            </div>
            <div className="atlas-stats">
              <div>
                <small>REQUESTS</small>
                <strong>
                  24,891
                  <span>
                    <ArrowUpRight size={12} />
                  </span>
                </strong>
              </div>
              <div>
                <small>AVG. RESPONSE</small>
                <strong>
                  128<em>ms</em>
                </strong>
              </div>
            </div>
            <div className="atlas-chart-label">
              <span>Request activity</span>
              <span>SAMPLE DATA</span>
            </div>
            <svg className="atlas-chart" viewBox="0 0 460 140" fill="none">
              <path
                className="chart-grid"
                d="M0 20H460M0 60H460M0 100H460M0 139H460"
              />
              <path
                d="M0 120L20 100L43 108L68 77L90 88L112 50L135 64L155 57L178 78L200 28L223 48L246 37L268 58L290 20L314 31L337 22L359 46L383 13L405 28L433 9L460 17"
                stroke="#b5d88d"
                strokeWidth="2.5"
              />
              <path
                d="M0 132L25 123L54 126L84 115L113 120L143 100L172 108L202 90L230 106L261 87L292 93L320 72L350 85L378 68L409 80L440 57L460 65"
                stroke="#6d746c"
                strokeWidth="1.5"
              />
            </svg>
            <div className="atlas-days">
              <span>MON</span>
              <span>WED</span>
              <span>FRI</span>
              <span>SUN</span>
            </div>
          </div>
        </div>
        <span className="artwork-footnote">
          SEE THE SYSTEM. FIND THE SIGNAL.
        </span>
      </div>
    )
  return (
    <div className="artwork artwork-forma" aria-hidden="true">
      <div className="forma-bg-word">forma</div>
      <div className="forma-window">
        <div className="mock-top">
          <span className="forma-brand">
            f<span>orma</span>
          </span>
          <span className="forma-avatar">ML</span>
        </div>
        <div className="forma-heading">
          <span>
            Your ideas,
            <br />
            taking shape.
          </span>
          <Asterisk className="forma-flower" size={48} strokeWidth={1.6} />
        </div>
        <div className="forma-tabs">
          <span>
            Today <b>03</b>
          </span>
          <span>Upcoming</span>
          <Plus size={14} />
        </div>
        <div className="forma-task">
          <span className="mock-checkbox done">
            <Check size={11} />
          </span>
          <span className="task-done">Find the right question</span>
          <i>DISCOVERY</i>
        </div>
        <div className="forma-task">
          <span className="mock-checkbox" />
          <span>Make the complex feel simple</span>
          <i>DESIGN</i>
        </div>
        <div className="forma-task">
          <span className="mock-checkbox" />
          <span>Build something that matters</span>
          <i>DEVELOP</i>
        </div>
        <div className="forma-progress">
          <span>Small steps. Clear direction.</span>
          <div>
            <i />
          </div>
        </div>
      </div>
      <span className="artwork-footnote">A PLACE FOR WHAT COMES NEXT.</span>
    </div>
  )
}
