import { motion as Motion } from 'framer-motion'
import { Music2, VolumeX } from 'lucide-react'
import { Howl } from 'howler'
import { useEffect, useRef, useState } from 'react'

function MusicToggle({ content, autoPlay = false }) {
  const soundRef = useRef(null)
  const soundIdRef = useRef(null)
  const isStartingRef = useRef(false)
  // Nếu autoPlay thì mặc định muốn bật nhạc ngay từ đầu.
  const wantsMusicRef = useRef(autoPlay)
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
        setIsPlaying(false)
      },
    })

    soundRef.current = sound
    setIsPlaying(false)

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

  // Khi autoPlay=true: lắng nghe tương tác đầu tiên của user rồi mới bật nhạc.
  // Browser chặn autoplay audio cho đến khi có gesture, nên dùng cách này là chuẩn nhất.
  useEffect(() => {
    if (!autoPlay) {
      return undefined
    }

    const tryAutoPlay = () => {
      const sound = soundRef.current
      if (!sound || isStartingRef.current || soundIdRef.current !== null) {
        return
      }
      wantsMusicRef.current = true
      isStartingRef.current = true
      soundIdRef.current = sound.play()
    }

    const EVENTS = ['click', 'keydown', 'touchstart', 'pointerdown']
    const onFirstInteraction = () => {
      tryAutoPlay()
      EVENTS.forEach((e) => document.removeEventListener(e, onFirstInteraction, true))
    }

    EVENTS.forEach((e) => document.addEventListener(e, onFirstInteraction, { capture: true, once: true }))

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