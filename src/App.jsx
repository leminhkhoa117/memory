import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { story, preloadAssets } from './content'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import LoadingScreen from './components/LoadingScreen'
import MusicToggle from './components/MusicToggle'
import StoryProgress from './components/StoryProgress'
import Intro from './components/sections/Intro'
import FirstMeet from './components/sections/FirstMeet'
import MemoryGallery from './components/sections/MemoryGallery'
import Listening from './components/sections/Listening'
import Doubt from './components/sections/Doubt'
import VideoMoment from './components/sections/VideoMoment'
import Confession from './components/sections/Confession'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useSmoothScroll(isLoaded)

  return (
    <>
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <LoadingScreen
            key="loader"
            assets={preloadAssets}
            onComplete={() => setIsLoaded(true)}
          />
        )}
      </AnimatePresence>

      <div className={`story-shell ${isLoaded ? 'story-shell--ready' : ''}`}>
        <StoryProgress />
        <main>
          <Intro content={story.intro} />
          <FirstMeet content={story.firstMeet} />
          <MemoryGallery content={story.gallery} />
          <Listening content={story.listening} />
          <Doubt content={story.doubt} />
          <VideoMoment content={story.video} />
          <Confession content={story.confession} />
        </main>
        <MusicToggle content={story.music} />
      </div>
    </>
  )
}

export default App