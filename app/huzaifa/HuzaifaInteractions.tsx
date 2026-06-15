'use client'

import { useEffect } from 'react'

export default function HuzaifaInteractions() {
  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    const langButtons = document.querySelectorAll<HTMLElement>('[data-lang-btn]')
    const translatable = document.querySelectorAll<HTMLElement>('[data-ar], [data-en]')
    const menuToggle = document.querySelector<HTMLElement>('[data-menu-toggle]')
    const navLinks = document.querySelector<HTMLElement>('[data-nav-links]')
    const header = document.querySelector<HTMLElement>('.site-header')
    const portrait = document.querySelector<HTMLElement>('.portrait-card')
    const aboutText = document.querySelector<HTMLElement>('#about .about-copy p')
    const year = document.querySelector<HTMLElement>('[data-year]')
    const cleanups: Array<() => void> = []
    let typewriterTimer: number | undefined
    let typewriterStarted = false

    if (year) year.textContent = String(new Date().getFullYear())

    const applyLang = (lang: string) => {
      const isEn = lang === 'en'
      root.lang = isEn ? 'en' : 'ar'
      root.dir = isEn ? 'ltr' : 'rtl'
      body.dir = isEn ? 'ltr' : 'rtl'
      body.classList.toggle('is-en', isEn)
      localStorage.setItem('huzaifa-lang', lang)
      translatable.forEach(element => {
        const value = element.dataset[lang]
        if (value !== undefined) element.innerHTML = value
      })
      if (typewriterStarted && aboutText) {
        window.clearTimeout(typewriterTimer)
        aboutText.classList.remove('is-typing')
        aboutText.textContent = aboutText.dataset[lang] || ''
      }
      langButtons.forEach(button => button.classList.toggle('active', button.dataset.langBtn === lang))
    }

    langButtons.forEach(button => {
      const handler = () => applyLang(button.dataset.langBtn || 'ar')
      button.addEventListener('click', handler)
      cleanups.push(() => button.removeEventListener('click', handler))
    })
    applyLang(localStorage.getItem('huzaifa-lang') || 'ar')

    if (menuToggle && navLinks) {
      const menuBackdrop = document.createElement('button')
      menuBackdrop.type = 'button'
      menuBackdrop.className = 'menu-backdrop'
      menuBackdrop.setAttribute('aria-label', 'Close menu')
      header?.insertAdjacentElement('afterend', menuBackdrop)

      const closeMenu = () => {
        navLinks.classList.remove('open')
        menuBackdrop.classList.remove('open')
        menuToggle.classList.remove('open')
        menuToggle.setAttribute('aria-expanded', 'false')
        menuToggle.textContent = '☰'
        body.classList.remove('no-scroll')
      }
      const openMenu = () => {
        navLinks.classList.add('open')
        menuBackdrop.classList.add('open')
        menuToggle.classList.add('open')
        menuToggle.setAttribute('aria-expanded', 'true')
        menuToggle.textContent = '×'
        body.classList.add('no-scroll')
      }
      const toggleMenu = () => navLinks.classList.contains('open') ? closeMenu() : openMenu()
      const closeOnEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') closeMenu()
      }

      menuToggle.setAttribute('aria-expanded', 'false')
      menuToggle.addEventListener('click', toggleMenu)
      menuBackdrop.addEventListener('click', closeMenu)
      document.addEventListener('keydown', closeOnEscape)
      navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu))
      cleanups.push(() => {
        menuToggle.removeEventListener('click', toggleMenu)
        menuBackdrop.removeEventListener('click', closeMenu)
        document.removeEventListener('keydown', closeOnEscape)
        navLinks.querySelectorAll('a').forEach(link => link.removeEventListener('click', closeMenu))
        menuBackdrop.remove()
      })
    }

    document.querySelectorAll<HTMLElement>('.projects-grid, .skills-grid, .certs-grid, .contact-grid, .case-grid, .process, .timeline, .ach-stats').forEach(group => {
      group.classList.add('stagger-parent')
      Array.from(group.children).forEach((child, index) => {
        const element = child as HTMLElement
        element.classList.add('stagger-item')
        element.style.setProperty('--reveal-delay', `${Math.min(index * 70, 420)}ms`)
      })
    })

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: .08, rootMargin: '0px 0px -8% 0px' })
    document.querySelectorAll('.reveal, .stagger-parent').forEach(element => observer.observe(element))
    cleanups.push(() => observer.disconnect())

    if (aboutText) {
      const typewriterObserver = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting) || typewriterStarted) return

        typewriterStarted = true
        typewriterObserver.disconnect()

        if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return

        const language = root.lang === 'en' ? 'en' : 'ar'
        const characters = Array.from(aboutText.dataset[language] || aboutText.textContent || '')
        let characterIndex = 0
        aboutText.textContent = ''
        aboutText.classList.add('is-typing')

        const typeNextCharacter = () => {
          aboutText.textContent += characters[characterIndex] || ''
          characterIndex += 1

          if (characterIndex < characters.length) {
            typewriterTimer = window.setTimeout(typeNextCharacter, 18)
          } else {
            aboutText.classList.remove('is-typing')
          }
        }

        typewriterTimer = window.setTimeout(typeNextCharacter, 180)
      }, { threshold: .35 })

      typewriterObserver.observe(aboutText)
      cleanups.push(() => {
        typewriterObserver.disconnect()
        window.clearTimeout(typewriterTimer)
      })
    }

    const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 18)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    cleanups.push(() => window.removeEventListener('scroll', updateHeader))

    if (portrait && window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
      const movePortrait = (event: PointerEvent) => {
        const rect = portrait.getBoundingClientRect()
        portrait.style.setProperty('--portrait-rotate-y', `${((event.clientX - rect.left) / rect.width - .5) * 5}deg`)
        portrait.style.setProperty('--portrait-rotate-x', `${((event.clientY - rect.top) / rect.height - .5) * -5}deg`)
      }
      const resetPortrait = () => {
        portrait.style.setProperty('--portrait-rotate-y', '0deg')
        portrait.style.setProperty('--portrait-rotate-x', '0deg')
      }
      portrait.addEventListener('pointermove', movePortrait)
      portrait.addEventListener('pointerleave', resetPortrait)
      cleanups.push(() => {
        portrait.removeEventListener('pointermove', movePortrait)
        portrait.removeEventListener('pointerleave', resetPortrait)
      })
    }

    return () => {
      cleanups.forEach(cleanup => cleanup())
      body.classList.remove('no-scroll', 'is-en')
      root.lang = 'ar'
      root.dir = 'rtl'
      body.dir = 'rtl'
    }
  }, [])

  return null
}
