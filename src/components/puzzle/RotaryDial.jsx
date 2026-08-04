import { motion as Motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const HOLES = Array.from({ length: 10 }, (_, index) => ({
  index,
  digit: index === 9 ? '0' : String(index + 1),
  angle: 30 - index * 27,
}))

const STOP_ANGLE = 57
const RADIUS = 37
const FORWARD_MS = 400
const RETURN_MS = 520

const toPoint = (angle) => {
  const radians = (angle * Math.PI) / 180
  return {
    left: `${50 + RADIUS * Math.cos(radians)}%`,
    top: `${50 + RADIUS * Math.sin(radians)}%`,
  }
}

function RotaryDial({ label, helper, answer, onSolved, onTick, onError, onClose }) {
  const [entered, setEntered] = useState([])
  const [rotation, setRotation] = useState(0)
  const [isReturning, setIsReturning] = useState(false)
  const [isBusy, setIsBusy] = useState(false)
  const [hasError, setHasError] = useState(false)
  const timersRef = useRef([])

  useEffect(() => {
    const timers = timersRef.current
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [])

  const schedule = (callback, delay) => {
    timersRef.current.push(window.setTimeout(callback, delay))
  }

  const registerDigit = (digit) => {
    setEntered((previous) => {
      const next = [...previous, digit]

      if (next.length < answer.length) {
        return next
      }

      if (next.every((value, index) => value === answer[index])) {
        schedule(() => onSolved?.(), 260)
        return next
      }

      onError?.()
      setHasError(true)
      schedule(() => {
        setHasError(false)
        setEntered([])
      }, 700)

      return next
    })
  }

  const handleDial = (hole) => {
    if (isBusy || entered.length >= answer.length) {
      return
    }

    setIsBusy(true)
    setIsReturning(false)
    setRotation(STOP_ANGLE - hole.angle)
    onTick?.()

    schedule(() => {
      setIsReturning(true)
      setRotation(0)
    }, FORWARD_MS + 110)

    schedule(() => {
      registerDigit(hole.digit)
      setIsBusy(false)
    }, FORWARD_MS + 110 + RETURN_MS)
  }

  return (
    <Motion.div
      className="rotary"
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="rotary__head">
        <p className="rotary__label">{label}</p>
        <p className="rotary__helper">{helper}</p>
        <button type="button" className="rotary__close" onClick={onClose} aria-label="Đóng bàn quay số">
          <X size={18} strokeWidth={1.7} />
        </button>
      </div>

      <Motion.div
        className={`rotary__body${hasError ? ' rotary__body--error' : ''}`}
        animate={hasError ? { x: [0, -9, 8, -6, 0] } : { x: 0 }}
        transition={{ duration: 0.45 }}
      >
        <span className="rotary__stop" style={toPoint(STOP_ANGLE)} aria-hidden="true" />

        <Motion.div
          className="rotary__plate"
          animate={{ rotate: rotation }}
          transition={
            isReturning
              ? { duration: RETURN_MS / 1000, ease: [0.32, 0, 0.28, 1] }
              : { duration: FORWARD_MS / 1000, ease: [0.3, 0.9, 0.4, 1] }
          }
        >
          {HOLES.map((hole) => (
            <button
              key={hole.digit}
              type="button"
              className="rotary__hole"
              style={toPoint(hole.angle)}
              onClick={() => handleDial(hole)}
              disabled={isBusy}
              aria-label={`Quay số ${hole.digit}`}
            >
              {hole.digit}
            </button>
          ))}
        </Motion.div>

        <span className="rotary__hub" aria-hidden="true" />
      </Motion.div>

      <div className="rotary__readout" aria-live="polite">
        {Array.from({ length: answer.length }, (_, index) => (
          <span key={index} className={entered[index] ? 'is-set' : ''}>
            {entered[index] ?? '·'}
          </span>
        ))}
      </div>
    </Motion.div>
  )
}

export default RotaryDial
