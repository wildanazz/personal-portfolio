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
        <title>WA | Tools</title>
        <meta
          name="description"
          content="Various technologies that I use in my projects, each project requires different toolset"
        />
      </Head>
      <Layout>
        {/* Header */}
        <div className="mt-14 lg:mt-32 font-light w-full text-black">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-2">
            Various technologies that I use in my projects, each project
            requires different toolset
          </h1>
        </div>

        {/* Images */}
        <motion.div
          className="flex flex-wrap justify-center text-base sm:text-lg font-light leading-relaxed mt-24 md:mt-32 xl:mt-44 w-full"
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
                <motion.div whileHover={{ scale: 1.1 }}>
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
