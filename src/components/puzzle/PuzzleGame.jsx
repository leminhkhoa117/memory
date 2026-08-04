import { AnimatePresence, motion as Motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import puzzleContent from '../../data/puzzleContent'
import { DIGITS, KEEPSAKES, KEEPSAKE_MAP, STAGE } from '../../data/keepsakes'
import { usePuzzleEngine } from '../../hooks/usePuzzleEngine'
import { usePuzzleSound } from '../../hooks/usePuzzleSound'
import ParticleField from '../ParticleField'
import KeepsakeItem from './KeepsakeItem'
import KeepsakeShape from './KeepsakeShape'
import DigitGlyph from './DigitGlyph'
import DigitTray from './DigitTray'
import HintButton from './HintButton'
import RotaryDial from './RotaryDial'
import SuccessOverlay from './SuccessOverlay'
import '../../styles/puzzle.css'

const HINT_DURATION = 2800
const IDLE_HINT_DELAY = 26000

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const computeUnit = (width, height) => {
  if (!width || !height) {
    return 1
  }
  return clamp(Math.min(width / STAGE.width, height / STAGE.height), 0.55, 1)
}

function PuzzleGame({ onComplete }) {
  const boardRef = useRef(null)
  const [metrics, setMetrics] = useState({ width: 0, height: 0, unit: 1 })
  const [hintItemId, setHintItemId] = useState(null)
  const [isLeaving, setIsLeaving] = useState(false)
  const hintTimerRef = useRef(null)

  const sound = usePuzzleSound()
  const engine = usePuzzleEngine(DIGITS, {
    onSnap: sound.playSnap,
    onLock: sound.playLock,
    onAllFound: sound.playReveal,
  })

  useEffect(() => {
    const node = boardRef.current
    if (!node) {
      return undefined
    }

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setMetrics({ width, height, unit: computeUnit(width, height) })
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => () => window.clearTimeout(hintTimerRef.current), [])

  const isCoarsePointer = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
    [],
  )

  const tolerance = Math.max(46, 64 * metrics.unit * (isCoarsePointer ? 1.4 : 1))
  const glowRange = tolerance * 2.8

  const { activeDigit } = engine

  // Neo của số được kéo vào trong lòng board để cả cụm không bao giờ tràn ra ngoài.
  const anchor = useMemo(() => {
    if (!activeDigit || !metrics.width) {
      return null
    }

    let halfWidth = 0
    let halfHeight = 0

    activeDigit.parts.forEach((part) => {
      const item = KEEPSAKE_MAP[part.itemId]
      halfWidth = Math.max(halfWidth, Math.abs(part.offset.x) + item.size.w / 2)
      halfHeight = Math.max(halfHeight, Math.abs(part.offset.y) + item.size.h / 2)
    })

    halfWidth *= metrics.unit
    halfHeight *= metrics.unit

    return {
      x: clamp(
        activeDigit.anchor.x * metrics.width,
        halfWidth + 12,
        Math.max(halfWidth + 12, metrics.width - halfWidth - 12),
      ),
      y: clamp(
        activeDigit.anchor.y * metrics.height,
        halfHeight + 12,
        Math.max(halfHeight + 12, metrics.height - halfHeight - 12),
      ),
    }
  }, [activeDigit, metrics.width, metrics.height, metrics.unit])

  const targets = useMemo(() => {
    if (!activeDigit || !anchor) {
      return {}
    }

    return activeDigit.parts.reduce((acc, part) => {
      acc[part.itemId] = {
        x: anchor.x + part.offset.x * metrics.unit,
        y: anchor.y + part.offset.y * metrics.unit,
      }
      return acc
    }, {})
  }, [activeDigit, anchor, metrics.unit])

  const revealHint = useCallback(() => {
    const itemId = engine.nextHintItemId
    if (!itemId) {
      return
    }

    window.clearTimeout(hintTimerRef.current)
    setHintItemId(itemId)
    sound.playTick()
    hintTimerRef.current = window.setTimeout(() => setHintItemId(null), HINT_DURATION)
  }, [engine.nextHintItemId, sound])

  // Nếu người chơi loay hoay quá lâu thì tự nhắc một lần cho đỡ bí.
  useEffect(() => {
    if (engine.phase !== 'assembling') {
      return undefined
    }

    const timer = window.setTimeout(revealHint, IDLE_HINT_DELAY)
    return () => window.clearTimeout(timer)
  }, [engine.phase, engine.activeIndex, engine.placedIds.length, revealHint])

  const hintTarget = hintItemId ? targets[hintItemId] : null
  const hintItem = hintItemId ? KEEPSAKE_MAP[hintItemId] : null
  const isLocking = engine.absorbing.length > 0

  return (
    <Motion.section
      className="puzzle"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLeaving ? 0 : 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: isLeaving ? 'none' : 'auto' }}
      aria-label="Minigame ghép kỷ vật"
    >
      <ParticleField id="puzzle-particles" variant="archive" />

      <div className="puzzle__inner">
        <header className="puzzle__header">
          <p className="puzzle__eyebrow">{puzzleContent.eyebrow}</p>
          <h1 className="puzzle__title">{puzzleContent.title}</h1>
          <p className="puzzle__hint-line">{puzzleContent.hint}</p>
        </header>

        <div
          className={`puzzle__board${engine.phase === 'assembling' ? '' : ' puzzle__board--dim'}`}
          ref={boardRef}
        >
          {activeDigit && anchor && (
            <DigitGlyph
              value={activeDigit.value}
              position={anchor}
              unit={metrics.unit}
              progress={engine.placedIds.length / activeDigit.parts.length}
              isLocking={isLocking}
            />
          )}

          <AnimatePresence>
            {hintTarget && hintItem && (
              <Motion.span
                className="keepsake-ghost"
                style={{
                  left: hintTarget.x,
                  top: hintTarget.y,
                  width: hintItem.size.w * metrics.unit,
                  height: hintItem.size.h * metrics.unit,
                  marginLeft: (-hintItem.size.w * metrics.unit) / 2,
                  marginTop: (-hintItem.size.h * metrics.unit) / 2,
                }}
                initial={{ opacity: 0, scale: 1.25 }}
                animate={{ opacity: 0.45, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                aria-hidden="true"
              >
                <KeepsakeShape name={hintItem.shape} />
              </Motion.span>
            )}
          </AnimatePresence>

          {metrics.width > 0 &&
            KEEPSAKES.map((item) => (
              <KeepsakeItem
                key={item.id}
                item={item}
                metrics={metrics}
                target={engine.phase === 'assembling' ? targets[item.id] ?? null : null}
                tolerance={tolerance}
                glowRange={glowRange}
                isPlaced={engine.placedIds.includes(item.id)}
                isAbsorbing={engine.absorbing.includes(item.id)}
                isHinted={hintItemId === item.id}
                roundKey={engine.roundKey}
                boardRef={boardRef}
                onPlace={engine.placePart}
              />
            ))}
        </div>

        <div className="puzzle__footer">
          <DigitTray
            label={puzzleContent.trayLabel}
            total={DIGITS.length}
            revealed={engine.revealed}
          />
        </div>
      </div>

      {engine.phase === 'assembling' && (
        <HintButton label={puzzleContent.hintButtonLabel} onClick={revealHint} />
      )}

      <AnimatePresence>
        {engine.phase === 'dial' && (
          <Motion.div
            className="rotary-layer"
            key="dial"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <RotaryDial
              label={puzzleContent.dialLabel}
              helper={puzzleContent.dialHelper}
              answer={puzzleContent.answer}
              onTick={sound.playTick}
              onError={sound.playError}
              onSolved={() => {
                sound.playReveal()
                engine.completeDial()
              }}
            />
          </Motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {engine.phase === 'success' && (
          <SuccessOverlay
            key="success"
            title={puzzleContent.successTitle}
            line={puzzleContent.successLine}
            cta={puzzleContent.cta}
            onContinue={() => {
              setIsLeaving(true)
              onComplete()
            }}
          />
        )}
      </AnimatePresence>
    </Motion.section>
  )
}

export default PuzzleGame
