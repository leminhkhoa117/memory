import { useEffect, useState } from 'react'

export function useSequentialTypewriter(
  lines,
  isActive,
  { characterDelay = 27, linePause = 1100, startDelay = 1400, reducedMotion = false } = {},
) {
  const [typedLines, setTypedLines] = useState(() => lines.map(() => ''))
  const [activeLineIndex, setActiveLineIndex] = useState(-1)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeout
    let lineIndex = 0
    let characterIndex = 0

    setTypedLines(lines.map(() => ''))
    setActiveLineIndex(-1)
    setIsComplete(false)

    if (!isActive) {
      return undefined
    }

    if (reducedMotion) {
      setTypedLines(lines)
      setIsComplete(true)
      return undefined
    }

    const typeCharacter = () => {
      characterIndex += 1
      const currentLineIndex = lineIndex
      const currentCharacterIndex = characterIndex

      setActiveLineIndex(currentLineIndex)
      setTypedLines((currentLines) => {
        const nextLines = [...currentLines]
        nextLines[currentLineIndex] = lines[currentLineIndex].slice(0, currentCharacterIndex)
        return nextLines
      })

      if (currentCharacterIndex < lines[currentLineIndex].length) {
        timeout = window.setTimeout(typeCharacter, characterDelay)
        return
      }

      setTypedLines((currentLines) => {
        const completedLines = [...currentLines]
        completedLines[currentLineIndex] = lines[currentLineIndex]
        return completedLines
      })

      if (currentLineIndex < lines.length - 1) {
        lineIndex += 1
        characterIndex = 0
        timeout = window.setTimeout(typeCharacter, linePause)
        return
      }

      setActiveLineIndex(-1)
      timeout = window.setTimeout(() => setIsComplete(true), linePause)
    }

    timeout = window.setTimeout(typeCharacter, startDelay)
    return () => window.clearTimeout(timeout)
  }, [characterDelay, isActive, linePause, lines, reducedMotion, startDelay])

  return { typedLines, activeLineIndex, isComplete }
}