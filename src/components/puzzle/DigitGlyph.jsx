import { motion as Motion } from 'framer-motion'

function DigitGlyph({ value, position, unit, progress, isLocking }) {
  return (
    <Motion.span
      className={`digit-glyph${isLocking ? ' digit-glyph--locking' : ''}`}
      style={{
        left: position.x,
        top: position.y,
        x: '-50%',
        y: '-50%',
        fontSize: 190 * unit,
      }}
      animate={{
        opacity: isLocking ? 1 : 0.05 + progress * 0.2,
        scale: isLocking ? 1.06 : 1,
      }}
      transition={{ duration: isLocking ? 0.5 : 0.35, ease: 'easeOut' }}
      aria-hidden="true"
    >
      {value}
    </Motion.span>
  )
}

export default DigitGlyph
