import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: '#061733',
        ink: '#031025',
        brandBlue: '#0754d9',
        brightBlue: '#1598f2',
        cyanGlow: '#19d7e6',
        leaf: '#63c823'
      },
      fontFamily: {
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 45px rgba(25, 215, 230, 0.25)',
        glass: 'inset 0 1px 0 rgba(255,255,255,.18), 0 30px 80px rgba(0,0,0,.35)'
      }
    }
  },
  plugins: []
}
export default config
