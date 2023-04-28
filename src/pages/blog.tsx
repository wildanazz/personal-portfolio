import { InferGetStaticPropsType } from 'next'
import { getArticlesFromAPI } from '@/lib/load-articles'
import Layout from '@/components/Layout'
import Link from 'next/link'

export default function Blog({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <div className="mt-14 lg:mt-32 font-light w-full text-black dark:text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-2">
          I share anything that may help others, technologies I&apos;m using and
          cool things I&apos;ve made.
        </h1>
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
  )
}

export const getStaticProps = async () => {
  const articles = await getArticlesFromAPI()

  return { props: { articles }, revalidate: 60 }
}
