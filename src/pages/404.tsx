import Head from 'next/head'
import { motion } from 'framer-motion'
import Layout from '@/components/Layout'
import Footer from '@/components/Footer'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>WA | 404 - Page Not Found</title>
        <meta
          name="description"
          content="Oops! The page you're looking for doesn't exist."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:description" content="Oops! The page you're looking for doesn't exist." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="WA | 404 - Page Not Found" />
        <meta property="og:image" content="/images/helmet.svg" />
        <meta property="og:url" content="https://wildanazz.com/404" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WA | 404 - Page Not Found" />
        <meta name="twitter:description" content="Oops! The page you're looking for doesn't exist." />
        <meta name="twitter:image" content="/images/helmet.svg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="mt-14 lg:mt-32 font-light w-full text-black dark:text-white text-center">
          <motion.h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-[#00020d] dark:bg-white mb-4">
            404 - Page Not Found
          </motion.h1>
        </div>
      </Layout>
      <hr className="h-px my-8 bg-[#00020d] border-0 dark:bg-white" />
      <Footer />
    </>
  )
}
