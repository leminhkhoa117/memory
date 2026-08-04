import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { story, preloadAssets } from './content'
import puzzleContent from './data/puzzleContent'
import notebookContent from './data/notebookContent'
import LoadingScreen from './components/LoadingScreen'
import MusicToggle from './components/MusicToggle'
import StartScreen from './components/start/StartScreen'
import PuzzleGame from './components/puzzle/PuzzleGame'
import BookOpening from './components/transition/BookOpening'
import Notebook from './components/notebook/Notebook'

const STAGE = {
  loading: 'loading',
  start: 'start',
  puzzle: 'puzzle',
  transition: 'transition',
  notebook: 'notebook',
}

/** Thời gian mỗi lớp tự mờ dần trước khi bị gỡ khỏi DOM. */
const START_FADE_OUT = 950
const PUZZLE_FADE_OUT = 900

/** Khi chạy dev có thể vào thẳng một chặng qua ?stage=... để khỏi chơi lại từ đầu. */
const INITIAL_STAGE = (() => {
  if (!import.meta.env.DEV) {
    return STAGE.loading
  }
  const requested = new URLSearchParams(window.location.search).get('stage')
  return Object.values(STAGE).includes(requested) ? requested : STAGE.loading
})()

function App() {
  const [stage, setStage] = useState(INITIAL_STAGE)
  const [isStartMounted, setIsStartMounted] = useState(INITIAL_STAGE === STAGE.start)
  const [isPuzzleMounted, setIsPuzzleMounted] = useState(INITIAL_STAGE === STAGE.puzzle)
  const [isTransitionMounted, setIsTransitionMounted] = useState(
    INITIAL_STAGE === STAGE.transition,
  )
  const timersRef = useRef([])

  useEffect(() => {
    const timers = timersRef.current
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [])

  const defer = useCallback((callback, delay) => {
    timersRef.current.push(window.setTimeout(callback, delay))
  }, [])

  const handleLoaded = useCallback(() => {
    setIsStartMounted(true)
    setStage(STAGE.start)
  }, [])

  // Minigame hiện dần ngay bên dưới trong lúc màn mở đầu sáng lên rồi tan đi.
  const handleStart = useCallback(() => {
    setIsPuzzleMounted(true)
    setStage(STAGE.puzzle)
    defer(() => setIsStartMounted(false), START_FADE_OUT)
  }, [defer])

  const handlePuzzleComplete = useCallback(() => {
    setStage(STAGE.transition)
    setIsTransitionMounted(true)
    defer(() => setIsPuzzleMounted(false), PUZZLE_FADE_OUT)
  }, [defer])

  // Cuốn sổ được gắn khi trang giấy đã phủ kín màn hình, để lớp phủ tan ra là thấy nội dung.
  const handleCoverOpened = useCallback(() => setStage(STAGE.notebook), [])
  const handleTransitionDone = useCallback(() => setIsTransitionMounted(false), [])

  return (
    <>
      <AnimatePresence mode="wait">
        {stage === STAGE.loading && (
          <LoadingScreen key="loader" assets={preloadAssets} onComplete={handleLoaded} />
        )}
      </AnimatePresence>

      {isPuzzleMounted && <PuzzleGame onComplete={handlePuzzleComplete} />}

      {isStartMounted && <StartScreen content={puzzleContent.intro} onStart={handleStart} />}

      {isTransitionMounted && (
        <BookOpening
          cover={notebookContent.cover}
          firstPage={notebookContent.firstPage}
          seal={notebookContent.seal}
          onReveal={handleCoverOpened}
          onComplete={handleTransitionDone}
        />
      )}

      {stage === STAGE.notebook && (
        <Notebook content={notebookContent} seal={notebookContent.seal} />
      )}

      <MusicToggle content={story.music} />
    </>
  )
}

export default App