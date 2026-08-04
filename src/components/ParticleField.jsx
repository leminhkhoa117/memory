import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { memo, useEffect, useState } from 'react'

let particleEnginePromise

const VARIANT_PRESETS = {
  ambient: {
    count: 44,
    colors: ['#fffaf2', '#ffd3d8', '#f2a7b5', '#ffffff'],
    opacity: { min: 0.18, max: 0.68 },
    size: { min: 1.4, max: 4.2 },
    speed: 0.42,
    hearts: true,
  },
  intense: {
    count: 58,
    colors: ['#fff8e8', '#f3be8f', '#f0a6b4', '#ffffff'],
    opacity: { min: 0.08, max: 0.5 },
    size: { min: 1, max: 4 },
    speed: 0.7,
    hearts: true,
  },
  // Tông bụi giấy cũ cho minigame: trắng ngà, không hồng, không trái tim.
  archive: {
    count: 38,
    colors: ['#f4efe4', '#e6dac2', '#c9bda6', '#ffffff'],
    opacity: { min: 0.06, max: 0.42 },
    size: { min: 0.8, max: 3.2 },
    speed: 0.3,
    hearts: false,
  },
}

const createParticleOptions = (preset) => ({
  fullScreen: { enable: false },
  fpsLimit: 60,
  detectRetina: true,
  particles: {
    number: {
      value: preset.count,
      density: { enable: true, width: 900, height: 900 },
    },
    color: { value: preset.colors },
    shape: { type: ['circle', 'star'] },
    opacity: {
      value: preset.opacity,
      animation: { enable: true, speed: 0.55, sync: false },
    },
    size: {
      value: preset.size,
      animation: { enable: true, speed: 1.2, sync: false },
    },
    move: {
      enable: true,
      direction: 'top',
      speed: { min: 0.12, max: preset.speed },
      random: true,
      straight: false,
      outModes: { default: 'out' },
    },
  },
  interactivity: {
    events: { onHover: { enable: false }, onClick: { enable: false }, resize: { enable: true } },
  },
})

const VARIANT_OPTIONS = {
  ambient: createParticleOptions(VARIANT_PRESETS.ambient),
  intense: createParticleOptions(VARIANT_PRESETS.intense),
  archive: createParticleOptions(VARIANT_PRESETS.archive),
}

function initializeParticles() {
  if (!particleEnginePromise) {
    particleEnginePromise = initParticlesEngine(async (engine) => loadSlim(engine))
  }

  return particleEnginePromise
}

function ParticleField({ id, variant = 'ambient' }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    initializeParticles().then(() => setIsReady(true))
  }, [])

  if (!isReady) {
    return null
  }

  const preset = VARIANT_PRESETS[variant] ?? VARIANT_PRESETS.ambient

  return (
    <div
      className={`particle-field particle-field--${variant}`}
      aria-hidden="true"
    >
      <Particles id={id} options={VARIANT_OPTIONS[variant] ?? VARIANT_OPTIONS.ambient} />
      {preset.hearts && (
        <>
          <span className="ambient-heart ambient-heart--one">♡</span>
          <span className="ambient-heart ambient-heart--two">♥</span>
          <span className="ambient-heart ambient-heart--three">♡</span>
          <span className="ambient-heart ambient-heart--four">♡</span>
          <span className="ambient-heart ambient-heart--five">♥</span>
          <span className="ambient-heart ambient-heart--six">♡</span>
        </>
      )}
    </div>
  )
}

export default memo(ParticleField)