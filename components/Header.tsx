'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Languages, Menu, MessageCircle, X } from 'lucide-react'
import { useLanguage } from './LanguageContext'

const labels = {
  ar: { nav: [['الرئيسية', 'home'], ['من نحن', 'about'], ['الخدمات', 'services'], ['آلية العمل', 'process'], ['عملاؤنا', 'clients'], ['التواصل', 'contact']], whatsapp: 'تواصل واتساب', open: 'فتح القائمة', close: 'إغلاق القائمة', aria: 'التنقل الرئيسي' },
  en: { nav: [['Home', 'home'], ['About', 'about'], ['Services', 'services'], ['Process', 'process'], ['Clients', 'clients'], ['Contact', 'contact']], whatsapp: 'WhatsApp', open: 'Open menu', close: 'Close menu', aria: 'Main navigation' }
} as const

export default function Header() {
  const [open, setOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const copy = labels[language]

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', closeOnDesktop)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', closeOnDesktop)
    }
  }, [open])

  return (
    <>
        {open && (
          <button
            type="button"
            aria-label={copy.close}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm lg:hidden"
          />
        )}

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
        <div className="pointer-events-auto mx-auto w-full max-w-[1120px]">
      <nav className="glass flex items-center justify-between rounded-full px-4 py-3 md:px-6" aria-label={copy.aria}>
        <a href="#home" onClick={() => setOpen(false)} className="flex items-center" aria-label="Khatwat Najah">
          <Image src="/images/official/logo-transparent.webp" alt="Khatwat Najah" width={126} height={54} className="h-10 w-auto object-contain" priority />
        </a>
        <div className="hidden items-center gap-6 text-sm text-white/75 lg:flex">
          {copy.nav.map(([label, id]) => <a key={id} href={`#${id}`} className="transition hover:text-cyanGlow">{label}</a>)}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <button type="button" onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold" aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}>
            <Languages size={17} /> {language === 'ar' ? 'EN' : 'عربي'}
          </button>
          <a href="https://wa.me/966534012126" target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy shadow-glow transition hover:scale-[1.03] lg:inline-flex">
            <MessageCircle size={17} /> {copy.whatsapp}
          </a>
        </div>
        <button type="button" className="glass grid size-11 place-items-center rounded-full lg:hidden" aria-label={open ? copy.close : copy.open} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
        {open && (
          <div id="mobile-navigation" className="glass mobile-menu-enter mt-3 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-[2rem] p-3 lg:hidden">
            {copy.nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block rounded-2xl px-5 py-3 text-white/80 transition hover:bg-white/10 hover:text-white">{label}</a>)}
            <button type="button" onClick={() => { setLanguage(language === 'ar' ? 'en' : 'ar'); setOpen(false) }} className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 px-5 py-3 font-bold">
              <Languages size={18} /> {language === 'ar' ? 'English' : 'العربية'}
            </button>
            <a href="https://wa.me/966534012126" target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-cyanGlow px-5 py-3 font-bold text-navy"><MessageCircle size={18} /> {copy.whatsapp}</a>
          </div>
        )}
        </div>
      </header>
    </>
  )
}
