import { forwardRef } from 'react'

/** react-pageflip cần mỗi trang là một DOM node nhận được ref. */
const NotebookPage = forwardRef(function NotebookPage({ variant = 'paper', side, children }, ref) {
  return (
    <div
      className={`nb-page nb-page--${variant}${side ? ` nb-page--${side}` : ''}`}
      ref={ref}
      data-density={variant === 'paper' ? 'soft' : 'hard'}
    >
      <div className="nb-page__surface">{children}</div>
    </div>
  )
})

export default NotebookPage
