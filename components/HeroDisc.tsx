import Image from 'next/image'

const images = [
  '/images/official/operations-team.webp',
  '/images/official/service-cleaning.webp',
  '/images/official/hospitality-service.webp',
  '/images/official/service-maintenance.webp',
  '/images/official/service-landscaping.webp',
  '/images/official/service-facade-cleaning.webp'
]

export default function HeroDisc() {
  return (
    <div className="relative aspect-square w-[82vw] max-w-[700px] md:w-[48vw] md:-translate-x-[12%]">
      <div className="absolute inset-0 rounded-full bg-cyanGlow/20 blur-[90px]" />
      <div className="disc-outer disc-shell absolute inset-0 rounded-full border border-white/20 shadow-[0_0_120px_rgba(25,215,230,.20)]">
        <div className="absolute inset-[4%] rounded-full border border-white/15 bg-white/5" />
        <div className="absolute inset-[12%] overflow-hidden rounded-full border border-white/10 bg-navy/40">
          {images.map((src, index) => (
            <Image key={src} src={src} alt={index === 0 ? 'فريق خطوة نجاح للتشغيل والصيانة' : 'إحدى خدمات خطوة نجاح'} fill sizes="(max-width: 768px) 70vw, 45vw" className="reveal-image absolute inset-0 object-cover opacity-0" priority={index === 0} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-tr from-navy/55 via-transparent to-cyanGlow/15" />
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 z-10 grid size-[27%] -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-full border border-white/40 bg-white/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.75),0_0_50px_rgba(25,215,230,.24),0_24px_60px_rgba(0,0,0,.22)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/55 via-white/15 to-cyanGlow/10" />
        <div className="pointer-events-none absolute inset-[7%] rounded-full border border-white/20" />
        <Image src="/images/official/logo-transparent.webp" alt="خطوة نجاح" width={240} height={160} className="relative z-10 w-full object-contain drop-shadow-[0_6px_12px_rgba(0,32,72,.12)]" priority />
      </div>
    </div>
  )
}
