import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Pointer() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const media = matchMedia(
      '(pointer: fine) and (prefers-reduced-motion: no-preference)',
    )
    if (!media.matches || !ref.current) return
    const el = ref.current
    const x = gsap.quickTo(el, 'x', { duration: 0.3, ease: 'power3' })
    const y = gsap.quickTo(el, 'y', { duration: 0.3, ease: 'power3' })
    const move = (event: PointerEvent) => {
      x(event.clientX)
      y(event.clientY)
      const target = (event.target as Element).closest('[data-cursor]')
      el.dataset.active = target ? 'true' : 'false'
      el.textContent = target?.getAttribute('data-cursor') || ''
    }
    const leave = () => {
      el.dataset.active = 'false'
    }
    document.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    return () => {
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      gsap.killTweensOf(el)
    }
  }, [])
  return <div className="custom-pointer" ref={ref} aria-hidden="true" />
}
