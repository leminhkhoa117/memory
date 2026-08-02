import { motion as Motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useRef } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { useTypewriter } from '../../hooks/useTypewriter'
import ChapterMarker from '../ChapterMarker'

function Doubt({ content }) {
  const sectionRef = useRef(null)
  const typedText = useTypewriter(content.lines)

  useScrollAnimation(sectionRef, ({ gsap }) => {
    gsap.from('.doubt__content > *', {
      y: 36,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 62%',
      },
    })
  })

  return (
    <section ref={sectionRef} className="doubt story-section" id="do-du">
      <div className="doubt__halo" aria-hidden="true" />
      <div className="doubt__content content-frame">
        <ChapterMarker {...content.chapter} />
        <div className="doubt__pulse" aria-hidden="true">
          <svg viewBox="0 0 640 120" preserveAspectRatio="none">
            <defs>
              <mask id="ecg-heart-gap">
                <rect width="640" height="120" fill="white" />
                <rect x="286" y="14" width="68" height="92" rx="28" fill="black" />
              </mask>
              <linearGradient
                id="ecg-scan-gradient"
                x1="-190"
                y1="0"
                x2="0"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#e8a79f" stopOpacity="0" />
                <stop offset="0.48" stopColor="#e8a79f" stopOpacity="0.08" />
                <stop offset="0.76" stopColor="#eeaaa3" stopOpacity="0.3" />
                <stop offset="0.92" stopColor="#ffc3bc" stopOpacity="0.68" />
                <stop offset="0.975" stopColor="#ffe4df" stopOpacity="1" />
                <stop offset="1" stopColor="#ffe4df" stopOpacity="0" />
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  from="0 0"
                  to="640 0"
                  dur="3.1s"
                  repeatCount="indefinite"
                />
              </linearGradient>
            </defs>
            <path
              className="doubt__pulse-signal doubt__pulse-signal--glow"
              mask="url(#ecg-heart-gap)"
              d="M0 60H88L104 60L118 44L132 76L148 20L168 98L187 60H270L286 60L300 48L314 70L330 30L348 88L365 60H452L468 60L482 45L496 75L512 24L530 94L548 60H640"
            />
            <path
              className="doubt__pulse-signal"
              mask="url(#ecg-heart-gap)"
              d="M0 60H88L104 60L118 44L132 76L148 20L168 98L187 60H270L286 60L300 48L314 70L330 30L348 88L365 60H452L468 60L482 45L496 75L512 24L530 94L548 60H640"
            />
          </svg>
          <span className="doubt__pulse-aura" />
          <Motion.div className="doubt__heart">
            <Heart size={48} strokeWidth={1.35} />
          </Motion.div>
        </div>
        <h2>{content.title}</h2>
        <p className="doubt__typewriter" aria-label={typedText}>
          {typedText}
          <span aria-hidden="true" />
        </p>
        <p className="doubt__note">{content.note}</p>
      </div>
    </section>
  )
}

export default Doubt