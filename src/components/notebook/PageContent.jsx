import { useEffect, useRef } from 'react'

function NotebookVideo({ page, isActive }) {
  const videoRef = useRef(null)

  // Chỉ chạy khi trang này đang được mở, lật qua trang khác thì dừng lại.
  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }

    if (isActive) {
      video.play().catch(() => undefined)
    } else {
      video.pause()
    }
  }, [isActive])

  return (
    <figure className="nb-media nb-video">
      <p className="nb-paper__eyebrow">{page.eyebrow}</p>

      <div className="nb-video__frame">
        <video
          ref={videoRef}
          src={page.src}
          poster={page.poster}
          muted
          playsInline
          loop
          preload="metadata"
          aria-label="Một khoảnh khắc đáng nhớ của hai chúng ta"
        />
      </div>

      <figcaption className="nb-media__caption">{page.caption}</figcaption>
    </figure>
  )
}

function PhotoFrame({ page }) {
  return (
    <div className="nb-photo__frame">
      <span className="nb-photo__tape" aria-hidden="true" />
      <img src={page.image} alt={page.alt} loading="lazy" />
    </div>
  )
}

function TextBlock({ page }) {
  return (
    <>
      {page.chapter && (
        <p className="nb-paper__eyebrow">
          <span className="nb-paper__chapter">{page.chapter.number}</span>
          {page.chapter.label}
        </p>
      )}

      {page.eyebrow && !page.chapter && <p className="nb-paper__eyebrow">{page.eyebrow}</p>}
      {page.eyebrow && page.chapter && <p className="nb-paper__date">{page.eyebrow}</p>}

      <h3 className="nb-paper__title">{page.title}</h3>

      {page.lines.map((line) => (
        <p key={line} className="nb-paper__note">
          {line}
        </p>
      ))}

      {page.note && <p className="nb-paper__closing">{page.note}</p>}
    </>
  )
}

function PageContent({ page, seal, isActive, onOpenLetter }) {
  if (page.kind === 'photo') {
    return (
      <figure className="nb-media nb-photo">
        <PhotoFrame page={page} />

        {page.caption && (
          <figcaption className="nb-media__caption">
            {page.index && <span className="nb-media__index">{page.index}</span>}
            {page.caption}
          </figcaption>
        )}
      </figure>
    )
  }

  if (page.kind === 'photoText') {
    return (
      <div className="nb-photo-text">
        <PhotoFrame page={page} />
        <div className="nb-photo-text__body">
          <TextBlock page={page} />
        </div>
      </div>
    )
  }

  if (page.kind === 'video') {
    return <NotebookVideo page={page} isActive={isActive} />
  }

  if (page.kind === 'quotes') {
    return (
      <ul className="nb-scraps">
        {page.quotes.map((quote) => (
          <li key={quote} className="nb-scrap">
            <span className="nb-scrap__text">{quote}</span>
          </li>
        ))}
      </ul>
    )
  }

  if (page.kind === 'letter') {
    return (
      <div className="nb-letter">
        <p className="nb-paper__eyebrow">{page.eyebrow}</p>

        <button type="button" className="nb-letter__envelope" onClick={onOpenLetter}>
          <span className="nb-letter__flap" aria-hidden="true" />
          <span className="nb-letter__seal" aria-hidden="true">
            {seal.mark}
          </span>
        </button>

        <span className="nb-letter__hint">Chạm để cầm lá thư lên</span>
      </div>
    )
  }

  return <TextBlock page={page} />
}

export default PageContent
