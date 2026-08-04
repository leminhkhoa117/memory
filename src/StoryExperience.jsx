import { story } from './content'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import StoryProgress from './components/StoryProgress'
import Intro from './components/sections/Intro'
import FirstMeet from './components/sections/FirstMeet'
import MemoryGallery from './components/sections/MemoryGallery'
import Listening from './components/sections/Listening'
import Doubt from './components/sections/Doubt'
import VideoMoment from './components/sections/VideoMoment'
import Confession from './components/sections/Confession'

// Phần kể chuyện. Chỉ được mount sau khi minigame hoàn thành nên Lenis/ScrollTrigger
// không bao giờ chạy song song với thao tác kéo thả của minigame.
function StoryExperience() {
  useSmoothScroll(true)

  return (
    <div className="story-shell story-shell--ready">
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
    </div>
  )
}

export default StoryExperience
