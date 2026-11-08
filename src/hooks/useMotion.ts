import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useMotion() {
  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
      timeline
        .from('.site-header', { y: -16, opacity: 0, duration: 0.55 })
        .from('.hero-eyebrow', { y: 15, opacity: 0, duration: 0.6 }, 0.1)
        .from(
          '.hero-line > span',
          { yPercent: 112, rotate: 2, duration: 1.05, stagger: 0.11 },
          0.15,
        )
        .from(
          '.hero-description, .hero-actions',
          { y: 24, opacity: 0, duration: 0.75, stagger: 0.12 },
          0.55,
        )
        .from('.hero-visual', { y: 26, opacity: 0, duration: 1 }, 0.4)
        .from('.hero-foot', { opacity: 0, duration: 0.6 }, 0.85)
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.from(element, {
          y: 35,
          opacity: 0,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 94%', once: true },
        })
      })
      gsap.utils.toArray<HTMLElement>('.project-visual').forEach((element) => {
        const art = element.querySelector('.artwork')
        if (art)
          gsap.fromTo(
            art,
            { yPercent: -3 },
            {
              yPercent: 3,
              ease: 'none',
              scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            },
          )
      })
    })
    return () => media.revert()
  }, [])
}
