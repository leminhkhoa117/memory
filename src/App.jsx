import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { story, preloadAssets } from './content'
import notebookContent from './data/notebookContent'
import LoadingScreen from './components/LoadingScreen'
import MusicToggle from './components/MusicToggle'
import PuzzleGame from './components/puzzle/PuzzleGame'
import BookOpening from './components/transition/BookOpening'
import StoryExperience from './StoryExperience'

const STAGE = {
  loading: 'loading',
  puzzle: 'puzzle',
  transition: 'transition',
  story: 'story',
}

/** Thời gian minigame tự mờ dần trước khi bị gỡ khỏi DOM. */
const PUZZLE_FADE_OUT = 900

function App() {
  const [stage, setStage] = useState(STAGE.loading)
  const [isPuzzleMounted, setIsPuzzleMounted] = useState(false)
  const [isTransitionMounted, setIsTransitionMounted] = useState(false)
  const unmountTimerRef = useRef(null)

  useEffect(() => () => window.clearTimeout(unmountTimerRef.current), [])

  const handleLoaded = useCallback(() => {
    setIsPuzzleMounted(true)
    setStage(STAGE.puzzle)
  }, [])

  // Màn lật bìa phủ lên trên trong lúc minigame mờ dần rồi tự gỡ.
  const handlePuzzleComplete = useCallback(() => {
    setStage(STAGE.transition)
    setIsTransitionMounted(true)
    unmountTimerRef.current = window.setTimeout(
      () => setIsPuzzleMounted(false),
      PUZZLE_FADE_OUT,
    )
  }, [])

  // Story được gắn khi trang giấy đã phủ kín màn hình, để lớp phủ tan ra là thấy nội dung.
  const handleCoverOpened = useCallback(() => setStage(STAGE.story), [])
  const handleTransitionDone = useCallback(() => setIsTransitionMounted(false), [])

  return (
    <>
      <AnimatePresence mode="wait">
        {stage === STAGE.loading && (
          <LoadingScreen key="loader" assets={preloadAssets} onComplete={handleLoaded} />
        )}
      </AnimatePresence>

      {isPuzzleMounted && <PuzzleGame onComplete={handlePuzzleComplete} />}

      {isTransitionMounted && (
        <BookOpening
          cover={notebookContent.cover}
          firstPage={notebookContent.firstPage}
          seal={notebookContent.seal}
          onReveal={handleCoverOpened}
          onComplete={handleTransitionDone}
        />
      )}

      {stage === STAGE.story && <StoryExperience />}

      <MusicToggle content={story.music} />
    </>
  )
}

export default App