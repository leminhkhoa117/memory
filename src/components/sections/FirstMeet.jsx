import { useRef } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import ChapterMarker from '../ChapterMarker'

function FirstMeet({ content }) {
  const sectionRef = useRef(null)

  useScrollAnimation(sectionRef, ({ gsap }) => {
    const media = gsap.matchMedia()

    media.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=110%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      timeline
        .fromTo(
          '.first-meet__media',
          { clipPath: 'inset(16% 24% 16% 24%)', scale: 0.88, opacity: 0.4 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, opacity: 1, ease: 'power3.out' },
        )
        .from('.first-meet__meta', { x: -80, opacity: 0, ease: 'power3.out' }, 0.08)
        .from('.first-meet__copy > *', {
          x: 80,
          opacity: 0,
          stagger: 0.08,
          ease: 'power3.out',
        }, 0.12)
        .to('.first-meet__image', { scale: 1.06, ease: 'none' }, 0)
    })

    media.add('(max-width: 899px)', () => {
      gsap.from('.first-meet__media, .first-meet__copy > *, .first-meet__meta', {
        y: 44,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%' },
      })
    })

    return () => media.revert()
  })

  return (
    <section ref={sectionRef} className="first-meet story-section" id="lan-dau">
      <div className="first-meet__layout content-frame">
        <div className="first-meet__meta">
          <span>{content.chapter.number}</span>
          <i />
          <time>{content.date}</time>
        </div>
        <figure className="first-meet__media">
          <img
            className="first-meet__image"
            src={content.image}
            alt={content.imageAlt}
            loading="eager"
          />
          <span className="first-meet__corner" aria-hidden="true">01</span>
        </figure>
        <div className="first-meet__copy">
          <ChapterMarker {...content.chapter} />
          <h2>{content.title}</h2>
          <p>{content.body}</p>
        </div>
      </div>
    </section>
  )
}

export default FirstMeet