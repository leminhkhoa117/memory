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

function PageContent({ page, seal, isActive }) {
  if (page.kind === 'photo') {
    return (
      <figure className="nb-media nb-photo">
        <span className="nb-photo__tape" aria-hidden="true" />

        <div className="nb-photo__frame">
          <img src={page.image} alt={page.alt} loading="lazy" />
        </div>

        {page.caption && (
          <figcaption className="nb-media__caption">
            {page.index && <span className="nb-media__index">{page.index}</span>}
            {page.caption}
          </figcaption>
        )}
      </figure>
    )
  }

  if (page.kind === 'video') {
    return <NotebookVideo page={page} isActive={isActive} />
  }

  if (page.kind === 'quotes') {
    return (
      <ul className="nb-quotes">
        {page.quotes.map((quote) => (
          <li key={quote} className="nb-quotes__item">
            {quote}
          </li>
        ))}
      </ul>
    )
  }

  if (page.kind === 'note') {
    return <p className="nb-standalone">{page.note}</p>
  }

  if (page.kind === 'letter') {
    return (
      <div className="nb-letter">
        <p className="nb-paper__eyebrow">{page.eyebrow}</p>
        <span className="nb-letter__envelope" aria-hidden="true">
          <span className="nb-letter__seal">{seal.mark}</span>
        </span>
      </div>
    )
  }

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
    </>
  )
}

export default PageContent
