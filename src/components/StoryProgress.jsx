import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function StoryProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: ({ progress }) => {
        if (barRef.current) {
          barRef.current.style.transform = `scaleY(${progress})`
        }
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <div className="story-progress" aria-hidden="true">
      <span ref={barRef} />
    </div>
  )
}

export default StoryProgress