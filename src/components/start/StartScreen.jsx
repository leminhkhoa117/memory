import { motion as Motion } from 'framer-motion'
import { useState } from 'react'
import ParticleField from '../ParticleField'
import '../../styles/start.css'

const EASE = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
}

function StartScreen({ content, onStart }) {
  const [isLeaving, setIsLeaving] = useState(false)

  const handleStart = () => {
    if (isLeaving) {
      return
    }
    setIsLeaving(true)
    onStart()
  }

  return (
    <Motion.section
      className="start"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLeaving ? 0 : 1, scale: isLeaving ? 1.08 : 1 }}
      transition={{ duration: isLeaving ? 0.9 : 0.8, ease: EASE }}
      style={{ pointerEvents: isLeaving ? 'none' : 'auto' }}
      aria-label="Giới thiệu trò chơi"
    >
      <ParticleField id="start-particles" variant="archive" />
      <span className="start__lamp" aria-hidden="true" />

      <Motion.div
        className="start__inner"
        variants={container}
        initial="hidden"
        animate={isLeaving ? 'hidden' : 'visible'}
      >
        <Motion.p className="start__eyebrow" variants={item}>
          {content.eyebrow}
        </Motion.p>

        <Motion.h1 className="start__title" variants={item}>
          {content.title}
        </Motion.h1>

        <div className="start__lines">
          {content.lines.map((line) => (
            <Motion.p className="start__line" key={line} variants={item}>
              {line}
            </Motion.p>
          ))}
        </div>

        <Motion.span className="start__rule" variants={item} aria-hidden="true" />

        <ol className="start__steps">
          {content.steps.map((step) => (
            <Motion.li className="start__step" key={step.index} variants={item}>
              <span className="start__step-index">{step.index}</span>
              <span className="start__step-text">{step.text}</span>
            </Motion.li>
          ))}
        </ol>

        <Motion.div className="start__action" variants={item}>
          <button type="button" className="start__cta" onClick={handleStart}>
            {content.cta}
            <span className="start__cta-pulse" aria-hidden="true" />
          </button>
          <p className="start__note">{content.note}</p>
        </Motion.div>
      </Motion.div>

      {/* Vệt sáng quét ngang lúc rời màn hình, như bụi bay lên khi mở hộp cũ. */}
      <Motion.span
        className="start__sweep"
        aria-hidden="true"
        initial={{ opacity: 0, scaleY: 0.2 }}
        animate={isLeaving ? { opacity: [0, 0.55, 0], scaleY: [0.2, 1, 1.6] } : {}}
        transition={{ duration: 0.95, ease: 'easeOut' }}
      />
    </Motion.section>
  )
}

export default StartScreen
