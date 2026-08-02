import { useEffect, useState } from 'react'

export function useTypewriter(lines, isActive = true) {
  const [lineIndex, setLineIndex] = useState(0)
  const [visibleText, setVisibleText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!isActive) {
      return undefined
    }

    const currentLine = lines[lineIndex]
    const isComplete = visibleText === currentLine
    const isEmpty = visibleText.length === 0
    let delay = isDeleting ? 34 : 62

    if (isComplete && !isDeleting) {
      delay = 4000
    } else if (isEmpty && isDeleting) {
      delay = 450
    }

    const timeout = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true)
        return
      }

      if (isEmpty && isDeleting) {
        setIsDeleting(false)
        setLineIndex((current) => (current + 1) % lines.length)
        return
      }

      const nextLength = visibleText.length + (isDeleting ? -1 : 1)
      setVisibleText(currentLine.slice(0, nextLength))
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [isActive, isDeleting, lineIndex, lines, visibleText])

  return visibleText
}