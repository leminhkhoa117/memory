import { AnimatePresence, motion as Motion } from 'framer-motion'

function DigitTray({ label, total, revealed }) {
  const slots = Array.from({ length: total }, (_, index) => revealed[index] ?? null)

  return (
    <div className="digit-tray">
      <span className="digit-tray__label">{label}</span>
      <div className="digit-tray__slots">
        {slots.map((value, index) => (
          <div
            key={index}
            className={`digit-slot${value ? ' digit-slot--filled' : ''}${
              !value && index === revealed.length ? ' digit-slot--next' : ''
            }`}
          >
            <AnimatePresence mode="wait">
              {value ? (
                <Motion.span
                  key="value"
                  initial={{ opacity: 0, scale: 0.5, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {value}
                </Motion.span>
              ) : (
                <Motion.span key="empty" className="digit-slot__empty" exit={{ opacity: 0 }}>
                  ·
                </Motion.span>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DigitTray
