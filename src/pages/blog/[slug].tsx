import Head from 'next/head'
import moment from 'moment'
import { motion, useScroll, useSpring } from 'framer-motion'
import { getArticlesFromAPI } from '@/lib/load-articles'
import Layout from '@/components/Layout'
import { GitHub, Twitter, Facebook, LinkedIn } from '@/components/Icons'

export default function ArticlePage({ article }: any) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  return (
    <>
      <Head>
        <title>WA | {article.title}</title>
        <meta name="description" content={article.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        className="fixed top-[0] right-[0] left-[0] h-[10px] bg-[#d23669] dark:bg-[#d4433b] origin-[0%]"
        style={{ scaleX }}
      />
      <Layout>
        {/* Header */}
        <div className="mt-14 lg:mt-32 font-light w-full text-black dark:text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-2 md:text-center">
            {article.title}
          </h1>
        </div>

        {/* Date */}
        <p className="text-center w-full my-4 italic leading-relaxed text-gray-600 dark:text-gray-300">
          {moment(article.published_at).format('Do MMMM YYYY')}
        </p>

        {/* Content */}
        <section className="mt-6 font-light leading-relaxed w-full flex flex-col items-center">
          <article
            className="prose dark:prose-dark lg:prose-lg w-full md:w-5/6 xl:w-9/12"
            dangerouslySetInnerHTML={{ __html: article.body_markdown }}
          />
          <div className="flex flex-col h-[120px] items-center justify-center mt-6 mb-6 gap-y-1">
            <div className="flex flex-row gap-x-1">
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
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 1.5, 1] }}
              transition={{
                type: 'spring',
                duration: 1,
                delay: 0.2,
              }}
              className="text-[#d23669] dark:text-[#d4433b] text-sm"
            >
              Powered by the Dev.to API
            </motion.p>
          </div>
        </section>
      </Layout>
    </>
  )
}

export const getStaticProps = async ({ params }: any) => {
  const articles = await getArticlesFromAPI()

  const article = articles.find((article) => article.slug === params.slug)

  return { props: { article }, revalidate: 10 }
}

export const getStaticPaths = async () => {
  const articles = await getArticlesFromAPI()

  const paths = articles.map(({ slug }) => {
    return {
      params: { slug },
    }
  })

  return { paths, fallback: 'blocking' }
}
