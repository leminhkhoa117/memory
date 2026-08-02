import { useRef } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import ChapterMarker from '../ChapterMarker'

function MemoryGallery({ content }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useScrollAnimation(sectionRef, ({ gsap }) => {
    const media = gsap.matchMedia()

    media.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const getDistance = () => Math.max(
        0,
        trackRef.current.scrollWidth - sectionRef.current.clientWidth + 96,
      )

      const horizontalTween = gsap.to(trackRef.current, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getDistance() + window.innerHeight * 0.8}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      gsap.to('.memory-card__image', {
        xPercent: 7,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getDistance() + window.innerHeight * 0.8}`,
          scrub: 1.4,
        },
      })

      return () => horizontalTween.kill()
    })

    media.add('(max-width: 899px)', () => {
      gsap.utils.toArray('.memory-card').forEach((card) => {
        gsap.from(card, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 82%' },
        })
      })
    })

    return () => media.revert()
  })

  return (
    <section ref={sectionRef} className="memory-gallery story-section" id="ky-niem">
      <div ref={trackRef} className="memory-gallery__track">
        <header className="memory-gallery__intro">
          <ChapterMarker {...content.chapter} />
          <h2>{content.title}</h2>
          <p>{content.intro}</p>
          <span className="memory-gallery__line" aria-hidden="true" />
        </header>
        {content.moments.map((moment) => (
          <figure className="memory-card" key={moment.index}>
            <div className="memory-card__viewport">
              <img
                className="memory-card__image"
                src={moment.image}
                alt={moment.alt}
                loading="lazy"
              />
            </div>
            <figcaption>
              <span>{moment.index}</span>
              <p>{moment.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default MemoryGallery