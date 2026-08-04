import { motion as Motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'

function HintButton({ label, onClick, disabled }) {
  return (
    <Motion.button
      type="button"
      className="hint-button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.93 }}
    >
      <Lightbulb size={18} aria-hidden="true" />
      <span className="hint-button__text">{label}</span>
    </Motion.button>
  )
}

export default HintButton
