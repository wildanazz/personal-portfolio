import '@/styles/globals.css'
import type { ReactElement, ReactNode } from 'react'
import localFont from 'next/font/local'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useEffect } from 'react'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const myFont = localFont({
  src: [{ path: './font/IosevkaTerm-Medium.woff2', weight: '300' }],
  adjustFontFallback: false,
  fallback: ['monospace'],
})

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

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

  return getLayout(
    <main className={myFont.className}>
      <AnimatePresence>
        <Component {...pageProps} />
      </AnimatePresence>
      <Navbar />
    </main>
  )
}
