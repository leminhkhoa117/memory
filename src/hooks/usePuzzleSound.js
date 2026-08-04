import { useCallback, useEffect, useRef } from 'react'

// Âm thanh sinh bằng WebAudio để không phải tải thêm file nào.
export function usePuzzleSound() {
  const contextRef = useRef(null)

  useEffect(() => {
    return () => {
      contextRef.current?.close?.()
      contextRef.current = null
    }
  }, [])

  const getContext = useCallback(() => {
    if (!contextRef.current) {
      const AudioCtx = window.AudioContext ?? window.webkitAudioContext
      if (!AudioCtx) {
        return null
      }
      contextRef.current = new AudioCtx()
    }

    contextRef.current.resume?.()
    return contextRef.current
  }, [])

  const tone = useCallback(
    ({ frequency, duration, type = 'sine', gain = 0.08, sweepTo }) => {
      const ctx = getContext()
      if (!ctx) {
        return
      }

      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const amp = ctx.createGain()

      osc.type = type
      osc.frequency.setValueAtTime(frequency, now)
      if (sweepTo) {
        osc.frequency.exponentialRampToValueAtTime(sweepTo, now + duration)
      }

      amp.gain.setValueAtTime(0.0001, now)
      amp.gain.exponentialRampToValueAtTime(gain, now + 0.012)
      amp.gain.exponentialRampToValueAtTime(0.0001, now + duration)

      osc.connect(amp).connect(ctx.destination)
      osc.start(now)
      osc.stop(now + duration + 0.02)
    },
    [getContext],
  )

  const playSnap = useCallback(() => {
    tone({ frequency: 880, sweepTo: 520, duration: 0.12, type: 'triangle', gain: 0.05 })
  }, [tone])

  const playLock = useCallback(() => {
    tone({ frequency: 523.25, duration: 0.42, type: 'sine', gain: 0.07 })
    window.setTimeout(() => tone({ frequency: 783.99, duration: 0.5, type: 'sine', gain: 0.05 }), 90)
  }, [tone])

  const playTick = useCallback(() => {
    tone({ frequency: 1400, sweepTo: 900, duration: 0.05, type: 'square', gain: 0.02 })
  }, [tone])

  const playError = useCallback(() => {
    tone({ frequency: 220, sweepTo: 140, duration: 0.3, type: 'sawtooth', gain: 0.035 })
  }, [tone])

  const playReveal = useCallback(() => {
    const notes = [523.25, 659.25, 783.99, 1046.5]
    notes.forEach((frequency, index) => {
      window.setTimeout(
        () => tone({ frequency, duration: 0.7, type: 'sine', gain: 0.06 }),
        index * 130,
      )
    })
  }, [tone])

  return { playSnap, playLock, playTick, playError, playReveal }
}

export default usePuzzleSound
