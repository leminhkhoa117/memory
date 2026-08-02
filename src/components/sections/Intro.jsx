import { ArrowDown } from 'lucide-react'
import { useRef } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import ParticleField from '../ParticleField'

function SplitTitle({ text }) {
  return text.split(' ').map((word, wordIndex) => (
    <span className="intro__word" key={`${word}-${wordIndex}`}>
      {word.split('').map((character, characterIndex) => (
        <span className="intro__char" key={`${character}-${characterIndex}`}>
          {character}
        </span>
      ))}
      {wordIndex < text.split(' ').length - 1 && <span>&nbsp;</span>}
    </span>
  ))
}

function Intro({ content }) {
  const sectionRef = useRef(null)

  useScrollAnimation(sectionRef, ({ gsap }) => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      gsap.set('.intro__char, .intro__eyebrow, .intro__subtitle, .intro__scroll', {
        opacity: 1,
        y: 0,
      })
      return undefined
    }

    const reveal = gsap.timeline({ defaults: { ease: 'power3.out' } })
    reveal
      .from('.intro__eyebrow', { y: 18, opacity: 0, duration: 0.8 })
      .from(
        '.intro__char',
        { yPercent: 115, opacity: 0, duration: 1, stagger: 0.025 },
        '-=0.35',
      )
      .from('.intro__subtitle', { y: 24, opacity: 0, duration: 1 }, '-=0.35')
      .from('.intro__scroll', { y: -12, opacity: 0, duration: 0.7 }, '-=0.35')

    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
      .to('.intro__content', { yPercent: 22, opacity: 0.15, ease: 'none' }, 0)
      .to('.intro__background', { scale: 1.1, ease: 'none' }, 0)
      .to('.intro__scroll', { opacity: 0, ease: 'none' }, 0)

    return undefined
  })

  return (
    <section ref={sectionRef} className="intro story-section" id="mo-dau">
      <div
        className="intro__background"
        style={{ backgroundImage: `url(${content.background})` }}
        aria-hidden="true"
      />
      <div className="intro__veil" aria-hidden="true" />
      <ParticleField id="intro-particles" />
      <div className="intro__content content-frame">
        <div className="intro__eyebrow">
          <span aria-hidden="true">♡</span>
          <p>{content.eyebrow}</p>
          <i aria-hidden="true" />
        </div>
        <h1 className="intro__title" aria-label={content.title}>
          <SplitTitle text={content.title} />
        </h1>
        <p className="intro__subtitle">{content.subtitle}</p>
      </div>
      <a className="intro__scroll" href="#lan-dau" aria-label="Đi đến chương tiếp theo">
        <ArrowDown size={20} strokeWidth={1.5} />
      </a>
    </section>
  )
}

export default Intro