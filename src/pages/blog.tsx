import Head from 'next/head'
import { InferGetStaticPropsType } from 'next'
import { getArticlesFromAPI } from '@/lib/load-articles'
import Layout from '@/components/Layout'
import Link from 'next/link'

export default function Blog({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>WA | Blog 🗞️</title>
        <meta
          name="description"
          content="Blog - I share anything that may help others, technologies I'm using and cool things I've made."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="mt-14 lg:mt-32 font-light w-full text-black">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl pb-4 font-extrabold text-transparent bg-clip-text bg-[#d23669]">
            Blog
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl w-11/12 sm:w-5/6 md:w-11/12 lg:w-4/5 xl:w-3/5">
            I share anything that may help others, technologies I&apos;m using
            and cool things I&apos;ve made.
          </p>
        </div>

        <div className="text-base sm:text-lg font-light leading-relaxed lg:w-4/5 2xl:w-2/3 text-gray-600 mt-24 md:mt-32 xl:mt-44">
          {articles.map((article) => (
            <div key={article.id}>
              <div className="mb-14 flex flex-col sm:flex-row w-full">
                <Link href={`/blog/${article.slug}`} legacyBehavior>
                  <a className="w-full text-gray-500 sm:w-4/5">
                    <h3 className="text-2xl text-gray-600">{article.title}</h3>
                    <p className="text-sm my-1">
                      <span>{article.published_at}</span>
                      <span className="px-1">-</span>
                      <span>{article.tag_list.map((tag) => `#${tag} `)}</span>
                    </p>
                    <p className="text-base mt-2">{article.description}</p>
                    <p className="text-base mt-2 underline hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
                      Read more
                    </p>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const articles = await getArticlesFromAPI()

  return { props: { articles } }
}
