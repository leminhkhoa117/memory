import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
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

function App() {
  const [stage, setStage] = useState(STAGE.loading)

  return (
    <>
      <AnimatePresence mode="wait">
        {stage === STAGE.loading && (
          <LoadingScreen
            key="loader"
            assets={preloadAssets}
            onComplete={() => setStage(STAGE.puzzle)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {stage === STAGE.puzzle && (
          <PuzzleGame key="puzzle" onComplete={() => setStage(STAGE.story)} />
        )}
      </AnimatePresence>

      {stage === STAGE.story && <StoryExperience />}

      <MusicToggle content={story.music} />
    </>
  )
}

export default App