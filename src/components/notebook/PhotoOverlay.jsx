import { motion as Motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const TARGET_WIDTH = 760

function PhotoOverlay({ photo, onClose }) {
  const shouldReduceMotion = useReducedMotion()

  const from = useMemo(() => {
    const width = Math.min(TARGET_WIDTH, window.innerWidth * 0.9)
    return {
      x: photo.origin.left + photo.origin.width / 2 - window.innerWidth / 2,
      y: photo.origin.top + photo.origin.height / 2 - window.innerHeight / 2,
      scale: photo.origin.width / width,
    }
  }, [photo.origin])

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <Motion.div
      className="photo-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
    >
      <button
        type="button"
        className="photo-overlay__backdrop"
        onClick={onClose}
        aria-label="Đóng ảnh"
      />

      <button type="button" className="photo-overlay__close" onClick={onClose} aria-label="Đóng ảnh">
        <X size={20} strokeWidth={1.6} />
      </button>

      <Motion.figure
        className="photo-overlay__figure"
        initial={shouldReduceMotion ? false : { ...from, opacity: 0.45 }}
        animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { ...from, opacity: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={photo.image} alt={photo.alt} decoding="async" />
        {photo.caption && <figcaption>{photo.caption}</figcaption>}
      </Motion.figure>
    </Motion.div>
  )
}

export default PhotoOverlay