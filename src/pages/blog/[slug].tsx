import Head from 'next/head'
import moment from 'moment'
import { motion, useScroll, useSpring } from 'framer-motion'
import { getArticlesFromAPI } from '@/lib/load-articles'
import Layout from '@/components/Layout'
import Footer from '@/components/Footer'

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
        className="fixed top-[0] right-[0] left-[0] h-[10px] bg-[#d23669] dark:bg-[#00ace9] origin-[0%]"
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
        <section className="mb-14 mt-6 font-light leading-relaxed w-full flex flex-col items-center">
          <article
            className="prose dark:prose-dark lg:prose-lg w-full md:w-5/6 xl:w-9/12"
            dangerouslySetInnerHTML={{ __html: article.body_markdown }}
          />
        </section>
      </Layout>
      <Footer />
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
