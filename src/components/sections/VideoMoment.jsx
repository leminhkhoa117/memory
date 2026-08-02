import { useRef } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

function VideoMoment({ content }) {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  useScrollAnimation(sectionRef, ({ gsap, ScrollTrigger }) => {
    const playVideo = () => {
      videoRef.current?.play().catch(() => undefined)
    }
    const pauseVideo = () => videoRef.current?.pause()

    gsap.from('.video-moment__frame', {
      scale: 0.9,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    })

    gsap.from('.video-moment__caption', {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.25,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.video-moment__caption',
        start: 'top 88%',
      },
    })

    const playbackTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 55%',
      end: 'bottom 35%',
      onEnter: playVideo,
      onEnterBack: playVideo,
      onLeave: pauseVideo,
      onLeaveBack: pauseVideo,
    })

    return () => playbackTrigger.kill()
  })

  return (
    <section ref={sectionRef} className="video-moment story-section" id="khoanh-khac">
      <div className="video-moment__heading content-frame">
        <p className="story-note"><span aria-hidden="true">✦</span>{content.chapter}</p>
      </div>
      <div className="video-moment__frame">
        <video
          ref={videoRef}
          src={content.src}
          poster={content.poster}
          muted
          playsInline
          loop
          preload="metadata"
          aria-label="Một khoảnh khắc đáng nhớ của hai chúng ta"
        />
        <span className="video-moment__glow" aria-hidden="true" />
      </div>
      <p className="video-moment__caption">{content.caption}</p>
    </section>
  )
}

export default VideoMoment