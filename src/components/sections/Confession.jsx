import { motion as Motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useSequentialTypewriter } from '../../hooks/useSequentialTypewriter'
import ParticleField from '../ParticleField'

const lineVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 80, damping: 16, mass: 0.9 },
  },
}

function Confession({ content }) {
  const isDraggingRef = useRef(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isLetterAboveEnvelope, setIsLetterAboveEnvelope] = useState(false)
  const [isCompactViewport, setIsCompactViewport] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches,
  )
  const [isShortViewport, setIsShortViewport] = useState(
    () => typeof window !== 'undefined'
      && window.matchMedia('(max-height: 560px) and (min-width: 601px)').matches,
  )
  const shouldReduceMotion = useReducedMotion()
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const springX = useSpring(tiltX, { stiffness: 180, damping: 22, mass: 0.7 })
  const springY = useSpring(tiltY, { stiffness: 180, damping: 22, mass: 0.7 })
  const { typedLines, activeLineIndex, isComplete } = useSequentialTypewriter(
    content.lines,
    isOpen,
    {
      startDelay: isCompactViewport ? 1700 : 2400,
      characterDelay: isCompactViewport ? 18 : 27,
      linePause: isCompactViewport ? 600 : 900,
      reducedMotion: shouldReduceMotion,
    },
  )
  const closedScaleX = isCompactViewport ? 0.94 : 0.64
  const closedScaleY = isCompactViewport ? 0.34 : 0.64

  useEffect(() => {
    const compactQuery = window.matchMedia('(max-width: 600px)')
    const shortQuery = window.matchMedia('(max-height: 560px) and (min-width: 601px)')
    const updateViewport = () => {
      setIsCompactViewport(compactQuery.matches)
      setIsShortViewport(shortQuery.matches)
    }

    compactQuery.addEventListener('change', updateViewport)
    shortQuery.addEventListener('change', updateViewport)
    return () => {
      compactQuery.removeEventListener('change', updateViewport)
      shortQuery.removeEventListener('change', updateViewport)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setIsLetterAboveEnvelope(false)
      return undefined
    }

    if (shouldReduceMotion) {
      setIsLetterAboveEnvelope(true)
      return undefined
    }

    const timeout = window.setTimeout(() => setIsLetterAboveEnvelope(true), 1220)
    return () => window.clearTimeout(timeout)
  }, [isOpen, shouldReduceMotion])

  const openLetter = () => {
    setIsOpen(true)
  }

  const updateTilt = (event) => {
    if (!isDraggingRef.current || shouldReduceMotion) {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5
    const maxTilt = isCompactViewport ? 4 : 7

    tiltX.set(normalizedY * maxTilt * -2)
    tiltY.set(normalizedX * maxTilt * 2)
  }

  const stopTilt = (event) => {
    isDraggingRef.current = false
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    tiltX.set(0)
    tiltY.set(0)
  }

  const handlePointerDown = (event) => {
    if (!isOpen) {
      openLetter()
      return
    }

    if (shouldReduceMotion) {
      return
    }

    isDraggingRef.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    updateTilt(event)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openLetter()
    }
  }

  return (
    <section className="confession story-section" id="loi-to-tinh">
      <div className="confession__light" aria-hidden="true" />
      <ParticleField id="confession-particles" intense />
      <div className="confession__content content-frame">
        <div className="letter-experience">
          <Motion.div
            className={`letter-stage ${isOpen ? 'letter-stage--open' : ''} ${isLetterAboveEnvelope ? 'letter-stage--letter-above' : ''}`}
            role={isOpen ? 'group' : 'button'}
            tabIndex={isOpen ? -1 : 0}
            aria-label={isOpen ? 'Lá thư đã mở' : 'Mở lá thư'}
            initial={{ opacity: 0, y: 35, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.42 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: 'easeOut' }}
            onClick={openLetter}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={updateTilt}
            onPointerUp={stopTilt}
            onPointerCancel={stopTilt}
            onPointerLeave={(event) => isDraggingRef.current && stopTilt(event)}
          >
            <div className="envelope envelope--back" aria-hidden="true">
              <div className="envelope__back">
                <span className="envelope__stamp">♡</span>
                <i className="envelope__address-line envelope__address-line--one" />
                <i className="envelope__address-line envelope__address-line--two" />
              </div>
            </div>

            <div className="envelope envelope--flap" aria-hidden="true">
              <Motion.div
                className="envelope__flap"
                animate={{ rotateX: isOpen ? 180 : 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <Motion.article
              className={`confession-letter ${isLetterAboveEnvelope ? 'confession-letter--above-envelope' : ''}`}
              style={{ rotateX: springX, rotateY: springY }}
              animate={{
                y: isOpen
                  ? [
                      '4%',
                      isCompactViewport ? '-32%' : isShortViewport ? '-85%' : '-65%',
                      isCompactViewport ? '-1.8%' : isShortViewport ? '-2.2%' : '2.4%',
                    ]
                  : '4%',
                scaleX: isOpen
                  ? [closedScaleX, isCompactViewport ? 0.94 : 0.68, isCompactViewport ? 1.04 : 1]
                  : closedScaleX,
                scaleY: isOpen ? [closedScaleY, closedScaleY, 1] : closedScaleY,
              }}
              transition={{
                delay: isOpen && !shouldReduceMotion ? 0.52 : 0,
                duration: shouldReduceMotion ? 0 : 1.45,
                times: [0, 0.48, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Motion.div className="confession-letter__paper">
                <Motion.p
                  className="story-note confession__note"
                  variants={lineVariants}
                  initial={shouldReduceMotion ? false : 'hidden'}
                  animate={isOpen ? 'visible' : 'hidden'}
                  transition={{ delay: shouldReduceMotion ? 0 : 1 }}
                >
                  <span aria-hidden="true">♡</span>{content.chapter}
                </Motion.p>
                {content.lines.map((line, index) => (
                  <p
                    className={`confession__line confession__line--${index + 1}`}
                    key={line}
                    aria-label={line}
                  >
                    <span className="confession__line-ghost" aria-hidden="true">{line}</span>
                    <span className="confession__line-typed" aria-hidden="true">
                      {typedLines[index]}
                      {activeLineIndex === index && (
                        <span className="confession__cursor" aria-hidden="true" />
                      )}
                    </span>
                  </p>
                ))}
                <Motion.p
                  className="confession__closing"
                  variants={lineVariants}
                  initial={shouldReduceMotion ? false : 'hidden'}
                  animate={isComplete ? 'visible' : 'hidden'}
                >
                  {content.closing}
                </Motion.p>
              </Motion.div>
            </Motion.article>

            <div className="envelope envelope--front" aria-hidden="true">
              <Motion.div
                className="letter-invitation"
                initial={false}
                animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? -12 : 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
              >
                <p>Những gì anh cần nói đều gói gọn ở đây, hãy bấm vào để mở thư nhé</p>
                <ArrowDown size={23} strokeWidth={1.4} />
              </Motion.div>
              <div className="envelope__pocket" />
            </div>

            <div className="envelope envelope--seal" aria-hidden="true">
              <span className="envelope__seal">♡</span>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  )
}

export default Confession