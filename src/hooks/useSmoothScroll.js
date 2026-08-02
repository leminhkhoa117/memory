import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll(isActive) {
  useEffect(() => {
    if (!isActive || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.15,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    })

    const updateScrollTrigger = () => ScrollTrigger.update()
    const updateLenis = (time) => lenis.raf(time * 1000)

    lenis.on('scroll', updateScrollTrigger)
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)
    ScrollTrigger.refresh()

    return () => {
      lenis.off('scroll', updateScrollTrigger)
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [isActive])
}