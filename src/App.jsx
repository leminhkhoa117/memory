import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { story, preloadAssets } from './content'
import LoadingScreen from './components/LoadingScreen'
import MusicToggle from './components/MusicToggle'
import PuzzleGame from './components/puzzle/PuzzleGame'
import StoryExperience from './StoryExperience'

const STAGE = {
  loading: 'loading',
  puzzle: 'puzzle',
  story: 'story',
}

/** Thời gian minigame tự mờ dần trước khi bị gỡ khỏi DOM. */
const PUZZLE_FADE_OUT = 900

function App() {
  const [stage, setStage] = useState(STAGE.loading)
  const [isPuzzleMounted, setIsPuzzleMounted] = useState(false)
  const unmountTimerRef = useRef(null)

  useEffect(() => () => window.clearTimeout(unmountTimerRef.current), [])

  const handleLoaded = useCallback(() => {
    setIsPuzzleMounted(true)
    setStage(STAGE.puzzle)
  }, [])

  // Story hiện lên ngay để có crossfade, minigame tự gỡ sau khi mờ hẳn.
  const handlePuzzleComplete = useCallback(() => {
    setStage(STAGE.story)
    unmountTimerRef.current = window.setTimeout(
      () => setIsPuzzleMounted(false),
      PUZZLE_FADE_OUT,
    )
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {stage === STAGE.loading && (
          <LoadingScreen key="loader" assets={preloadAssets} onComplete={handleLoaded} />
        )}
      </AnimatePresence>

      {isPuzzleMounted && <PuzzleGame onComplete={handlePuzzleComplete} />}

      {stage === STAGE.story && <StoryExperience />}

      <MusicToggle content={story.music} />
    </>
  )
}

export default App