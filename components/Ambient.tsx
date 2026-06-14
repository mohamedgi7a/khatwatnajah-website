export default function Ambient() {
  const particles = Array.from({ length: 36 }, (_, i) => ({
    x: `${(i * 37) % 100}%`,
    y: `${(i * 61) % 100}%`,
    tx: `${((i % 7) - 3) * 18}px`,
    ty: `${((i % 5) - 2) * 22}px`,
    duration: `${5 + (i % 8)}s`
  }))
  return (
    <div className="ambient-particles pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p, i) => <span key={i} style={{ '--x': p.x, '--y': p.y, '--tx': p.tx, '--ty': p.ty, '--duration': p.duration } as React.CSSProperties} />)}
      <div className="absolute -left-40 top-24 h-px w-[70vw] rotate-[-18deg] bg-gradient-to-r from-transparent via-cyanGlow/30 to-transparent blur-[1px]" />
      <div className="absolute right-0 top-[38%] h-px w-[55vw] rotate-[15deg] bg-gradient-to-r from-transparent via-brandBlue/35 to-transparent blur-[1px]" />
    </div>
  )
}
