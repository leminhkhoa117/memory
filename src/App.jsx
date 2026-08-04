import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { story, preloadAssets } from './content'
import puzzleContent from './data/puzzleContent'
import notebookContent from './data/notebookContent'
import LoadingScreen from './components/LoadingScreen'
import MusicToggle from './components/MusicToggle'
import StartScreen from './components/start/StartScreen'

const PuzzleGame = lazy(() => import('./components/puzzle/PuzzleGame'))
const Notebook = lazy(() => import('./components/notebook/Notebook'))

const STAGE = {
  loading: 'loading',
  start: 'start',
  puzzle: 'puzzle',
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
  const timersRef = useRef([])
  const music = stage === STAGE.notebook ? story.music.notebook : story.music.game

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
    setStage(STAGE.notebook)
    defer(() => setIsPuzzleMounted(false), PUZZLE_FADE_OUT)
  }, [defer])

  return (
    <>
      <AnimatePresence mode="wait">
        {stage === STAGE.loading && (
          <LoadingScreen key="loader" assets={preloadAssets} onComplete={handleLoaded} />
        )}
      </AnimatePresence>

      <Suspense fallback={null}>
        {isPuzzleMounted && <PuzzleGame onComplete={handlePuzzleComplete} />}
      </Suspense>

      {isStartMounted && <StartScreen content={puzzleContent.intro} onStart={handleStart} />}

      <Suspense fallback={null}>
        {stage === STAGE.notebook && <Notebook content={notebookContent} />}
      </Suspense>

      <MusicToggle content={music} />
    </>
  )
}

export default App