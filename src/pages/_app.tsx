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
  src: [
    { path: './font/IosevkaFixed-Light.woff2', weight: '300' },
    { path: './font/IosevkaFixed-Medium.woff2', weight: '500' },
    { path: './font/IosevkaFixed-Regular.woff2', weight: '400' },
    { path: './font/IosevkaFixed-Bold.woff2', weight: '700' },
  ],
  adjustFontFallback: false,
  fallback: ['monospace', 'Arial', 'sans-serif'],
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
