import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import './globals.css'

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.success-step.com'),
  title: 'خطوة نجاح | تشغيل وصيانة المرافق في الرياض',
  description: 'حلول متكاملة لإدارة المرافق والتشغيل والصيانة والنظافة والضيافة في الرياض، بفرق مدربة وإشراف على مدار الساعة.',
  keywords: ['إدارة المرافق', 'تشغيل وصيانة', 'خدمات النظافة', 'الرياض', 'خطوة نجاح'],
  verification: { google: '5046a073c2562fb2' },
  alternates: { canonical: 'https://www.success-step.com/' },
  openGraph: {
    title: 'خطوة نجاح | شريكك الموثوق لإدارة المرافق',
    description: 'فرق مدربة وخدمات تشغيل وصيانة منظمة للمنشآت في الرياض.',
    locale: 'ar_SA',
    type: 'website',
    images: ['/images/official/og-cover.webp']
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={arabic.variable}>{children}</body>
    </html>
  )
}
