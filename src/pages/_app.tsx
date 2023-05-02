import '@/styles/globals.css'
import localFont from 'next/font/local'
import type { AppProps } from 'next/app'
import Navbar from '@/components/Navbar'
import Social from '@/components/Social'

const myFont = localFont({
  src: [{ path: './font/iosevka-term-light.woff2', weight: '300' }],
  adjustFontFallback: false,
  fallback: ['monospace'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Social />
      <Navbar />
    </>
  )
}
