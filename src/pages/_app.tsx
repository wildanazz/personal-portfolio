import '@/styles/globals.css'
import localFont from 'next/font/local'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useEffect } from 'react'

const myFont = localFont({
  src: [{ path: './font/iosevka-term-light.woff2', weight: '300' }],
  adjustFontFallback: false,
  fallback: ['monospace'],
})

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  return (
    <main className={myFont.className}>
      <AnimatePresence>
        <Component {...pageProps} />
      </AnimatePresence>
      <Navbar />
    </main>
  )
}
