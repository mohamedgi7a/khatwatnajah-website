'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

export default function TypewriterText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' })
  const reduceMotion = useReducedMotion()
  const [length, setLength] = useState(0)

  useEffect(() => {
    setLength(0)
    if (!inView) return
    if (reduceMotion) {
      setLength(text.length)
      return
    }

    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setLength(index)
      if (index >= text.length) window.clearInterval(timer)
    }, 28)

    return () => window.clearInterval(timer)
  }, [inView, reduceMotion, text])

  return (
    <p ref={ref} className="mt-7 min-h-[7rem] text-lg leading-loose text-white/68 md:text-xl" aria-label={text}>
      <span aria-hidden="true">{text.slice(0, length)}</span>
      {inView && length < text.length && <span aria-hidden="true" className="typewriter-caret mr-1 inline-block h-[1.15em] w-[2px] translate-y-1 bg-cyanGlow" />}
    </p>
  )
}
