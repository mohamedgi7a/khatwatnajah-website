'use client'

import { FormEvent, useState } from 'react'
import { Send } from 'lucide-react'
import { useLanguage } from './LanguageContext'

const copy = {
  ar: { name: 'الاسم', nameP: 'اكتب اسمك الكامل', company: 'اسم المنشأة', companyP: 'اسم المنشأة أو الشركة', phone: 'رقم الجوال', service: 'نوع الخدمة', choose: 'اختر نوع الخدمة', message: 'تفاصيل الطلب', messageP: 'اكتب احتياجك أو عدد المواقع أو نوع المنشأة', submit: 'إرسال الطلب', sending: 'جاري الإرسال...', note: 'بعد إرسال الطلب، سيتواصل معك فريق خطوة نجاح في أقرب وقت.', success: 'تم إرسال طلبك بنجاح. سيتواصل معك الفريق قريبًا.', error: 'تعذر إرسال الطلب. تواصل معنا مباشرة عبر واتساب.', services: ['توفير الموارد البشرية', 'خدمات النظافة', 'الصيانة والتشغيل', 'الدهانات والترميم', 'خدمات الضيافة', 'مكافحة الحشرات', 'الزراعة والتشجير', 'نظافة الواجهات', 'توفير المواد والأدوات'] },
  en: { name: 'Name', nameP: 'Enter your full name', company: 'Company Name', companyP: 'Facility or company name', phone: 'Mobile Number', service: 'Service Type', choose: 'Select a service', message: 'Request Details', messageP: 'Share your need, number of locations, or facility type', submit: 'Send Request', sending: 'Sending...', note: 'After submitting, the Khatwat Najah team will contact you as soon as possible.', success: 'Your request was sent successfully. Our team will contact you soon.', error: 'Could not send the request. Please contact us through WhatsApp.', services: ['Manpower Supply', 'Cleaning Services', 'Maintenance and Operations', 'Painting and Restoration', 'Hospitality Services', 'Pest Control', 'Landscaping and Planting', 'Facade Cleaning', 'Materials and Tools Supply'] }
}

export default function ContactForm() {
  const { language } = useLanguage()
  const text = copy[language]
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    const form = event.currentTarget
    try {
      const response = await fetch('https://formspree.io/f/mjgldzwa', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error('Submission failed')
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const fieldClass = 'w-full rounded-2xl border border-white/15 bg-[#091c36] px-5 py-4 text-white caret-cyanGlow outline-none transition placeholder:text-white/45 focus:border-cyanGlow focus:bg-[#0d2748]'

  return (
    <form className="grid gap-4 rounded-[2rem] bg-[#06152c]/80 p-5 md:p-7" onSubmit={handleSubmit}>
      <input type="hidden" name="language" value={language} />
      <label className="grid gap-2 text-sm text-white/70"><span>{text.name}</span><input name="name" required className={fieldClass} placeholder={text.nameP} /></label>
      <label className="grid gap-2 text-sm text-white/70"><span>{text.company}</span><input name="company" required className={fieldClass} placeholder={text.companyP} /></label>
      <label className="grid gap-2 text-sm text-white/70"><span>{text.phone}</span><input name="phone" type="tel" required inputMode="tel" className={fieldClass} placeholder="+966 5X XXX XXXX" /></label>
      <label className="grid gap-2 text-sm text-white/70"><span>{text.service}</span><select name="service" required defaultValue="" className={fieldClass}><option value="" disabled>{text.choose}</option>{text.services.map(service => <option key={service} className="bg-[#091c36] text-white">{service}</option>)}</select></label>
      <label className="grid gap-2 text-sm text-white/70"><span>{text.message}</span><textarea name="message" rows={5} className={fieldClass} placeholder={text.messageP} /></label>
      <button disabled={status === 'sending'} className="inline-flex items-center justify-center gap-2 rounded-full bg-cyanGlow px-8 py-4 font-bold text-navy transition hover:bg-white disabled:cursor-wait disabled:opacity-60" type="submit">{status === 'sending' ? text.sending : text.submit} <Send size={18} /></button>
      <p className={`text-center text-sm ${status === 'success' ? 'text-leaf' : status === 'error' ? 'text-red-300' : 'text-white/50'}`}>{status === 'success' ? text.success : status === 'error' ? text.error : text.note}</p>
    </form>
  )
}
