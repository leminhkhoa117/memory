import { motion as Motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import PageContent from './PageContent'
import WaxSeal from './WaxSeal'

const FLIP_DURATION = 720
const SWIPE_THRESHOLD = 46
const RING_COUNT = 11

/** Sổ tay lật từ dưới lên: mỗi tờ xoay quanh mép trên, đúng kiểu sổ lò xo cầm tay. */
function NotepadFlip({ pages, cover, index, onChange, onOpenLetter }) {
  const [flippingIndex, setFlippingIndex] = useState(null)
  const shouldReduceMotion = useReducedMotion()
  const startRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const go = useCallback(
    (next) => {
      if (next < 0 || next >= pages.length || next === index) {
        return
      }

      setFlippingIndex(Math.min(index, next))
      onChange(next)
      window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => setFlippingIndex(null), FLIP_DURATION)
    },
    [index, onChange, pages.length],
  )

  const handlePointerDown = (event) => {
    startRef.current = { y: event.clientY, x: event.clientX }
  }

  const handlePointerUp = (event) => {
    const start = startRef.current
    startRef.current = null
    if (!start) {
      return
    }

    const deltaY = event.clientY - start.y
    if (Math.abs(deltaY) < SWIPE_THRESHOLD || Math.abs(event.clientX - start.x) > 90) {
      return
    }

    go(deltaY < 0 ? index + 1 : index - 1)
  }

  return (
    <div className="pad" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
      <span className="pad__board" aria-hidden="true" />

      <div className="pad__stage">
        {pages.map((page, pageIndex) => {
          const isFlipped = pageIndex < index
          const isNear = Math.abs(pageIndex - index) <= 1

          return (
            <Motion.div
              key={page.id}
              className={`pad-sheet${page.kind === 'cover' ? ' pad-sheet--cover' : ''}`}
              style={{
                display: isNear ? 'flex' : 'none',
                zIndex: pageIndex === flippingIndex ? 900 : isFlipped ? 500 + pageIndex : 400 - pageIndex,
              }}
              initial={false}
              animate={{ rotateX: isFlipped ? 168 : 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : FLIP_DURATION / 1000,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              {page.kind === 'cover' ? (
                <div className="pad-cover">
                  <span className="nb-cover__ribbon" aria-hidden="true" />
                  <p className="nb-cover__eyebrow">{cover.eyebrow}</p>
                  <p className="nb-cover__stamp">{cover.stamp}</p>
                  <h2 className="nb-cover__title">{cover.title}</h2>
                  <WaxSeal className="nb-cover__seal" />
                </div>
              ) : (
                <>
                  <div className={`nb-paper__body nb-paper__body--${page.kind}`}>
                    <PageContent
                      page={page}
                      isActive={pageIndex === index}
                      onOpenLetter={onOpenLetter}
                    />
                  </div>

                  <span className="nb-paper__number">{String(pageIndex).padStart(2, '0')}</span>
                </>
              )}
            </Motion.div>
          )
        })}
      </div>

      <span className="pad__rings" aria-hidden="true">
        {Array.from({ length: RING_COUNT }, (_, ring) => (
          <i key={ring} className="pad__ring" />
        ))}
      </span>
    </div>
  )
}

export default NotepadFlip
