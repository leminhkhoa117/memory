import { animate, motion as Motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import KeepsakeShape from './KeepsakeShape'

const SNAP_SPRING = { type: 'spring', stiffness: 340, damping: 26, mass: 0.7 }
const RETURN_TWEEN = { duration: 0.55, ease: [0.22, 1, 0.36, 1] }

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

function KeepsakeItem({
  item,
  metrics,
  target,
  tolerance,
  glowRange,
  isPlaced,
  isAbsorbing,
  isHinted,
  roundKey,
  boardRef,
  onPlace,
}) {
  const width = item.size.w * metrics.unit
  const height = item.size.h * metrics.unit

  const home = useMemo(() => {
    const halfW = width / 2
    const halfH = height / 2
    return {
      x: clamp(item.home.x * metrics.width, halfW + 8, Math.max(halfW + 8, metrics.width - halfW - 8)),
      y: clamp(item.home.y * metrics.height, halfH + 8, Math.max(halfH + 8, metrics.height - halfH - 8)),
    }
  }, [item.home.x, item.home.y, metrics.width, metrics.height, width, height])

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const homeRef = useRef(home)
  homeRef.current = home
  const targetRef = useRef(target)
  targetRef.current = target
  const placedRef = useRef(isPlaced)
  placedRef.current = isPlaced

  // Board đổi kích thước: đặt lại vật về chỗ cũ (hoặc về đúng đích nếu đã khoá).
  useEffect(() => {
    if (!metrics.width || !metrics.height) {
      return
    }

    if (placedRef.current && targetRef.current) {
      x.set(targetRef.current.x)
      y.set(targetRef.current.y)
      return
    }

    x.set(home.x)
    y.set(home.y)
  }, [home.x, home.y, metrics.width, metrics.height, x, y])

  // Sau mỗi lần khoá được một số, mọi kỷ vật trôi về lại mặt bàn.
  useEffect(() => {
    if (roundKey === 0) {
      return
    }
    animate(x, homeRef.current.x, RETURN_TWEEN)
    animate(y, homeRef.current.y, RETURN_TWEEN)
  }, [roundKey, x, y])

  const glow = useTransform([x, y], ([currentX, currentY]) => {
    const point = targetRef.current
    if (!point) {
      return 0
    }
    const distance = Math.hypot(currentX - point.x, currentY - point.y)
    if (distance >= glowRange) {
      return 0
    }
    if (distance <= tolerance) {
      return 1
    }
    return 1 - (distance - tolerance) / (glowRange - tolerance)
  })

  const handleDragEnd = () => {
    const point = targetRef.current
    if (!point || placedRef.current) {
      return
    }

    const distance = Math.hypot(x.get() - point.x, y.get() - point.y)
    if (distance > tolerance) {
      return
    }

    animate(x, point.x, SNAP_SPRING)
    animate(y, point.y, SNAP_SPRING)
    onPlace(item.id)
  }

  return (
    <Motion.div
      className={`keepsake${isPlaced ? ' keepsake--placed' : ''}${isHinted ? ' keepsake--hinted' : ''}`}
      style={{
        x,
        y,
        rotate: isPlaced ? 0 : item.tilt,
        width,
        height,
        marginLeft: -width / 2,
        marginTop: -height / 2,
      }}
      drag={!isPlaced}
      dragConstraints={boardRef}
      dragElastic={0.03}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.07, zIndex: 40 }}
      animate={{ opacity: isAbsorbing ? 0 : 1, scale: isAbsorbing ? 0.6 : 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      role="img"
      aria-label={item.label}
    >
      {target && !isPlaced && (
        <Motion.span className="keepsake__glow" style={{ opacity: glow }} aria-hidden="true" />
      )}
      <span className="keepsake__art" aria-hidden="true">
        <KeepsakeShape name={item.shape} />
      </span>
    </Motion.div>
  )
}

export default KeepsakeItem
