// The original "ml" wordmark with its signal square, now lit like a status LED.
export default function Logo({ size = 46 }: { size?: number }) {
  return (
    <span className="wordmark" style={{ fontSize: size }} aria-hidden="true">
      m<span>l</span>
      <i />
    </span>
  )
}
