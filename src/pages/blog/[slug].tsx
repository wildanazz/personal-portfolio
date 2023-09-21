import { useState, useEffect } from 'react'
import Head from 'next/head'
import moment from 'moment'
import { motion, useScroll, useSpring } from 'framer-motion'
import { getArticlesFromAPI } from '@/lib/load-articles'
import Layout from '@/components/Layout'
import Footer from '@/components/Footer'

export default function ArticlePage({ article }: any) {
  const [data, setData] = useState<any>()
  const [isLoading, setLoading] = useState(true)
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    fetch(`https://dummyjson.com/comments?limit=3`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

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
        {/* Cover Image */}
        {article.cover_image && (
          <img
            src={article.cover_image}
            alt={article.title}
            className="md:mt-6 lg:mt-10 xl:mt-14 h-40 sm:h-48 md:h-52 lg:h-64 xl:h-68 2xl:h-80 mx-auto"
          />
        )}

        {/* Header */}
        <div className="mt-14 lg:mt-32 font-light w-full text-black dark:text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-2 text-center">
            {article.title}
          </h1>
        </div>

        {/* Date */}
        <p className="text-center w-full my-4 italic leading-relaxed text-gray-600 dark:text-gray-300">
          {moment(article.published_at).format('Do MMMM YYYY')}
        </p>

        {/* Content */}
        <section className="mt-6 mb-24 font-light leading-relaxed w-full flex flex-col items-center">
          <article
            className="prose dark:prose-dark lg:prose-lg max-w-2xl w-full md:w-5/6 xl:w-9/12"
            dangerouslySetInnerHTML={{ __html: article.body_markdown }}
          />
          {/* Comments */}

          <div className="w-full max-w-2xl mt-6">
            <h1 className="my-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              Please feel free to leave a comment below or send me an e-mail :)
            </h1>
            <form className="mb-6">
              <div className="py-2 px-4 mb-4  rounded-lg rounded-t-lg border bg-gray-800 border-gray-700">
                <label htmlFor="name" className="sr-only">
                  Your name
                </label>
                <input
                  id="name"
                  className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none text-gray-300 placeholder-gray-400 bg-gray-800"
                  placeholder="Your name..."
                  required
                />
              </div>
              <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg border bg-gray-800 border-gray-700">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none text-gray-300 placeholder-gray-400 bg-gray-800"
                  placeholder="Write a comment..."
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-gray-600 dark:text-gray-300 bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-900 hover:bg-primary-800"
              >
                Post comment
              </button>
            </form>
            {isLoading ? (
              <div className="flex flex-col w-full items-center" role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 animate-spin text-gray-300 fill-[#d23669] dark:fill-[#d4433b]"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              data.comments.map((comment: any) => (
                <article
                  key={comment.id}
                  className="mt-2 p-6 text-base rounded-lg bg-gray-900"
                >
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-white font-semibold">
                        {comment.user.username}
                      </p>
                    </div>
                  </footer>
                  <p className="text-gray-300">{comment.body}</p>
                  <div className="flex items-center mt-4 space-x-4">
                    <button
                      type="button"
                      className="flex items-center text-sm hover:underline text-gray-300 font-medium"
                    >
                      <svg
                        className="mr-1.5 w-3.5 h-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                        />
                      </svg>
                      Reply
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
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
