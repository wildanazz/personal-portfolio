import Head from 'next/head'
import Layout from '@/components/Layout'
import { getArticlesFromAPI } from '@/lib/load-articles'

export default function ArticlePage({ article }: any) {
  return (
    <>
      <Head>
        <title>WA | {article.title}</title>
        <meta name="description" content={article.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {/* Header */}
        <div className="mt-14 lg:mt-32 font-light w-full text-black">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-2 md:text-center">
            {article.title}
          </h1>
        </div>

        {/* Date */}
        <p className="text-center w-full my-4 italic leading-relaxed text-gray-600">
          {article.published_at}
        </p>

        {/* Content */}
        <section className="mt-6 font-light leading-relaxed w-full flex flex-col items-center">
          <article
            className="prose lg:prose-lg w-full md:w-5/6 xl:w-9/12"
            dangerouslySetInnerHTML={{ __html: article.body_markdown }}
          />
        </section>
      </Layout>
    </>
  )
}

export const getStaticProps = async ({ params }: any) => {
  const articles = await getArticlesFromAPI()
  const article = articles.find((article) => article.slug === params.slug)

  return { props: { article }, revalidate: 3600 }
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
