import type { Metadata } from 'next'
import HuzaifaDocument from '../HuzaifaDocument'

export const metadata: Metadata = {
  title: 'المشاريع | حذيفة محمد',
  description: 'مشاريع وخبرات حذيفة محمد في إدارة المرافق والهندسة المعمارية وإدارة المشاريع.',
  robots: { index: true, follow: true }
}

export default function HuzaifaProjectsPage() {
  return <HuzaifaDocument page="projects" />
}
