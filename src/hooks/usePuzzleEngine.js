import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const LOCK_DELAY = 760
const DIAL_DELAY = 520

// Người chơi ghép lần lượt từng số. Chỉ số đang hoạt động mới có vị trí đích,
// nhờ vậy một vật kỷ niệm có thể được dùng lại ở nhiều số khác nhau.
export function usePuzzleEngine(digits, { onSnap, onLock, onAllFound } = {}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [placedIds, setPlacedIds] = useState([])
  const [revealed, setRevealed] = useState([])
  const [absorbing, setAbsorbing] = useState([])
  const [roundKey, setRoundKey] = useState(0)
  const [phase, setPhase] = useState('assembling')

  const callbacks = useRef({ onSnap, onLock, onAllFound })
  callbacks.current = { onSnap, onLock, onAllFound }

  const activeDigit = activeIndex < digits.length ? digits[activeIndex] : null

  const placePart = useCallback(
    (itemId) => {
      let accepted = false

      setPlacedIds((prev) => {
        if (prev.includes(itemId)) {
          return prev
        }
        accepted = true
        return [...prev, itemId]
      })

      if (accepted) {
        callbacks.current.onSnap?.()
      }

      return accepted
    },
    [],
  )

  useEffect(() => {
    if (!activeDigit || placedIds.length < activeDigit.parts.length) {
      return undefined
    }

    callbacks.current.onLock?.()
    setAbsorbing(activeDigit.parts.map((part) => part.itemId))

    const timer = window.setTimeout(() => {
      setRevealed((prev) => [...prev, activeDigit.value])
      setPlacedIds([])
      setAbsorbing([])
      setRoundKey((key) => key + 1)
      setActiveIndex((index) => index + 1)
    }, LOCK_DELAY)

    return () => window.clearTimeout(timer)
  }, [activeDigit, placedIds])

  useEffect(() => {
    if (activeIndex < digits.length || phase !== 'assembling') {
      return undefined
    }

    const timer = window.setTimeout(() => {
      setPhase('dial')
      callbacks.current.onAllFound?.()
    }, DIAL_DELAY)

    return () => window.clearTimeout(timer)
  }, [activeIndex, digits.length, phase])

  const nextHintItemId = useMemo(() => {
    if (!activeDigit) {
      return null
    }
    return activeDigit.parts.find((part) => !placedIds.includes(part.itemId))?.itemId ?? null
  }, [activeDigit, placedIds])

  const completeDial = useCallback(() => setPhase('success'), [])

  return {
    phase,
    activeDigit,
    activeIndex,
    placedIds,
    absorbing,
    revealed,
    roundKey,
    nextHintItemId,
    placePart,
    completeDial,
  }
}

export default usePuzzleEngine
