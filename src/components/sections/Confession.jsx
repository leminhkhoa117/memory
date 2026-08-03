import { motion as Motion } from 'framer-motion'
import { useRef } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import ParticleField from '../ParticleField'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.45,
      staggerChildren: 1.55,
    },
  },
}

const lineVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 80, damping: 16, mass: 0.9 },
  },
}

function Confession({ content }) {
  const sectionRef = useRef(null)

  useScrollAnimation(sectionRef, ({ gsap }) => {
    gsap.fromTo(
      sectionRef.current,
      { backgroundColor: '#211417' },
      {
        backgroundColor: '#a95f5f',
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: 1.2,
        },
      },
    )
  })

  return (
    <section ref={sectionRef} className="confession story-section" id="loi-to-tinh">
      <div className="confession__light" aria-hidden="true" />
      <ParticleField id="confession-particles" intense />
      <Motion.div
        className="confession__content content-frame"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.42 }}
      >
        <Motion.p className="story-note confession__note" variants={lineVariants}>
          <span aria-hidden="true">♡</span>{content.chapter}
        </Motion.p>
        {content.lines.map((line, index) => (
          <Motion.p
            className={`confession__line confession__line--${index + 1}`}
            variants={lineVariants}
            key={line}
          >
            {line}
          </Motion.p>
        ))}
        <Motion.p className="confession__closing" variants={lineVariants}>
          {content.closing}
        </Motion.p>
      </Motion.div>
    </section>
  )
}

export default Confession