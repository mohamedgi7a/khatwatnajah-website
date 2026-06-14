'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AirVent, BriefcaseBusiness, Bug, Building2, CalendarDays, Droplets, Flower2, GraduationCap, HandPlatter, HeartPulse, PackageCheck, Paintbrush, PartyPopper, ShieldCheck, ShoppingBag, Sparkles, UtensilsCrossed, Warehouse, Wrench } from 'lucide-react'
import TypewriterText from './TypewriterText'
import { useLanguage } from './LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { ar: ['خدمات النظافة', 'نظافة دورية وعميقة للمنشآت بمواد آمنة وإشراف منظم.'], en: ['Cleaning Services', 'Daily and deep cleaning using safe materials and organized supervision.'], icon: Droplets, image: '/images/official/service-cleaning.webp' },
  { ar: ['خدمات الضيافة', 'طاقم مدرب لخدمة المكاتب، الفعاليات، والمراكز التجارية.'], en: ['Hospitality Services', 'Trained teams for offices, events, reception areas, and commercial centers.'], icon: HandPlatter, image: '/images/official/hospitality-service.webp' },
  { ar: ['مكافحة الحشرات', 'برامج مكافحة آمنة ومنظمة مع متابعة دورية حسب الحاجة.'], en: ['Pest Control', 'Safe pest control programs for facilities with scheduled follow-up.'], icon: Bug, image: '/images/official/service-pest-control.webp' },
  { ar: ['الصيانة والتشغيل', 'صيانة دورية وطارئة تشمل الكهرباء، السباكة، والتكييف.'], en: ['Maintenance and Operations', 'Scheduled and emergency electrical, plumbing, and HVAC maintenance.'], icon: Wrench, image: '/images/official/service-maintenance.webp' },
  { ar: ['الدهانات والترميم', 'أعمال داخلية وخارجية لمعالجة التشققات وتحسين جاهزية المنشأة.'], en: ['Painting and Restoration', 'Interior and exterior works that improve facility readiness.'], icon: Paintbrush, image: '/images/official/service-painting-restoration.webp' },
  { ar: ['الزراعة والتشجير', 'تنسيق المساحات الخارجية والعناية الدورية بالمزروعات.'], en: ['Landscaping and Planting', 'Outdoor landscaping, planting, and routine plant care.'], icon: Flower2, image: '/images/official/service-landscaping.webp' },
  { ar: ['نظافة الواجهات', 'تنظيف الواجهات الزجاجية والخارجية بإجراءات سلامة واضحة.'], en: ['Facade Cleaning', 'Glass and exterior facade cleaning with clear safety procedures.'], icon: Building2, image: '/images/official/service-facade-cleaning.webp' },
  { ar: ['توفير العمالة والمواد', 'عمالة مدربة ومواد وأدوات حسب احتياج المنشأة.'], en: ['Manpower and Supplies', 'Trained manpower plus cleaning and hospitality supplies.'], icon: PackageCheck, image: '/images/official/operations-team.webp' }
]

const sectors = [
  { ar: 'المجمعات السكنية', en: 'Residential Compounds', icon: Building2 },
  { ar: 'المدارس والمنشآت التعليمية', en: 'Schools and Education', icon: GraduationCap },
  { ar: 'المراكز الطبية والعيادات', en: 'Medical Centers and Clinics', icon: HeartPulse },
  { ar: 'المطاعم والكافيهات', en: 'Restaurants and Cafes', icon: UtensilsCrossed },
  { ar: 'المكاتب والشركات', en: 'Offices and Companies', icon: BriefcaseBusiness },
  { ar: 'المراكز التجارية', en: 'Shopping Centers', icon: ShoppingBag },
  { ar: 'المصانع والمستودعات', en: 'Factories and Warehouses', icon: Warehouse },
  { ar: 'الفعاليات والمعارض', en: 'Events and Exhibitions', icon: CalendarDays }
]

const seasonalServices = [
  { ar: ['تجهيز المدارس', 'استعداد متكامل قبل بداية العام الدراسي.'], en: ['School Readiness', 'Complete preparation before the school year begins.'], icon: GraduationCap, accent: 'cyan' },
  { ar: ['تنظيف عميق للمرافق', 'تنظيف شامل يعيد للموقع جاهزيته ونظافته.'], en: ['Deep Facility Cleaning', 'Comprehensive cleaning that restores site readiness.'], icon: Sparkles, accent: 'green' },
  { ar: ['مكافحة الحشرات', 'خطط وقائية مناسبة قبل موسم الصيف.'], en: ['Seasonal Pest Control', 'Preventive programs prepared before summer.'], icon: ShieldCheck, accent: 'cyan' },
  { ar: ['تجهيز الفعاليات', 'فرق وتجهيزات مرنة قبل وأثناء الفعالية.'], en: ['Event Preparation', 'Flexible teams and support before and during events.'], icon: PartyPopper, accent: 'green' },
  { ar: ['صيانة التكييف', 'فحص وصيانة استباقية قبل ارتفاع الحرارة.'], en: ['AC Maintenance', 'Preventive inspection and maintenance before peak heat.'], icon: AirVent, accent: 'cyan' },
  { ar: ['دهانات وتجديدات', 'تحديث سريع للمساحات الداخلية والخارجية.'], en: ['Painting and Renovation', 'Fast refreshes for interior and exterior spaces.'], icon: Paintbrush, accent: 'green' }
]

const process = [
  { n: '01', ar: ['فهم الاحتياج', 'نحدد نوع المنشأة، عدد المواقع، نطاق الخدمة، وساعات التشغيل المطلوبة.'], en: ['Understand the Need', 'We define the facility type, locations, service scope, and operating hours.'] },
  { n: '02', ar: ['تجهيز الفريق', 'نختار العمالة المناسبة، المشرفين، والمواد أو المعدات المطلوبة لكل موقع.'], en: ['Prepare the Team', 'We select the right manpower, supervisors, materials, and equipment.'] },
  { n: '03', ar: ['بدء التشغيل', 'نوزع المهام، نضبط الجدول، ونبدأ الخدمة بوضوح من اليوم الأول.'], en: ['Start Operations', 'Tasks are assigned, schedules are set, and service begins clearly.'] },
  { n: '04', ar: ['الإشراف والمتابعة', 'نتابع الجودة والحضور والملاحظات وسرعة الاستجابة لأي احتياج.'], en: ['Supervise and Follow Up', 'We track quality, attendance, feedback, and response speed.'] },
  { n: '05', ar: ['تحسين مستمر', 'نراجع الأداء ونعدل الخطة حسب تغير الاحتياج أو توسع نطاق الخدمة.'], en: ['Continuous Improvement', 'We review performance and adjust the plan as needs change.'] }
]

const sectionCopy = {
  ar: { teamBadge: 'فريق ميداني مدرب وإشراف واضح', about: 'من نحن', aboutTitle: 'شريك تشغيلي يساعد منشأتك على العمل بثبات وجودة.', aboutText: 'نحن شركة متخصصة في إدارة المرافق والتشغيل والصيانة في الرياض. نوفر فرقًا موثوقة، إشرافًا يوميًا، واستجابة سريعة للمنشآت التجارية والتعليمية والطبية وقطاع الضيافة.', highlights: ['فرق مدربة', 'إشراف واضح', 'حلول مرنة'], services: 'خدماتنا', servicesTitle: 'كل ما تحتاجه المنشأة للتشغيل اليومي.', servicesText: 'خدمات قابلة للتخصيص حسب حجم المنشأة، طبيعة الموقع، وساعات التشغيل.', journey: 'رحلة التشغيل', journeyTitle: 'من أول طلب إلى تشغيل مستقر، كل خطوة لها نظام.', metrics: ['فرد من القوة العاملة', 'سنوات خبرة تشغيلية', 'ساعة إشراف واستجابة'], clients: 'عملاؤنا', clientsTitle: 'شركاء وثقوا في خطوة نجاح.', quote: 'لا نوفر العمالة فقط؛ بل نقدم إشرافًا ومتابعة وتشغيلًا منظمًا يجعل إدارة المنشأة أسهل وأكثر استقرارًا.', quoteBy: 'قيمة نؤمن بها في كل موقع نخدمه' },
  en: { teamBadge: 'Trained field teams with clear supervision', about: 'About Us', aboutTitle: 'An operations partner that helps facilities run with consistency and quality.', aboutText: 'We specialize in facilities management, operations, and maintenance in Riyadh. We provide reliable teams, daily supervision, and fast response for commercial, educational, medical, and hospitality facilities.', highlights: ['Trained Teams', 'Clear Supervision', 'Flexible Solutions'], services: 'Our Services', servicesTitle: 'Everything a facility needs for daily operations.', servicesText: 'Services tailored to facility size, site requirements, and operating hours.', journey: 'Operations Journey', journeyTitle: 'From first request to stable operations, every step has a system.', metrics: ['Workforce members', 'Years of experience', 'Hours supervision and response'], clients: 'Our Clients', clientsTitle: 'Partners who trust Khatwat Najah.', quote: 'We provide more than manpower. Our supervision, follow-up, and organized operations make facility management easier and more stable.', quoteBy: 'A value we uphold at every site we serve' }
}

const extraCopy = {
  ar: {
    sectors: 'القطاعات التي نخدمها',
    sectorsTitle: 'خبرة تشغيلية تفهم طبيعة كل قطاع.',
    sectorsText: 'نكيّف فرق العمل والإشراف وخطة الخدمة حسب متطلبات منشأتك اليومية.',
    seasonal: 'خدمات موسمية',
    seasonalTitle: 'استعداد في الوقت المناسب، قبل أن يبدأ ضغط الموسم.',
    seasonalText: 'برامج مرنة ومحددة المدة تساعد منشأتك على استقبال المواسم والفعاليات بجاهزية أعلى.'
  },
  en: {
    sectors: 'Sectors We Serve',
    sectorsTitle: 'Operational experience that understands every sector.',
    sectorsText: 'We tailor teams, supervision, and service plans to your facility’s daily requirements.',
    seasonal: 'Seasonal Services',
    seasonalTitle: 'Ready at the right time, before seasonal pressure begins.',
    seasonalText: 'Flexible, time-bound programs that prepare facilities for seasons and events.'
  }
}

const clients = [
  ['اتحاد الغرف السعودية', 'client-federation-chambers.webp'],
  ['استثمر في السعودية', 'client-invest-saudi.webp'],
  ['السليمان العقارية', 'client-alsulaiman-realestate.webp'],
  ['جسد حواء', 'client-jasad-hawaa.webp'],
  ['دائرة الخبراء', 'client-experts-circle.webp'],
  ['صندوق التنمية الزراعية', 'client-agricultural-development-fund.webp'],
  ['مؤسسة الأمير محمد بن فهد', 'client-prince-mohammed-bin-fahd.webp'],
  ['مدرستي', 'client-madrasati.webp'],
  ['مكان الرشاقة', 'client-fitness-place.webp'],
  ['منارات العميد', 'client-manarat-alameed.webp'],
  ['هوب لاند', 'client-hop-land.webp']
]

function Counter({ value, prefix = '+', label }: { value: number, prefix?: string, label: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useMotionValue(0)
  const spring = useSpring(count, { duration: 1800, bounce: 0 })
  const rounded = useTransform(spring, latest => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => rounded.on('change', setDisplayValue), [rounded])
  useEffect(() => { if (inView) count.set(value) }, [inView, count, value])

  return (
    <div ref={ref} className="metric-card glass rounded-[2rem] p-7 text-center">
      <motion.div className="metric-value text-4xl font-bold text-cyanGlow md:text-5xl">{prefix}{displayValue}</motion.div>
      <div className="mt-3 text-white/75">{label}</div>
    </div>
  )
}

export default function AnimatedSections() {
  const { language } = useLanguage()
  const copy = sectionCopy[language]
  const extra = extraCopy[language]
  const servicesRef = useRef<HTMLDivElement>(null)
  const sectorsRef = useRef<HTMLDivElement>(null)
  const seasonalRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLElement>(null)
  // On mobile the sector grid is taller than the viewport, so a high visible
  // ratio can never be reached and the cards remain in their hidden state.
  const sectorsInView = useInView(sectorsRef, { once: true, amount: .12, margin: '0px 0px -8% 0px' })
  const seasonalInView = useInView(seasonalRef, { once: true, amount: .34, margin: '0px 0px -10% 0px' })
  const processInView = useInView(processRef, { once: true, margin: '-15% 0px -15% 0px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.service-card')

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(cards, { clearProps: 'all' })
        return
      }

      gsap.fromTo(cards, {
        y: index => -420 - (index % 3) * 110,
        x: index => [120, -95, 70, -125][index % 4],
        rotation: index => [-13, 10, -8, 14, -11, 8, -6, 12][index % 8],
        opacity: 0,
        scale: .9,
        transformOrigin: '50% 0%'
      }, {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 72%',
          once: true,
          invalidateOnRefresh: true
        },
        y: 0,
        x: 0,
        rotation: 0,
        opacity: 1,
        scale: 1,
        stagger: {
          each: .13,
          from: 'random'
        },
        duration: 1.35,
        ease: 'bounce.out',
        overwrite: 'auto',
        onComplete: () => gsap.set(cards, { clearProps: 'transform,opacity' })
      })
    })
    return () => context.revert()
  }, [])

  return (
    <>
      <section id="about" className="section-glow-cyan relative z-10 mx-auto max-w-7xl scroll-mt-28 px-5 py-28 md:py-40">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
          <div className="relative min-h-[480px] overflow-hidden rounded-[2.5rem] border border-white/10">
            <Image src="/images/official/operations-team.webp" alt="فريق خطوة نجاح في أحد مواقع التشغيل" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
            <p className="absolute bottom-7 right-7 rounded-full bg-navy/70 px-5 py-3 text-sm backdrop-blur-xl">{copy.teamBadge}</p>
          </div>
          <div>
            <p className="mb-5 text-sm font-semibold text-cyanGlow">{copy.about}</p>
            <h2 className="text-4xl font-bold leading-tight md:text-6xl">{copy.aboutTitle}</h2>
            <TypewriterText key={language} text={copy.aboutText} />
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {copy.highlights.map(item => <div key={item} className="glass rounded-2xl px-4 py-4 text-center font-semibold">{item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="services" ref={servicesRef} className="section-glow-green relative z-10 mx-auto max-w-7xl scroll-mt-28 px-5 py-24">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold text-cyanGlow">{copy.services}</p>
            <h2 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">{copy.servicesTitle}</h2>
          </div>
          <p className="max-w-md leading-8 text-white/62">{copy.servicesText}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ ar, en, icon: Icon, image }) => {
            const [title, desc] = language === 'ar' ? ar : en
            return (
            <article key={title} className="service-card glass group overflow-hidden rounded-[2rem]">
              <div className="relative h-52 overflow-hidden">
                <Image src={image} alt={title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent" />
                <Icon className="absolute bottom-5 right-5 text-cyanGlow" size={30} />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-white/64">{desc}</p>
              </div>
            </article>
          )})}
        </div>
      </section>

      <section id="sectors" className="section-glow-cyan relative z-10 mx-auto max-w-7xl scroll-mt-28 overflow-hidden px-5 py-20 md:py-28">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <p className="mb-4 text-sm font-semibold text-cyanGlow">{extra.sectors}</p>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">{extra.sectorsTitle}</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/62 md:mt-6 md:leading-8">{extra.sectorsText}</p>
        </div>

        <div ref={sectorsRef} className="relative grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 hidden size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyanGlow/15 blur-[70px] lg:block"
            initial={reduceMotion ? false : { opacity: 0, scale: .3 }}
            animate={sectorsInView || reduceMotion ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 1.1 }}
          />
          {sectors.map(({ ar, en, icon: Icon }, index) => (
            <motion.article
              key={en}
              initial={reduceMotion ? false : { opacity: 0, scale: .7, x: index % 4 < 2 ? 45 : -45, y: index < 4 ? 35 : -35 }}
              animate={sectorsInView || reduceMotion ? { opacity: 1, scale: 1, x: 0, y: 0 } : undefined}
              transition={{ delay: index * .09, duration: .65, type: 'spring', stiffness: 100, damping: 14 }}
              whileHover={reduceMotion ? undefined : { y: -7, scale: 1.02 }}
              className="sector-card glass relative min-h-40 overflow-hidden rounded-[1.6rem] p-5 sm:min-h-48 sm:rounded-[2rem] sm:p-6"
            >
              <div className="absolute -left-8 -top-8 size-28 rounded-full bg-cyanGlow/10 blur-2xl" />
              <div className="relative grid size-12 place-items-center rounded-xl border border-white/15 bg-white/10 text-cyanGlow shadow-glow sm:size-14 sm:rounded-2xl">
                <Icon size={26} />
              </div>
              <div className="relative mt-6 flex items-end justify-between gap-4 sm:mt-10">
                <h3 className="text-lg font-bold leading-7 sm:text-xl sm:leading-8">{language === 'ar' ? ar : en}</h3>
                <span className="text-sm font-bold text-white/25">{String(index + 1).padStart(2, '0')}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="seasonal-services" className="section-glow-green relative z-10 mx-auto max-w-7xl scroll-mt-28 px-5 py-28">
        <div className="mb-14 grid items-end gap-7 md:grid-cols-[1.25fr_.75fr]">
          <div>
            <p className="mb-4 text-sm font-semibold text-leaf">{extra.seasonal}</p>
            <h2 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">{extra.seasonalTitle}</h2>
          </div>
          <p className="leading-8 text-white/62">{extra.seasonalText}</p>
        </div>

        <div ref={seasonalRef} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1200 }}>
          {seasonalServices.map(({ ar, en, icon: Icon, accent }, index) => {
            const [title, desc] = language === 'ar' ? ar : en
            const green = accent === 'green'
            return (
              <motion.article
                key={title}
                initial={reduceMotion ? false : { opacity: 0, rotateX: -58, y: 70, scale: .92 }}
                animate={seasonalInView || reduceMotion ? { opacity: 1, rotateX: 0, y: 0, scale: 1 } : undefined}
                transition={{ delay: index * .11, duration: .8, type: 'spring', stiffness: 80, damping: 16 }}
                whileHover={reduceMotion ? undefined : { y: -8, rotateX: 3 }}
                className={`seasonal-card glass relative min-h-64 overflow-hidden rounded-[2rem] p-7 ${green ? 'seasonal-card-green' : ''}`}
                style={{ transformOrigin: '50% 100%', transformStyle: 'preserve-3d' }}
              >
                <div className={`absolute inset-x-0 top-0 h-1 ${green ? 'bg-leaf' : 'bg-cyanGlow'}`} />
                <div className={`absolute -right-10 -top-10 size-40 rounded-full blur-[55px] ${green ? 'bg-leaf/15' : 'bg-cyanGlow/15'}`} />
                <div className={`relative grid size-16 place-items-center rounded-2xl border bg-white/[.07] ${green ? 'border-leaf/30 text-leaf' : 'border-cyanGlow/30 text-cyanGlow'}`}>
                  <Icon size={31} />
                </div>
                <div className="relative mt-10">
                  <p className="mb-3 text-xs font-bold tracking-[.2em] text-white/35">{language === 'ar' ? 'خدمة موسمية' : 'SEASONAL SERVICE'}</p>
                  <h3 className="text-2xl font-bold">{title}</h3>
                  <p className="mt-3 leading-7 text-white/62">{desc}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>

      <section id="process" ref={processRef} className="section-glow-cyan relative z-10 mx-auto max-w-7xl scroll-mt-28 overflow-hidden px-5 py-28">
        <p className="mb-4 text-sm font-semibold text-cyanGlow">{copy.journey}</p>
        <h2 className="mb-14 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">{copy.journeyTitle}</h2>
        <div className="grid gap-4 lg:grid-cols-5">
          {process.map((step, index) => {
            const [title, desc] = language === 'ar' ? step.ar : step.en
            return <motion.article
              key={step.n}
              initial={reduceMotion ? false : { opacity: 0, x: index % 2 === 0 ? 180 : -180, rotate: index % 2 === 0 ? 2 : -2 }}
              animate={processInView || reduceMotion ? { opacity: 1, x: 0, rotate: 0 } : undefined}
              transition={{ delay: index * .12, duration: .85, type: 'spring', stiffness: 85, damping: 15 }}
              className="process-card glass rounded-[2rem] p-6"
            >
              <div className="process-number mb-10 text-4xl font-bold text-cyanGlow">{step.n}</div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-7">{desc}</p>
            </motion.article>
          })}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-5 md:grid-cols-3">
          <Counter value={250} label={copy.metrics[0]} />
          <Counter value={3} label={copy.metrics[1]} />
          <Counter value={24} prefix="" label={copy.metrics[2]} />
        </div>
      </section>

      <section id="clients" className="section-glow-green relative z-10 mx-auto max-w-7xl scroll-mt-28 px-5 py-28">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-semibold text-cyanGlow">{copy.clients}</p>
          <h2 className="text-4xl font-bold md:text-6xl">{copy.clientsTitle}</h2>
        </div>
        <div className="clients-marquee-wrap overflow-hidden py-4" dir="ltr">
          <div className={`clients-marquee flex w-max gap-5 ${language === 'en' ? 'clients-marquee-reverse' : ''}`}>
            {[...clients, ...clients].map(([name, file], index) => (
              <div key={`${file}-${index}`} aria-hidden={index >= clients.length} className="grid h-36 w-56 shrink-0 place-items-center rounded-[1.5rem] bg-white p-6 shadow-xl transition hover:-translate-y-1">
                <Image src={`/images/official/${file}`} alt={index < clients.length ? name : ''} width={180} height={90} className="max-h-20 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-5 py-20">
        <div className="glass rounded-[2.5rem] p-8 text-center md:p-14">
          <div className="text-2xl tracking-[.3em] text-cyanGlow">★★★★★</div>
          <blockquote className="mx-auto mt-7 max-w-3xl text-2xl font-medium leading-relaxed md:text-3xl">
            {copy.quote}
          </blockquote>
          <p className="mt-7 text-white/50">{copy.quoteBy}</p>
        </div>
      </section>
    </>
  )
}
