import { useRef } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import ChapterMarker from '../ChapterMarker'

function Listening({ content }) {
  const sectionRef = useRef(null)

  useScrollAnimation(sectionRef, ({ gsap }) => {
    gsap.fromTo(
      sectionRef.current,
      { backgroundColor: '#f1e5dc' },
      {
        backgroundColor: '#d8b9b0',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      },
    )

    gsap.utils.toArray('.quote-card').forEach((card, index) => {
      gsap.from(card, {
        y: 56,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1.1,
        delay: index * 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      })
    })
  })

  return (
    <section ref={sectionRef} className="listening story-section" id="lang-nghe">
      <div className="listening__header content-frame">
        <ChapterMarker {...content.chapter} />
        <h2>{content.title}</h2>
        <p>{content.intro}</p>
      </div>
      <div className="listening__quotes content-frame">
        {content.quotes.map((quote, index) => (
          <blockquote className="quote-card" key={quote}>
            <span aria-hidden="true">“</span>
            <p>{quote}</p>
            <small>0{index + 1}</small>
          </blockquote>
        ))}
      </div>
    </section>
  )
}

export default Listening