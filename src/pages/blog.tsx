import Head from 'next/head'
import Link from 'next/link'
import { InferGetStaticPropsType } from 'next'
import moment from 'moment'
import { motion } from 'framer-motion'
import { getArticlesFromAPI } from '@/lib/load-articles'
import Layout from '@/components/Layout'
import { GitHub, Twitter, Facebook, LinkedIn } from '@/components/Icons'
import Footer from '@/components/Footer'

export default function Blog({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>WA | Blog</title>
        <meta
          name="description"
          content="Blog - I share anything that may help others, technologies I'm using and cool things I've made."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="mt-14 lg:mt-32 font-light w-full text-black dark:text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl pb-4 font-extrabold text-transparent bg-clip-text bg-[#d23669] dark:bg-[#d4433b]">
            Blog
          </h1>
          <p className="pb-4 text-2xl sm:text-3xl lg:text-4xl w-11/12 sm:w-5/6 md:w-11/12 lg:w-4/5 xl:w-3/5">
            I share anything that may help others, technologies I&apos;m using
            and cool things I&apos;ve made.
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

        <div className="text-base sm:text-lg font-light leading-relaxed lg:w-4/5 2xl:w-2/3 text-gray-600 mt-12">
          {articles.map((article) => (
            <motion.div key={article.id}>
              <motion.div className="mb-14 flex flex-col sm:flex-row w-full">
                <Link href={`/blog/${article.slug}`} legacyBehavior>
                  <a
                    className={`w-full text-gray-600 dark:text-gray-100 hover:text-[#d23669] hover:dark:text-[#d4433b] transition-colors ${
                      article.cover_image
                        ? 'sm:w-1/2 lg:w-1/2 xl:w-3/5'
                        : 'sm:w-4/5'
                    }`}
                  >
                    <h3 className="text-2xl">{article.title}</h3>
                    <p className="text-sm my-1 text-gray-500 dark:text-gray-300">
                      <span>
                        {moment(article.published_at).format('Do MMMM YYYY')}
                      </span>
                      <span className="px-1">-</span>
                      <span>{article.tag_list.map((tag) => `#${tag} `)}</span>
                    </p>
                    <p className="text-base mt-2 text-gray-500 dark:text-gray-300">
                      {article.description}
                    </p>
                    <p className="text-base mt-2 underline text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
                      Read more
                    </p>
                  </a>
                </Link>
                {article.cover_image && (
                  <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-2/5 mt-4 sm:mt-0 sm:ml-4 flex items-center justify-center">
                    <img
                      src={article.cover_image}
                      className="w-full rounded-sm"
                      alt={article.title}
                    />
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Layout>
      <hr className="h-px my-8 bg-[#d23669] border-0 dark:bg-[#d4433b]" />
      <Footer />
    </>
  )
}

export const getStaticProps = async () => {
  const articles = await getArticlesFromAPI()

  return { props: { articles }, revalidate: 10 }
}
