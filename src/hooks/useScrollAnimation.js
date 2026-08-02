import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(scope, setup) {
  const setupRef = useRef(setup)
  setupRef.current = setup

  useLayoutEffect(() => {
    if (!scope.current) {
      return undefined
    }

    let cleanup
    const context = gsap.context(() => {
      cleanup = setupRef.current({ gsap, ScrollTrigger })
    }, scope)

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      cleanup?.()
      context.revert()
    }
  }, [scope])
}