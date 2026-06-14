'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ArrowDownLeft, Clock3, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Music2, Phone } from 'lucide-react'
import Header from '@/components/Header'
import HeroDisc from '@/components/HeroDisc'
import Ambient from '@/components/Ambient'
import ContactForm from '@/components/ContactForm'
import { LanguageProvider, useLanguage } from '@/components/LanguageContext'

const AnimatedSections = dynamic(() => import('@/components/AnimatedSections'), { ssr: false })

const content = {
  ar: {
    eyebrow: 'تشغيل وصيانة مرافق في الرياض', hero: ['منشأتك تعمل', 'بثبات. وجودة.', 'على مدار الساعة.'], heroCopy: 'فرق مدربة وخدمات منظمة تشمل التشغيل، النظافة، الصيانة، الضيافة، مكافحة الحشرات، وتوفير المواد والأدوات.', quote: 'اطلب عرض سعر', whatsapp: 'تواصل واتساب', support: 'إشراف واستجابة 24/7', city: 'الرياض',
    faqLabel: 'الأسئلة الشائعة', faqTitle: 'كل ما تحتاج معرفته قبل طلب الخدمة.', faqs: [
      ['ما هي الخدمات التي تقدمها خطوة نجاح؟', 'نقدم حلول إدارة وتشغيل المرافق، وتشمل خدمات النظافة، الصيانة، مكافحة الحشرات، تنظيف الواجهات، الضيافة، الدعم الميداني، وتوفير العمالة التشغيلية حسب احتياج المنشأة.'],
      ['هل تقدمون خدماتكم داخل الرياض فقط؟', 'نركز حالياً على تقديم خدماتنا داخل مدينة الرياض، مع إمكانية دراسة بعض الطلبات الخاصة حسب حجم المشروع وموقع المنشأة.'],
      ['هل توفرون عقود شهرية لإدارة المرافق؟', 'نعم، نوفر عقود تشغيل شهرية أو طويلة المدى حسب طبيعة المنشأة وحجم الخدمات المطلوبة، مع تحديد نطاق العمل بوضوح قبل بدء التعاقد.'],
      ['هل يمكن طلب معاينة للموقع قبل عرض السعر؟', 'نعم، يمكن ترتيب معاينة للموقع أو مناقشة تفاصيل الاحتياج عن بُعد، ثم يتم تقديم عرض سعر مناسب بناءً على حجم العمل وعدد العمالة ونوع الخدمة المطلوبة.'],
      ['هل توفرون عمالة نظافة مع مشرف؟', 'نعم، نوفر فرق نظافة وتشغيل مع إمكانية توفير مشرف لمتابعة جودة العمل وتنظيم المهام اليومية حسب احتياج العميل.'],
      ['هل تشمل الخدمة مواد النظافة والمعدات؟', 'يمكن توفير الخدمة بالعمالة فقط أو مع مواد النظافة والمعدات، وذلك حسب الاتفاق ونوع العقد المطلوب.'],
      ['هل تقدمون خدمات الصيانة مثل الكهرباء والسباكة والتكييف؟', 'نعم، نقدم خدمات الصيانة والتشغيل، وتشمل أعمال الكهرباء، السباكة، التكييف، والمتابعة الفنية حسب احتياج المنشأة.'],
      ['هل تقدمون مكافحة الحشرات وتنظيف الواجهات؟', 'نعم، نقدم خدمات مكافحة الحشرات وتنظيف الواجهات ضمن حلول إدارة المرافق، سواء كخدمة مستقلة أو ضمن عقد تشغيل متكامل.'],
      ['ما القطاعات التي تخدمونها؟', 'نخدم قطاعات متعددة مثل المدارس، المراكز الطبية، المطاعم والكافيهات، المكاتب، المجمعات السكنية، المراكز التجارية، المصانع، والفعاليات.'],
      ['كيف يمكنني طلب عرض سعر؟', 'يمكنك طلب عرض سعر عبر نموذج التواصل في الموقع أو من خلال زر الواتساب، وسيتم التواصل معك لمعرفة التفاصيل وتقديم العرض المناسب.']
    ],
    contact: 'تواصل معنا', contactTitle: 'احصل على عرض سعر مخصص لاحتياج منشأتك.', contactCopy: 'أرسل تفاصيل الموقع والخدمة المطلوبة، وسيتواصل معك فريق خطوة نجاح في أقرب وقت.', address: 'الرياض - العليا، طريق الملك فهد', map: 'موقعنا على خرائط Google', brand: 'خطوة نجاح', footer: 'حلول تشغيل وصيانة ونظافة وضيافة للمنشآت في الرياض.', rights: '© 2026 خطوة نجاح. جميع الحقوق محفوظة.', follow: 'تابعنا'
  },
  en: {
    eyebrow: 'Facilities operations and maintenance in Riyadh', hero: ['Your facility runs', 'consistently. efficiently.', 'around the clock.'], heroCopy: 'Trained teams and organized services covering operations, cleaning, maintenance, hospitality, pest control, and supplies.', quote: 'Request a Quote', whatsapp: 'Contact on WhatsApp', support: '24/7 supervision and response', city: 'Riyadh',
    faqLabel: 'Frequently Asked Questions', faqTitle: 'Everything you need to know before requesting service.', faqs: [
      ['What services does Khatwat Najah provide?', 'We provide facility management and operations solutions including cleaning, maintenance, pest control, facade cleaning, hospitality, field support, and operational manpower tailored to facility needs.'],
      ['Do you only provide services in Riyadh?', 'We currently focus on Riyadh, while selected requests may be considered based on project size and facility location.'],
      ['Do you offer monthly facility management contracts?', 'Yes. We offer monthly and long-term operating contracts based on the facility and required services, with a clearly defined scope before contracting.'],
      ['Can I request a site inspection before receiving a quote?', 'Yes. We can arrange a site inspection or discuss requirements remotely, then prepare a suitable quote based on workload, manpower, and service type.'],
      ['Do you provide supervised cleaning teams?', 'Yes. We provide cleaning and operations teams with an optional supervisor to monitor quality and organize daily tasks.'],
      ['Do services include cleaning materials and equipment?', 'Services can be supplied as manpower only or with cleaning materials and equipment, depending on the agreement and contract type.'],
      ['Do you provide electrical, plumbing, and AC maintenance?', 'Yes. Our maintenance and operations services include electrical, plumbing, air-conditioning, and technical follow-up according to facility needs.'],
      ['Do you provide pest control and facade cleaning?', 'Yes. Both are available as standalone services or as part of an integrated facility operations contract.'],
      ['Which sectors do you serve?', 'We serve schools, medical centers, restaurants and cafes, offices, residential compounds, shopping centers, factories, and events.'],
      ['How can I request a quote?', 'Submit the contact form or use the WhatsApp button. Our team will contact you to collect details and provide a suitable quote.']
    ],
    contact: 'Contact Us', contactTitle: 'Get a quote tailored to your facility.', contactCopy: 'Share the site details and required service, and the Khatwat Najah team will contact you as soon as possible.', address: 'Riyadh - Al Olaya, King Fahd Road', map: 'Find us on Google Maps', brand: 'Khatwat Najah', footer: 'Operations, maintenance, cleaning, and hospitality solutions for facilities in Riyadh.', rights: '© 2026 Khatwat Najah. All rights reserved.', follow: 'Follow Us'
  }
}

function HomeContent() {
  const { language } = useLanguage()
  const copy = content[language]

  return (
    <main id="home" className="relative min-h-screen overflow-hidden">
      <Ambient />
      <Header />
      <section className="relative z-10 grid min-h-screen items-center gap-10 px-5 pb-20 pt-36 md:grid-cols-[.95fr_1.05fr] md:px-10 lg:px-20">
        <div className="order-2 flex justify-center md:col-start-2 md:row-start-1 md:justify-start"><HeroDisc /></div>
        <div className="order-1 mx-auto max-w-3xl md:col-start-1 md:row-start-1 md:mx-0">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyanGlow/25 bg-cyanGlow/10 px-4 py-2 text-sm text-cyanGlow backdrop-blur-xl"><span className="size-2 rounded-full bg-leaf shadow-[0_0_18px_rgba(99,200,35,.8)]" />{copy.eyebrow}</div>
          <h1 className="text-5xl font-bold leading-[1.08] tracking-[-.04em] md:text-7xl lg:text-8xl">{copy.hero[0]}<br /><span className="text-white/75">{copy.hero[1]}</span><br /><span className="bg-gradient-to-l from-cyanGlow via-brightBlue to-white bg-clip-text text-transparent">{copy.hero[2]}</span></h1>
          <p className="mt-8 max-w-2xl text-xl leading-9 text-white/68 md:text-2xl">{copy.heroCopy}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contact" className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 font-semibold text-navy shadow-glow transition hover:-translate-y-1">{copy.quote} <ArrowDownLeft size={18} /></a>
            <a href="https://wa.me/966534012126" target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-3 rounded-full px-7 py-4 font-semibold transition hover:-translate-y-1">{copy.whatsapp} <MessageCircle size={18} /></a>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/50"><span className="inline-flex items-center gap-2"><Clock3 size={16} className="text-cyanGlow" /> {copy.support}</span><span className="inline-flex items-center gap-2"><MapPin size={16} className="text-cyanGlow" /> {copy.city}</span></div>
        </div>
      </section>

      <AnimatedSections />

      <section className="relative z-10 mx-auto max-w-5xl px-5 py-24">
        <div className="mb-12 text-center"><p className="mb-4 text-sm font-semibold text-cyanGlow">{copy.faqLabel}</p><h2 className="text-4xl font-bold md:text-6xl">{copy.faqTitle}</h2></div>
        <div className="grid items-start gap-4 md:grid-cols-2">{copy.faqs.map(([q, a], index) => <details key={q} className="faq-item glass group rounded-[1.7rem] p-6"><summary className="flex cursor-pointer list-none items-center gap-4 text-lg font-bold marker:hidden"><span className="grid size-9 shrink-0 place-items-center rounded-full border border-cyanGlow/25 bg-cyanGlow/10 text-sm text-cyanGlow">{String(index + 1).padStart(2, '0')}</span><span className="flex-1">{q}</span><span className="faq-plus text-2xl font-light text-cyanGlow transition-transform">+</span></summary><p className="mt-4 border-t border-white/10 pt-4 leading-8 text-white/62">{a}</p></details>)}</div>
      </section>

      <section id="contact" className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-5 py-28">
        <div className="glass overflow-hidden rounded-[3rem] p-6 md:p-12"><div className="grid gap-12 md:grid-cols-[.9fr_1.1fr]">
          <div><p className="mb-4 text-sm font-semibold text-cyanGlow">{copy.contact}</p><h2 className="text-4xl font-bold leading-tight md:text-6xl">{copy.contactTitle}</h2><p className="mt-6 max-w-lg leading-8 text-white/62">{copy.contactCopy}</p>
            <div className="mt-10 space-y-4 text-white/72">
              {['+966550524765', '+966534012126', '+966541163213'].map(number => <a key={number} href={`tel:${number}`} className="flex items-center gap-3 transition hover:text-cyanGlow"><Phone size={19} /><span dir="ltr">{number.replace('+966', '+966 ')}</span></a>)}
              <a href="mailto:info@success-step.com" className="flex items-center gap-3 transition hover:text-cyanGlow"><Mail size={19} /> info@success-step.com</a>
              <a href="https://maps.app.goo.gl/x9iXmc7xBkBz4Cuf7" target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-cyanGlow"><MapPin size={19} /> {copy.address}</a>
            </div>
          </div>
          <ContactForm />
        </div></div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-5 py-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto_auto] md:items-center">
          <div className="flex items-center gap-4"><Image src="/images/official/logo-transparent.webp" alt="Khatwat Najah" width={150} height={70} className="h-14 w-auto object-contain" /><div><p className="font-bold">{copy.brand}</p><p className="mt-1 max-w-lg text-sm text-white/50">{copy.footer}</p></div></div>
          <div><p className="mb-3 text-sm font-semibold">{copy.follow}</p><div className="flex flex-wrap gap-3"><a href="https://www.facebook.com/k.najahFM/" target="_blank" rel="noreferrer" aria-label="Facebook" className="glass grid size-10 place-items-center rounded-full transition hover:-translate-y-1 hover:text-cyanGlow"><Facebook size={18} /></a><a href="https://www.instagram.com/khatwatnajah/" target="_blank" rel="noreferrer" aria-label="Instagram" className="glass grid size-10 place-items-center rounded-full transition hover:-translate-y-1 hover:text-cyanGlow"><Instagram size={18} /></a><a href="https://x.com/KhatwatNajah" target="_blank" rel="noreferrer" aria-label="X" className="glass grid size-10 place-items-center rounded-full font-bold transition hover:-translate-y-1 hover:text-cyanGlow">X</a><a href="https://www.linkedin.com/company/success-step" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="glass grid size-10 place-items-center rounded-full transition hover:-translate-y-1 hover:text-cyanGlow"><Linkedin size={18} /></a><a href="https://www.tiktok.com/@khatwatnajah" target="_blank" rel="noreferrer" aria-label="TikTok" className="glass grid size-10 place-items-center rounded-full transition hover:-translate-y-1 hover:text-cyanGlow"><Music2 size={18} /></a></div></div>
          <div className="text-sm text-white/45"><p>{copy.rights}</p><a href="https://maps.app.goo.gl/x9iXmc7xBkBz4Cuf7" target="_blank" rel="noreferrer" className="mt-2 block hover:text-cyanGlow">{copy.map}</a></div>
        </div>
      </footer>
    </main>
  )
}

export default function Home() {
  return <LanguageProvider><HomeContent /></LanguageProvider>
}
