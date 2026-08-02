import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useEffect, useState } from 'react'

let particleEnginePromise

function initializeParticles() {
  if (!particleEnginePromise) {
    particleEnginePromise = initParticlesEngine(async (engine) => loadSlim(engine))
  }

  return particleEnginePromise
}

function ParticleField({ id, intense = false }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    initializeParticles().then(() => setIsReady(true))
  }, [])

  if (!isReady) {
    return null
  }

  return (
    <div className={`particle-field ${intense ? 'particle-field--intense' : ''}`} aria-hidden="true">
      <Particles
        id={id}
        options={{
          fullScreen: { enable: false },
          fpsLimit: 60,
          detectRetina: true,
          particles: {
            number: {
              value: intense ? 58 : 44,
              density: { enable: true, width: 900, height: 900 },
            },
            color: {
              value: intense
                ? ['#fff8e8', '#f3be8f', '#f0a6b4', '#ffffff']
                : ['#fffaf2', '#ffd3d8', '#f2a7b5', '#ffffff'],
            },
            shape: { type: ['circle', 'star'] },
            opacity: {
              value: { min: intense ? 0.08 : 0.18, max: intense ? 0.5 : 0.68 },
              animation: { enable: true, speed: 0.55, sync: false },
            },
            size: {
              value: { min: intense ? 1 : 1.4, max: intense ? 4 : 4.2 },
              animation: { enable: true, speed: 1.2, sync: false },
            },
            move: {
              enable: true,
              direction: 'top',
              speed: { min: 0.12, max: intense ? 0.7 : 0.42 },
              random: true,
              straight: false,
              outModes: { default: 'out' },
            },
          },
          interactivity: {
            events: { onHover: { enable: false }, onClick: { enable: false }, resize: { enable: true } },
          },
        }}
      />
      <span className="ambient-heart ambient-heart--one">♡</span>
      <span className="ambient-heart ambient-heart--two">♥</span>
      <span className="ambient-heart ambient-heart--three">♡</span>
      <span className="ambient-heart ambient-heart--four">♡</span>
      <span className="ambient-heart ambient-heart--five">♥</span>
      <span className="ambient-heart ambient-heart--six">♡</span>
    </div>
  )
}

export default ParticleField