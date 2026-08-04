import { motion as Motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useSequentialTypewriter } from '../../hooks/useSequentialTypewriter'
import WaxSeal from './WaxSeal'

const EASE = [0.22, 1, 0.36, 1]

/** Kích thước phong thư khi đã được cầm lên, dùng để tính bước nhảy từ vị trí trong sổ. */
const TARGET_WIDTH = 360

/** Lá thư trồi lên rồi mới bung ra: các mốc thời gian dưới đây phải khớp nhau. */
const SHEET_DELAY = 0.45
const SHEET_DURATION = 2
const SHEET_TIMES = [0, 0.32, 0.45, 1]
const ENVELOPE_FADE_DELAY = 1.35
const TYPING_DELAY = 2700

function LetterOverlay({ content, origin, onClose }) {
  const [isOpen, setIsOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const { typedLines, activeLineIndex, isComplete } = useSequentialTypewriter(
    content.lines,
    isOpen,
    {
      startDelay: TYPING_DELAY,
      characterDelay: 26,
      linePause: 800,
      reducedMotion: shouldReduceMotion,
    },
  )

  // Bắt đầu đúng chỗ phong thư nằm trong sổ rồi mới bay ra giữa màn hình.
  const from = useMemo(() => {
    if (!origin) {
      return { x: 0, y: 0, scale: 0.4 }
    }

    const width = Math.min(TARGET_WIDTH, window.innerWidth * 0.78)
    return {
      x: origin.left + origin.width / 2 - window.innerWidth / 2,
      y: origin.top + origin.height / 2 - window.innerHeight / 2,
      scale: origin.width / width,
    }
  }, [origin])

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Phong bì được tách hai lớp để tờ thư trồi lên nằm lọt giữa lòng và mặt trước.
  const envelopeMotion = {
    initial: shouldReduceMotion ? false : { ...from, opacity: 0.7, rotateZ: -6 },
    animate: {
      x: 0,
      y: isOpen ? 40 : 0,
      scale: isOpen ? 0.96 : 1,
      opacity: isOpen ? 0 : 1,
      rotateZ: 0,
    },
    transition: {
      duration: shouldReduceMotion ? 0 : isOpen ? 0.75 : 0.85,
      ease: EASE,
      delay: isOpen && !shouldReduceMotion ? ENVELOPE_FADE_DELAY : 0,
    },
  }

  return (
    <Motion.div
      className="letter-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
    >
      <span className="letter-overlay__backdrop" aria-hidden="true" />

      <button type="button" className="letter-overlay__close" onClick={onClose} aria-label="Đóng lá thư">
        <X size={20} strokeWidth={1.6} />
      </button>

      <Motion.div className="letter-item letter-item--back" aria-hidden="true" {...envelopeMotion}>
        <span className="letter-envelope__back" />
        <span className="letter-envelope__lining" />
      </Motion.div>

      {/* Tờ thư nằm sẵn trong lòng phong bì, trồi lên rồi mới mở ra trước màn hình. */}
      <Motion.article
        className="letter-sheet"
        initial={false}
        animate={{
          x: '-50%',
          y: isOpen ? ['0%', '-20%', '-20%', '-50%'] : '0%',
          scaleX: isOpen ? [0.7, 0.7, 0.7, 1] : 0.7,
          scaleY: isOpen ? [0.18, 0.18, 0.18, 1] : 0.18,
          opacity: isOpen ? [0, 1, 1, 1] : 0,
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : SHEET_DURATION,
          times: SHEET_TIMES,
          ease: [EASE, EASE, EASE],
          delay: isOpen && !shouldReduceMotion ? SHEET_DELAY : 0,
        }}
      >
        <p className="letter-sheet__chapter">{content.chapter}</p>

        {content.lines.map((line, index) => (
          <p className="letter-sheet__line" key={line} aria-label={line}>
            <span className="letter-sheet__ghost" aria-hidden="true">
              {line}
            </span>
            <span className="letter-sheet__typed" aria-hidden="true">
              {typedLines[index]}
              {activeLineIndex === index && <span className="letter-sheet__cursor" />}
            </span>
          </p>
        ))}

        <Motion.p
          className="letter-sheet__closing"
          initial={false}
          animate={{ opacity: isComplete ? 1 : 0, y: isComplete ? 0 : 10 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
        >
          {content.closing}
        </Motion.p>
      </Motion.article>

      <Motion.div
        className="letter-item letter-item--front"
        style={{ pointerEvents: isOpen ? 'none' : 'auto' }}
        {...envelopeMotion}
      >
        <Motion.span
          className="letter-envelope__flap"
          aria-hidden="true"
          initial={false}
          animate={{ rotateX: isOpen ? 172 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.75, ease: EASE }}
        />

        <button
          type="button"
          className="letter-envelope"
          onClick={() => setIsOpen(true)}
          disabled={isOpen}
          aria-label={isOpen ? 'Lá thư đã mở' : 'Mở lá thư'}
        >
          <span className="letter-envelope__pocket" aria-hidden="true" />

          <Motion.span
            className="letter-envelope__seal-holder"
            initial={false}
            animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.7 : 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
          >
            <WaxSeal className="letter-envelope__seal" />
          </Motion.span>
        </button>

        <Motion.p
          className="letter-item__hint"
          initial={false}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.4, delay: isOpen ? 0 : 0.7 }}
        >
          Chạm vào phong thư để mở
        </Motion.p>
      </Motion.div>
    </Motion.div>
  )
}

export default LetterOverlay
