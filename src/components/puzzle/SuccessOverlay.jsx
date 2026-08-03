import { motion as Motion } from 'framer-motion'

function SuccessOverlay({ title, line, cta, onContinue }) {
  return (
    <Motion.div
      className="puzzle-success"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Motion.span
        className="puzzle-success__burst"
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: [0, 0.85, 0.28], scale: [0.3, 1.6, 2.2] }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        aria-hidden="true"
      />

      <Motion.h2
        className="puzzle-success__title"
        initial={{ opacity: 0, y: 24, letterSpacing: '0.6em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.22em' }}
        transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </Motion.h2>

      <Motion.p
        className="puzzle-success__line"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.1 }}
      >
        {line}
      </Motion.p>

      <Motion.button
        type="button"
        className="puzzle-success__cta"
        onClick={onContinue}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.9 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="puzzle-success__cta-pulse" aria-hidden="true" />
        {cta}
      </Motion.button>
    </Motion.div>
  )
}

export default SuccessOverlay
