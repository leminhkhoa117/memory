import HTMLFlipBook from 'react-pageflip'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion as Motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useNotebookSize } from '../../hooks/useNotebookSize'
import NotebookPage from './NotebookPage'
import PageContent from './PageContent'
import '../../styles/notebook.css'

const HINT_DURATION = 6000

function Notebook({ content, seal }) {
  const bookRef = useRef(null)
  const stageRef = useRef(null)
  const [pageIndex, setPageIndex] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isHintVisible, setIsHintVisible] = useState(true)
  const shouldReduceMotion = useReducedMotion()
  const size = useNotebookSize(stageRef)

  // Đổi kích thước sẽ dựng lại cuốn sổ, nên phải nhớ trang đang đọc để mở lại đúng chỗ.
  const pageIndexRef = useRef(1)
  pageIndexRef.current = pageIndex

  const getFlip = useCallback(() => bookRef.current?.pageFlip?.() ?? null, [])

  const goPrev = useCallback(() => getFlip()?.flipPrev(), [getFlip])
  const goNext = useCallback(() => getFlip()?.flipNext(), [getFlip])

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
      if (event.key === 'ArrowLeft') {
        goPrev()
      } else if (event.key === 'ArrowRight') {
        goNext()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goPrev, goNext])

  const handleInit = useCallback((event) => {
    setTotalPages(event.object.getPageCount())
    setPageIndex(event.data.page ?? 0)
  }, [])

  const handleFlip = useCallback((event) => {
    setPageIndex(event.data)
    setIsHintVisible(false)
  }, [])

  const isFirst = pageIndex <= 0
  // Mở đôi thì hai trang cuối hiện cùng lúc, không còn gì để lật nữa.
  const lastIndex = Math.max(totalPages - (size?.isPortrait ? 1 : 2), 0)
  const isLast = totalPages > 0 && pageIndex >= lastIndex

  return (
    <section
      className="notebook"
      aria-label="Cuốn sổ tay"
      data-portrait={size?.isPortrait ? 'true' : 'false'}
      // Cỡ chữ bám theo chiều cao trang giấy để không bị tràn khi sổ nhỏ lại.
      style={{ '--nb-scale': size ? (size.height / 700).toFixed(3) : 1 }}
    >
      <span className="notebook__desk" aria-hidden="true" />

      <div className="notebook__stage" ref={stageRef}>
        {size && (
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

          {content.pages.map((page, index) => {
            const bookIndex = index + 1
            const isActive =
              bookIndex === pageIndex || (!size.isPortrait && bookIndex === pageIndex + 1)

            return (
              <NotebookPage key={page.id} side={index % 2 === 0 ? 'left' : 'right'}>
                <span className="nb-paper__holes" aria-hidden="true" />
                <span className="nb-paper__margin" aria-hidden="true" />

                <div className={`nb-paper__body nb-paper__body--${page.kind}`}>
                  <PageContent page={page} seal={seal} isActive={isActive} />
                </div>

                <span className="nb-paper__number">{String(bookIndex).padStart(2, '0')}</span>
              </NotebookPage>
            )
          })}

          <NotebookPage variant="cover" />
        </HTMLFlipBook>
        )}
      </div>

      <div className="notebook__nav">
        <button
          type="button"
          className="notebook__arrow"
          onClick={goPrev}
          disabled={isFirst}
          aria-label={content.nav.prev}
        >
          <ChevronLeft size={20} strokeWidth={1.6} />
        </button>

        <span className="notebook__counter">
          {String(pageIndex + 1).padStart(2, '0')}
          <span className="notebook__counter-sep">/</span>
          {String(Math.max(totalPages, 1)).padStart(2, '0')}
        </span>

        <button
          type="button"
          className="notebook__arrow"
          onClick={goNext}
          disabled={isLast}
          aria-label={content.nav.next}
        >
          <ChevronRight size={20} strokeWidth={1.6} />
        </button>
      </div>

      <Motion.p
        className="notebook__hint"
        animate={{ opacity: isHintVisible ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        aria-hidden="true"
      >
        {content.nav.hint}
      </Motion.p>
    </section>
  )
}

export default Notebook
