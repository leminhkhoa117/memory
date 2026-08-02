import { motion as Motion } from 'framer-motion'
import { Music2, VolumeX } from 'lucide-react'
import { Howl, Howler } from 'howler'
import { useEffect, useRef, useState } from 'react'

function MusicToggle({ content }) {
  const soundRef = useRef(null)
  const pauseTimeoutRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    let removeUnlockListeners = () => {}

    const sound = new Howl({
      src: [content.src],
      html5: true,
      loop: true,
      preload: true,
      volume: 0,
      onplay: () => {
        sound.fade(sound.volume(), 0.42, 900)
        setIsPlaying(true)
        removeUnlockListeners()
      },
      onplayerror: () => {
        setIsPlaying(false)

        const unlockAudio = () => {
          Howler.ctx?.resume?.()
          sound.play()
        }

        const events = ['pointerdown', 'touchstart', 'keydown']
        events.forEach((eventName) => {
          window.addEventListener(eventName, unlockAudio, { once: true, capture: true })
        })

        removeUnlockListeners = () => {
          events.forEach((eventName) => {
            window.removeEventListener(eventName, unlockAudio, true)
          })
        }
      },
    })

    soundRef.current = sound
    sound.play()

    return () => {
      removeUnlockListeners()
      window.clearTimeout(pauseTimeoutRef.current)
      sound.unload()
      soundRef.current = null
    }
  }, [content.src])

  const toggleMusic = () => {
    const sound = soundRef.current
    if (!sound) {
      return
    }

    window.clearTimeout(pauseTimeoutRef.current)

    if (isPlaying) {
      sound.fade(sound.volume(), 0, 700)
      pauseTimeoutRef.current = window.setTimeout(() => sound.pause(), 720)
      setIsPlaying(false)
      return
    }

    if (!sound.playing()) {
      sound.play()
    }
    sound.volume(0)
    sound.fade(0, 0.42, 900)
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