import { Heart } from 'lucide-react'

/** Con dấu sáp hình trái tim, dùng chung cho bìa sổ và phong thư. */
function WaxSeal({ className = '' }) {
  return (
    <span className={`wax-seal ${className}`.trim()} aria-hidden="true">
      <Heart className="wax-seal__mark" fill="currentColor" strokeWidth={0} />
    </span>
  )
}

export default WaxSeal
