import { motion as Motion } from 'framer-motion'
import { Music2, VolumeX } from 'lucide-react'
import { Howl } from 'howler'
import { useEffect, useRef, useState } from 'react'

function MusicToggle({ content, autoPlay = false }) {
  const soundRef = useRef(null)
  const soundIdRef = useRef(null)
  const isStartingRef = useRef(false)
  // Luôn khởi tạo false — autoPlay sẽ được xử lý riêng qua gesture listener.
  const wantsMusicRef = useRef(false)
  const pauseTimeoutRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const sound = new Howl({
      src: [content.src],
      html5: true,
      loop: true,
      preload: false,
      volume: 0,
      onplay: (id) => {
        isStartingRef.current = false
        soundIdRef.current = id
        sound.fade(sound.volume(id), 0.42, 900, id)
        setIsPlaying(true)
      },
      onplayerror: () => {
        isStartingRef.current = false
        // Reset về null để gesture listener có thể thử lại.
        soundIdRef.current = null
        setIsPlaying(false)
      },
    })

    soundRef.current = sound
    setIsPlaying(false)

    // Chỉ tự phát khi user đã bật nhạc trước đó (chuyển track).
    if (wantsMusicRef.current) {
      isStartingRef.current = true
      soundIdRef.current = sound.play()
    }

    return () => {
      window.clearTimeout(pauseTimeoutRef.current)
      sound.unload()
      soundRef.current = null
      soundIdRef.current = null
      isStartingRef.current = false
    }
  }, [content.src])

  // Khi autoPlay=true: bắt gesture đầu tiên của user rồi mới bật nhạc.
  // Browser chặn audio cho đến khi có user gesture, nên đây là cách duy nhất đúng.
  useEffect(() => {
    if (!autoPlay) {
      return undefined
    }

    const tryAutoPlay = () => {
      const sound = soundRef.current
      // Đang trong quá trình start thì bỏ qua.
      if (!sound || isStartingRef.current) {
        return
      }

      wantsMusicRef.current = true
      const soundId = soundIdRef.current

      if (soundId === null) {
        // Chưa play lần nào — play mới.
        isStartingRef.current = true
        soundIdRef.current = sound.play()
      } else if (!sound.playing(soundId)) {
        // Đã từng play nhưng bị block/dừng — resume với fade in.
        isStartingRef.current = true
        sound.volume(0, soundId)
        sound.play(soundId)
        sound.fade(0, 0.42, 900, soundId)
      }
    }

    const EVENTS = ['click', 'keydown', 'touchstart', 'pointerdown']
    const onFirstInteraction = () => {
      tryAutoPlay()
      EVENTS.forEach((e) => document.removeEventListener(e, onFirstInteraction, true))
    }

    EVENTS.forEach((e) =>
      document.addEventListener(e, onFirstInteraction, { capture: true, once: true }),
    )

    return () => {
      EVENTS.forEach((e) => document.removeEventListener(e, onFirstInteraction, true))
    }
  }, [autoPlay])

  const toggleMusic = () => {
    const sound = soundRef.current
    const soundId = soundIdRef.current
    if (!sound || isStartingRef.current) {
      return
    }

    window.clearTimeout(pauseTimeoutRef.current)

    if (isPlaying) {
      wantsMusicRef.current = false
      sound.fade(sound.volume(soundId), 0, 700, soundId)
      pauseTimeoutRef.current = window.setTimeout(() => sound.pause(soundId), 720)
      setIsPlaying(false)
      return
    }

    wantsMusicRef.current = true

    if (soundId === null) {
      isStartingRef.current = true
      soundIdRef.current = sound.play()
      return
    }

    if (!sound.playing(soundId)) {
      isStartingRef.current = true
      sound.play(soundId)
    }
    sound.volume(0, soundId)
    sound.fade(0, 0.42, 900, soundId)
  }

  const label = isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'

  return (
    <Motion.button
      type="button"
      className={`music-toggle ${isPlaying ? 'music-toggle--playing' : ''}`}
      onClick={toggleMusic}
      aria-label={label}
      title={label}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="music-toggle__icon" aria-hidden="true">
        {isPlaying ? <Music2 size={18} /> : <VolumeX size={18} />}
      </span>
      <span className="music-toggle__wave" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="sr-only">{content.label}</span>
    </Motion.button>
  )
}

export default MusicToggle