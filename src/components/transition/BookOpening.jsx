import gsap from 'gsap'
import { useCallback, useLayoutEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import '../../styles/transition.css'

const SKIP_TIME_SCALE = 5

function BookOpening({ cover, firstPage, seal, onReveal, onComplete }) {
  const rootRef = useRef(null)
  const timelineRef = useRef(null)
  const callbacksRef = useRef({ onReveal, onComplete })
  const shouldReduceMotion = useReducedMotion()

  callbacksRef.current = { onReveal, onComplete }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const bookEl = rootRef.current.querySelector('.book')
      // offsetWidth không bị ảnh hưởng bởi transform nên đo được kích thước gốc.
      const fillScale =
        Math.max(
          window.innerWidth / bookEl.offsetWidth,
          window.innerHeight / bookEl.offsetHeight,
        ) * 1.25

      const reveal = () => {
        gsap.set('.book-opening', { pointerEvents: 'none' })
        callbacksRef.current.onReveal?.()
      }
      const finish = () => callbacksRef.current.onComplete?.()

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      timelineRef.current = tl

      if (shouldReduceMotion) {
        tl.fromTo('.book-opening__veil', { opacity: 0 }, { opacity: 1, duration: 0.4 })
          .fromTo('.book', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.2)
          .to({}, { duration: 1.2 })
          .call(reveal)
          .to('.book-opening', { opacity: 0, duration: 0.6 })
          .call(finish)
        return
      }

      tl.fromTo('.book-opening__veil', { opacity: 0 }, { opacity: 1, duration: 0.55, ease: 'none' })
        .fromTo(
          '.book',
          { opacity: 0, scale: 0.86, y: 34 },
          { opacity: 1, scale: 1, y: 0, duration: 1 },
          0.3,
        )
        .fromTo(
          '.book__ribbon',
          { scaleY: 0 },
          { scaleY: 1, duration: 0.75, transformOrigin: 'top center' },
          0.8,
        )
        .fromTo(
          '.book__seal',
          { scale: 0, rotate: -28 },
          { scale: 1, rotate: 0, duration: 0.7, ease: 'back.out(2)' },
          1,
        )
        .fromTo(
          '.book__stamp',
          { opacity: 0, letterSpacing: '0.7em' },
          { opacity: 1, letterSpacing: '0.26em', duration: 0.9 },
          1.15,
        )
        .fromTo('.book__title', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 1.45)
        .fromTo('.book__footnote', { opacity: 0 }, { opacity: 1, duration: 0.7 }, 1.7)
        .to('.book-opening__aside', { opacity: 1, duration: 0.5 }, 1.9)

        .to('.book__seal', { scale: 0.55, opacity: 0, duration: 0.4, ease: 'power2.in' }, 2.5)
        .to('.book-opening__aside', { opacity: 0, duration: 0.35 }, 2.5)
        .to(
          '.book__cover',
          { rotateY: -168, duration: 1.3, ease: 'power2.inOut', transformPerspective: 1700 },
          2.6,
        )
        .to('.book__page-shade', { opacity: 0, duration: 1.2, ease: 'power1.out' }, 2.8)
        .fromTo(
          '.book__page-content',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.9 },
          3.2,
        )

        .to('.book', { scale: fillScale, duration: 1.2, ease: 'power2.in' }, 3.95)
        .to('.book__page-content', { opacity: 0, duration: 0.55 }, 4.05)
        .to('.book-opening__veil', { backgroundColor: '#efe6d4', duration: 0.9 }, 4.1)
        .call(reveal)
        .to('.book-opening', { opacity: 0, duration: 0.8, ease: 'power2.inOut' })
        .call(finish)
    }, rootRef)

    return () => ctx.revert()
  }, [shouldReduceMotion])

  const skip = useCallback(() => {
    const tl = timelineRef.current
    if (tl && tl.timeScale() < SKIP_TIME_SCALE) {
      tl.timeScale(SKIP_TIME_SCALE)
    }
  }, [])

  return (
    <div
      className="book-opening"
      ref={rootRef}
      onClick={skip}
      role="presentation"
      aria-label="Đang mở cuốn sổ"
    >
      <span className="book-opening__veil" aria-hidden="true" />

      <div className="book">
        <div className="book__page">
          <span className="book__page-lines" aria-hidden="true" />
          <div className="book__page-content">
            <p className="book__page-eyebrow">{firstPage.eyebrow}</p>
            <p className="book__page-line">{firstPage.line}</p>
          </div>
          <span className="book__page-shade" aria-hidden="true" />
        </div>

        <span className="book__edges" aria-hidden="true" />

        <div className="book__cover">
          <div className="book__face book__face--front">
            <span className="book__ribbon" aria-hidden="true" />
            <p className="book__eyebrow">{cover.eyebrow}</p>
            <p className="book__stamp">{cover.stamp}</p>
            <h2 className="book__title">{cover.title}</h2>
            <p className="book__footnote">{cover.footnote}</p>
            <span className="book__seal" aria-hidden="true">
              <span className="book__seal-mark">{seal.mark}</span>
            </span>
          </div>
          <div className="book__face book__face--back" aria-hidden="true" />
        </div>
      </div>

      <div className="book-opening__aside">
        <button type="button" className="book-opening__skip" onClick={skip}>
          {cover.skipLabel}
        </button>
      </div>
    </div>
  )
}

export default BookOpening
