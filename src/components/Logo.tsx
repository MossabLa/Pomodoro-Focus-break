// The layered monogram: interface on top, system beneath, data at the base.
export default function Logo({ size = 44 }: { size?: number }) {
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 46 46"
      aria-hidden="true"
    >
      <polygon className="logo-top" points="23,3 42,14 23,25 4,14" />
      <polygon
        className="logo-mid"
        points="23,12 42,23 23,34 4,23"
        fill="none"
        strokeWidth="1.5"
      />
      <polygon
        className="logo-base"
        points="23,21 42,32 23,43 4,32"
        fill="none"
        strokeWidth="1.5"
        strokeDasharray="2 3"
      />
      <circle className="logo-dot" cx="23" cy="14" r="3.2" />
    </svg>
  )
}
