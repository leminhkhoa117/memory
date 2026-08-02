function ChapterMarker({ number, label }) {
  return (
    <div className="chapter-marker">
      <span className="chapter-marker__number" aria-hidden="true">{number}</span>
      <span className="chapter-marker__thread" aria-hidden="true">
        <i />
        <b>♡</b>
      </span>
      <span className="chapter-marker__label">{label}</span>
    </div>
  )
}

export default ChapterMarker