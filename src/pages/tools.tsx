import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { toollist } from '@/components/Toolslist'
import Layout from '@/components/Layout'

const variant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const variantItem = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
}

export default function Tools() {
  return (
    <>
      <Head>
        <title>WA | Tools 🔧</title>
        <meta
          name="description"
          content="Tools - Various technologies that I use in my projects, each project requires different toolset"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {/* Header */}
        <div className="mt-14 lg:mt-32 font-light w-full text-black dark:text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl pb-4 font-extrabold text-transparent bg-clip-text bg-[#d23669] dark:bg-[#00ace9]">
            Tools
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl w-11/12 sm:w-5/6 md:w-11/12 lg:w-4/5 xl:w-3/5">
            Various technologies that I use in my projects, each project
            requires different toolset.
          </p>
        </div>

        {/* Images */}
        <motion.div
          className="flex flex-wrap items-center justify-center text-base sm:text-lg font-light leading-relaxed mt-24 md:mt-32 xl:mt-44 w-full"
          variants={variant}
          initial="hidden"
          animate="show"
        >
          {toollist.map((tool): any => {
            return (
              <motion.div
                key={tool.id}
                className="m-4 flex flex-col justify-center"
                variants={variantItem}
              >
                <motion.div whileTap={{ scale: 1.1 }}>
                  <Image
                    src={tool.path}
                    alt={tool.title}
                    width={225}
                    height={225}
                  />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </Layout>
    </>
  )
}
