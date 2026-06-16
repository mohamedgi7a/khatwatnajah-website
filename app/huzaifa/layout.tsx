import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حذيفة محمد | مدير مرافق ومهندس معماري أول',
  description: 'الملف المهني لحذيفة محمد في إدارة المرافق والهندسة المعمارية وإدارة المشاريع.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'حذيفة محمد | Huzaifa Mohamed',
    description: 'Facilities Management, Architecture & Project Management',
    images: ['/huzaifa/assets/img/og-huzaifa.webp']
  },
  icons: { icon: '/huzaifa/assets/img/favicon.svg' }
}

export default function HuzaifaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/huzaifa/assets/css/style.css" />
      {children}
    </>
  )
}
