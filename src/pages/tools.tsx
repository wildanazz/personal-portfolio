import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { toollist } from '@/components/Toolslist'
import Layout from '@/components/Layout'
import { GitHub, Twitter, Facebook, LinkedIn } from '@/components/Icons'
import Footer from '@/components/Footer'

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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl pb-4 font-extrabold text-transparent bg-clip-text bg-[#d23669] dark:bg-[#d4433b]">
            Tools
          </h1>
          <p className="pb-4 text-2xl sm:text-3xl lg:text-4xl w-11/12 sm:w-5/6 md:w-11/12 lg:w-4/5 xl:w-3/5">
            Various technologies that I use in my projects, each project
            requires different toolset.
          </p>
          <div className="flex flex-row gap-1">
            <motion.div whileTap={{ scale: 1.5 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 1.5, 1] }}
                transition={{
                  type: 'spring',
                  duration: 1,
                  delay: 0.2,
                }}
              >
                <a
                  href="https://github.com/wildanazz"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Github"
                >
                  <GitHub width={36} height={36} />
                </a>
              </motion.div>
            </motion.div>
            <motion.div whileTap={{ scale: 1.5 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 1.5, 1] }}
                transition={{
                  type: 'spring',
                  duration: 1,
                  delay: 0.4,
                }}
              >
                <a
                  href="https://twitter.com/wildanazz"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter width={36} height={36} />
                </a>
              </motion.div>
            </motion.div>
            <motion.div whileTap={{ scale: 1.5 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 1.5, 1] }}
                transition={{
                  type: 'spring',
                  duration: 1,
                  delay: 0.6,
                }}
              >
                <a
                  href="https://www.facebook.com/wildanazzwa/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook width={36} height={36} />
                </a>
              </motion.div>
            </motion.div>
            <motion.div whileTap={{ scale: 1.5 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 1.5, 1] }}
                transition={{
                  type: 'spring',
                  duration: 1,
                  delay: 0.8,
                }}
              >
                <a
                  href="https://www.linkedin.com/in/wildanazz/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Linkedin"
                >
                  <LinkedIn width={36} height={36} />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Images */}
        <motion.div
          className="flex flex-wrap items-center justify-center text-base sm:text-lg font-light leading-relaxed my-12 w-full"
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
      <hr className="h-px my-8 bg-[#d23669] border-0 dark:bg-[#d4433b]" />
      <Footer />
    </>
  )
}
