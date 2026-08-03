import { motion as Motion } from 'framer-motion'
import { useRef } from 'react'
import puzzleContent from '../../data/puzzleContent'
import ParticleField from '../ParticleField'
import '../../styles/puzzle.css'

// Khung minigame. Toàn bộ trạng thái game sống trong cây component này và chỉ
// giao tiếp với phần kể chuyện qua đúng một callback onComplete.
function PuzzleGame({ onComplete }) {
  const boardRef = useRef(null)

  return (
    <Motion.section
      className="puzzle"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Minigame ghép kỷ vật"
    >
      <ParticleField id="puzzle-particles" />

      <div className="puzzle__inner">
        <header className="puzzle__header">
          <p className="puzzle__eyebrow">{puzzleContent.eyebrow}</p>
          <h1 className="puzzle__title">{puzzleContent.title}</h1>
          <p className="puzzle__hint-line">{puzzleContent.hint}</p>
        </header>

        <div className="puzzle__board" ref={boardRef}>
          <div className="puzzle__board-placeholder">
            Khu vực kéo thả kỷ vật — sẽ dựng ở Phần 2
          </div>
        </div>

        <div className="puzzle__footer">
          <button type="button" onClick={onComplete}>
            [tạm thời] Bỏ qua minigame
          </button>
        </div>
      </div>
    </Motion.section>
  )
}

export default PuzzleGame
