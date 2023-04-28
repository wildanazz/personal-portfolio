import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '@/components/Navbar'
import Social from '@/components/Social'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Social />
      <Component {...pageProps} />
    </>
  )
}
