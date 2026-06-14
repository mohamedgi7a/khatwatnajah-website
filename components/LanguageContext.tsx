'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export type Language = 'ar' | 'en'

const LanguageContext = createContext<{ language: Language, setLanguage: (language: Language) => void } | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem('site-language')
    if (saved === 'ar' || saved === 'en') setLanguage(saved)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return

    const applyLanguage = () => {
      document.documentElement.lang = language
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
      document.title = language === 'ar'
        ? 'خطوة نجاح | تشغيل وصيانة المرافق في الرياض'
        : 'Khatwat Najah | Facilities Maintenance in Riyadh'
      const description = document.querySelector('meta[name="description"]')
      description?.setAttribute('content', language === 'ar'
        ? 'حلول متكاملة لإدارة المرافق والتشغيل والصيانة والنظافة والضيافة في الرياض، بفرق مدربة وإشراف على مدار الساعة.'
        : 'Facilities management, maintenance, cleaning, hospitality, pest control, manpower, and supply services in Riyadh.')
    }

    applyLanguage()
    const timer = window.setTimeout(applyLanguage, 250)
    window.localStorage.setItem('site-language', language)
    return () => window.clearTimeout(timer)
  }, [language, ready])

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
