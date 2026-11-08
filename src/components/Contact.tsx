import { useState } from 'react'
import { ArrowUp, ArrowUpRight, Check, Copy, Github } from 'lucide-react'
import { profile } from '../content'
import Logo from './Logo'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  async function copyContact() {
    try {
      await navigator.clipboard.writeText(profile.email || profile.github)
      setCopied(true)
      setCopyError(false)
    } catch {
      setCopyError(true)
    }
  }
  return (
    <footer id="contact" className="contact-section">
      <div className="section-shell">
        <div className="contact-top reveal">
          <span className="section-kicker">
            <span className="small-dot" /> 05 / NEXT CHAPTER
          </span>
          <span className="mono">GOOD WORK STARTS WITH A CONVERSATION.</span>
        </div>
        <a
          className="contact-title reveal"
          href={profile.email ? `mailto:${profile.email}` : profile.github}
          target={profile.email ? undefined : '_blank'}
          rel="noreferrer"
        >
          <span>
            Have something
            <br />
            in <em>mind?</em>
          </span>
          <span className="contact-arrow" aria-hidden="true">
            <svg viewBox="0 0 160 160">
              <defs>
                <path
                  id="contact-badge-circle"
                  d="M80,80 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0"
                />
              </defs>
              <circle className="contact-badge-bg" cx="80" cy="80" r="78" />
              <g className="contact-badge-text">
                <text>
                  <textPath href="#contact-badge-circle">
                    OPEN TO CONVERSATION ✦ FULL STACK ✦
                  </textPath>
                </text>
              </g>
              <circle className="contact-badge-core" cx="80" cy="80" r="34" />
              <path
                className="contact-badge-arrow"
                d="M68 92 92 68M72 68h20v20"
              />
            </svg>
          </span>
          <span className="sr-only">
            {profile.email
              ? 'Send an email to Mossab'
              : 'Visit Mossab on GitHub (opens in a new tab)'}
          </span>
        </a>
        <div className="contact-bottom reveal">
          <div>
            <p>Let’s make it make sense.</p>
            <a
              className="text-link"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={16} /> github.com/MossabLa{' '}
              <ArrowUpRight size={16} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          <div className="contact-details">
            <div>
              <span className="mono">EMAIL</span>
              {profile.email ? (
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              ) : (
                <span className="contact-placeholder">Not published yet</span>
              )}
            </div>
            <div>
              <span className="mono">LINKEDIN</span>
              {profile.linkedin ? (
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  Connect <ArrowUpRight size={13} />
                </a>
              ) : (
                <span className="contact-placeholder">Not linked yet</span>
              )}
            </div>
            <button className="copy-button" onClick={copyContact}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>
                {copied
                  ? 'Copied'
                  : profile.email
                    ? 'Copy email'
                    : 'Copy GitHub link'}
              </span>
            </button>
            <span className="sr-only" role="status">
              {copied
                ? 'Contact link copied to clipboard.'
                : copyError
                  ? `Copy unavailable. The contact link is ${profile.github}`
                  : ''}
            </span>
            {copyError && (
              <span className="copy-error">
                Couldn’t copy. Use the link above.
              </span>
            )}
          </div>
        </div>
        <div className="footer-line">
          <a
            className="footer-logo"
            href="#top"
            aria-label="Mossab Laribi, back to top"
          >
            <Logo size={34} />
          </a>
          <span className="mono">
            © {new Date().getFullYear()} MOSSAB LARIBI
          </span>
          <span className="footer-credit mono">
            THOUGHTFULLY DESIGNED. CAREFULLY BUILT.
          </span>
          <a href="#top" className="back-top">
            Back to top <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  )
}
