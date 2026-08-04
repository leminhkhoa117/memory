import HTMLFlipBook from 'react-pageflip'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useNotebookSize } from '../../hooks/useNotebookSize'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import NotebookPage from './NotebookPage'
import NotepadFlip from './NotepadFlip'
import PageContent from './PageContent'
import LetterOverlay from './LetterOverlay'
import '../../styles/notebook.css'

const HINT_DURATION = 6000
const PAD_COVER = { id: 'bia-so-tay', kind: 'cover' }

function Notebook({ content, seal }) {
  const bookRef = useRef(null)
  const stageRef = useRef(null)
  const [pageIndex, setPageIndex] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [padIndex, setPadIndex] = useState(0)
  const [isHintVisible, setIsHintVisible] = useState(true)
  const [letterOrigin, setLetterOrigin] = useState(null)
  const shouldReduceMotion = useReducedMotion()
  const isPad = useMediaQuery('(max-width: 760px)')
  const size = useNotebookSize(stageRef)

  // Đổi kích thước sẽ dựng lại cuốn sổ, nên phải nhớ trang đang đọc để mở lại đúng chỗ.
  const pageIndexRef = useRef(0)
  pageIndexRef.current = pageIndex

  const padSheets = useMemo(() => [PAD_COVER, ...content.mobilePages], [content.mobilePages])
  const pages = isPad ? padSheets : content.pages

  const getFlip = useCallback(() => bookRef.current?.pageFlip?.() ?? null, [])

  const goPrev = useCallback(() => {
    if (isPad) {
      setPadIndex((current) => Math.max(current - 1, 0))
      return
    }
    getFlip()?.flipPrev()
  }, [getFlip, isPad])

  const goNext = useCallback(() => {
    if (isPad) {
      setPadIndex((current) => Math.min(current + 1, pages.length - 1))
      return
    }
    getFlip()?.flipNext()
  }, [getFlip, isPad, pages.length])

  const handleOpenLetter = useCallback((event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    setLetterOrigin({
      top: bounds.top,
      left: bounds.left,
      width: bounds.width,
      height: bounds.height,
    })
  }, [])

  const closeLetter = useCallback(() => setLetterOrigin(null), [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => setIsHintVisible(false), HINT_DURATION)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleKey = (event) => {
      if (letterOrigin) {
        return
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        goPrev()
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        goNext()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goPrev, goNext, letterOrigin])

  const handleInit = useCallback((event) => {
    setTotalPages(event.object.getPageCount())
    setPageIndex(event.data.page ?? 0)
  }, [])

  const handleFlip = useCallback((event) => {
    setPageIndex(event.data)
    setIsHintVisible(false)
  }, [])

  const handlePadChange = useCallback((next) => {
    setPadIndex(next)
    setIsHintVisible(false)
  }, [])

  const currentIndex = isPad ? padIndex : pageIndex
  const lastIndex = isPad
    ? pages.length - 1
    : Math.max(totalPages - (size?.isPortrait ? 1 : 2), 0)
  const count = isPad ? pages.length : Math.max(totalPages, 1)

  return (
    <section
      className="notebook"
      aria-label="Cuốn sổ tay"
      data-portrait={size?.isPortrait ? 'true' : 'false'}
      data-mode={isPad ? 'pad' : 'book'}
      // Cỡ chữ bám theo chiều cao trang giấy để không bị tràn khi sổ nhỏ lại.
      style={{ '--nb-scale': size ? ((isPad ? size.stageHeight / 780 : size.height / 700)).toFixed(3) : 1 }}
    >
      <span className="notebook__desk" aria-hidden="true" />

      {/* Bộ lọc làm nhoè viền để mảnh giấy trông như bị xé tay. */}
      <svg className="nb-defs" aria-hidden="true" focusable="false">
        <defs>
          {[
            { id: 'nb-torn-1', seed: 3, frequency: '0.024 0.05', scale: 13 },
            { id: 'nb-torn-2', seed: 17, frequency: '0.03 0.06', scale: 11 },
            { id: 'nb-torn-3', seed: 42, frequency: '0.021 0.044', scale: 15 },
          ].map((torn) => (
            <filter key={torn.id} id={torn.id} x="-12%" y="-14%" width="124%" height="128%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency={torn.frequency}
                numOctaves="4"
                seed={torn.seed}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={torn.scale}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          ))}
        </defs>
      </svg>

      <div className="notebook__stage" ref={stageRef}>
        {isPad ? (
          <NotepadFlip
            pages={padSheets}
            cover={content.cover}
            seal={seal}
            index={padIndex}
            onChange={handlePadChange}
            onOpenLetter={handleOpenLetter}
          />
        ) : (
          size && (
            <HTMLFlipBook
              key={`${size.width}x${size.height}x${size.isPortrait}`}
              className="nb-book"
              ref={bookRef}
              width={size.width}
              height={size.height}
              size="fixed"
              startPage={pageIndexRef.current}
              showCover
              drawShadow
              maxShadowOpacity={0.45}
              flippingTime={shouldReduceMotion ? 350 : 900}
              usePortrait={size.isPortrait}
              mobileScrollSupport={false}
              showPageCorners
              disableFlipByClick
              useMouseEvents
              swipeDistance={22}
              onInit={handleInit}
              onFlip={handleFlip}
            >
              <NotebookPage variant="cover">
                <span className="nb-cover__ribbon" aria-hidden="true" />
                <p className="nb-cover__eyebrow">{content.cover.eyebrow}</p>
                <p className="nb-cover__stamp">{content.cover.stamp}</p>
                <h2 className="nb-cover__title">{content.cover.title}</h2>
                <span className="nb-cover__seal" aria-hidden="true">
                  <span className="nb-cover__seal-mark">{seal.mark}</span>
                </span>
              </NotebookPage>

              {pages.map((page, index) => {
                const bookIndex = index + 1
                const isActive =
                  bookIndex === pageIndex || (!size.isPortrait && bookIndex === pageIndex + 1)

                return (
                  <NotebookPage key={page.id} side={index % 2 === 0 ? 'left' : 'right'}>
                    <span className="nb-paper__margin" aria-hidden="true" />

                    <div className={`nb-paper__body nb-paper__body--${page.kind}`}>
                      <PageContent
                        page={page}
                        seal={seal}
                        isActive={isActive}
                        onOpenLetter={handleOpenLetter}
                      />
                    </div>

                    <span className="nb-paper__number">{String(bookIndex).padStart(2, '0')}</span>
                  </NotebookPage>
                )
              })}

              <NotebookPage variant="cover" />
            </HTMLFlipBook>
          )
        )}
      </div>

      <div className="notebook__nav">
        <button
          type="button"
          className="notebook__arrow"
          onClick={goPrev}
          disabled={currentIndex <= 0}
          aria-label={content.nav.prev}
        >
          {isPad ? (
            <ChevronUp size={20} strokeWidth={1.6} />
          ) : (
            <ChevronLeft size={20} strokeWidth={1.6} />
          )}
        </button>

        <span className="notebook__counter">
          {String(currentIndex + 1).padStart(2, '0')}
          <span className="notebook__counter-sep">/</span>
          {String(count).padStart(2, '0')}
        </span>

        <button
          type="button"
          className="notebook__arrow"
          onClick={goNext}
          disabled={currentIndex >= lastIndex}
          aria-label={content.nav.next}
        >
          {isPad ? (
            <ChevronDown size={20} strokeWidth={1.6} />
          ) : (
            <ChevronRight size={20} strokeWidth={1.6} />
          )}
        </button>
      </div>

      <Motion.p
        className="notebook__hint"
        animate={{ opacity: isHintVisible ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        aria-hidden="true"
      >
        {isPad ? 'Vuốt lên để lật trang' : content.nav.hint}
      </Motion.p>

      <AnimatePresence>
        {letterOrigin && (
          <LetterOverlay
            key="letter"
            content={content.letter}
            seal={seal}
            origin={letterOrigin}
            onClose={closeLetter}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Notebook
