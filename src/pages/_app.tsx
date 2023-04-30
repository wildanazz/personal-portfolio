import '@/styles/globals.css'
import localFont from 'next/font/local'
import type { AppProps } from 'next/app'
import Navbar from '@/components/Navbar'
import Social from '@/components/Social'

const myFont = localFont({
  src: './font/iosevka-term-light.woff2',
  fallback: ['monospace'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={myFont.className}>
      <Navbar />
      <Social />
      <Component {...pageProps} />
    </main>
  )
}
