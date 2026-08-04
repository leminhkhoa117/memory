import { useEffect, useState } from 'react'

/** Tỉ lệ ngang / dọc của một trang giấy. */
const PAGE_RATIO = 0.735

/** Dưới ngưỡng này thì không đủ chỗ cho hai trang mở cùng lúc. */
const SPREAD_MIN_WIDTH = 720

const PAGE_MAX_WIDTH = 560
const PAGE_MAX_HEIGHT = 780

/**
 * Đo khung chứa rồi tính ra kích thước trang vừa vặn, thay vì để react-pageflip
 * tự co giãn theo chiều ngang (dễ tràn đáy trên màn hình thấp).
 */
export function useNotebookSize(containerRef) {
  const [size, setSize] = useState(null)

  useEffect(() => {
    const node = containerRef.current
    if (!node) {
      return undefined
    }

    const measure = () => {
      const { width, height } = node.getBoundingClientRect()
      if (width < 40 || height < 40) {
        return
      }

      const isNarrow = width < SPREAD_MIN_WIDTH
      // Ưu tiên lấp đầy chiều cao, sau đó mới thu lại nếu thiếu chiều ngang.
      let pageHeight = Math.min(height, PAGE_MAX_HEIGHT)
      let pageWidth = pageHeight * PAGE_RATIO

      const availableWidth = isNarrow ? width : width / 2
      if (pageWidth > availableWidth) {
        pageWidth = availableWidth
        pageHeight = pageWidth / PAGE_RATIO
      }

      pageWidth = Math.min(pageWidth, PAGE_MAX_WIDTH)
      pageHeight = Math.min(pageWidth / PAGE_RATIO, height)

      setSize({
        width: Math.round(pageWidth),
        height: Math.round(pageHeight),
        stageHeight: Math.round(height),
        // react-pageflip chỉ mở đôi khi khung chứa đủ chỗ cho hai trang.
        isPortrait: width < pageWidth * 2,
      })
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [containerRef])

  return size
}
