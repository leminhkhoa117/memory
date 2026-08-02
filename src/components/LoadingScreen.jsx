import { motion as Motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function preloadAsset(src) {
  return new Promise((resolve) => {
    if (src.toLowerCase().includes('.mp4')) {
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.onloadedmetadata = resolve
      video.onerror = resolve
      video.src = src
      return
    }

    const image = new Image()
    image.onload = resolve
    image.onerror = resolve
    image.src = src
  })
}

function LoadingScreen({ assets, onComplete }) {
  const [progress, setProgress] = useState(8)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    let isMounted = true
    let completedAssets = 0
    let completionTimeout

    const minimumDisplay = new Promise((resolve) => window.setTimeout(resolve, 1000))
    const mediaReady = Promise.all(
      assets.map((asset) =>
        preloadAsset(asset).then(() => {
          completedAssets += 1
          if (isMounted) {
            setProgress(Math.round(12 + (completedAssets / assets.length) * 82))
          }
        }),
      ),
    )

    Promise.all([minimumDisplay, mediaReady]).then(() => {
      if (!isMounted) {
        return
      }

      setProgress(100)
      completionTimeout = window.setTimeout(() => onCompleteRef.current(), 420)
    })

    return () => {
      isMounted = false
      window.clearTimeout(completionTimeout)
    }
  }, [assets])

  return (
    <Motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.65, ease: 'easeInOut' } }}
    >
      <div className="loading-screen__mark" aria-hidden="true">
        <span>A</span>
        <i />
        <span>E</span>
      </div>
      <p className="loading-screen__label">Đang mở một câu chuyện nhỏ</p>
      <div
        className="loading-screen__track"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={progress}
      >
        <Motion.span animate={{ width: `${progress}%` }} transition={{ ease: 'easeOut' }} />
      </div>
      <span className="loading-screen__number">{progress.toString().padStart(2, '0')}</span>
    </Motion.div>
  )
}

export default LoadingScreen