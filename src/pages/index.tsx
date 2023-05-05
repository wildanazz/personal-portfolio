import Head from 'next/head'
import Link from 'next/link'
import { InferGetStaticPropsType } from 'next'
import Layout from '@/components/Layout'
import { getArticlesFromAPI } from '@/lib/load-articles'

export default function Home({
  latestArticle,
  featuredArticle,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>WA | Home 👨‍🚀</title>
        <meta
          name="description"
          content="Hi, I'm Wildan - I'm a Software Engineer in Brisbane, AU"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {/* Header */}
        <div className="mt-14 lg:mt-32 font-light w-full text-black">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl pb-4 font-extrabold text-transparent bg-clip-text bg-[#d23669]">
            Hi, I&apos;m Wildan
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl w-11/12 sm:w-5/6 md:w-11/12 lg:w-4/5 xl:w-3/5">
            I&apos;m a Software Engineer in Brisbane, AU.
          </p>
        </div>

        {/* About */}
        <div className="text-base sm:text-lg font-light leading-relaxed lg:w-4/5 2xl:w-2/3 text-gray-600 mt-24 md:mt-32 xl:mt-44">
          <h2 className="text-3xl md:text-4xl mb-4 text-black">About</h2>
          <p className="my-2">
            I spend most of my time creating beautiful website with great user
            experience using React.js. Sometimes I use Node.js, Docker,
            Kubernetes, and Python. I&apos;m currently experimenting with
            Serverless technologies on AWS and Azure.
          </p>
          <p className="my-2">
            I also like to spend my time creating content for my blog where I
            discuss other projects I&apos;ve been working on, interesting
            problems I&apos;ve had to solve and create tutorials to educate and
            help others use various technologies for the first time or in a more
            efficient manner.
          </p>
        </div>

        <div className="text-base sm:text-lg font-light leading-relaxed lg:w-4/5 2xl:w-2/3 text-gray-600 mt-12">
          {/* Latest Article */}
          <h2 className="text-3xl md:text-4xl mb-4 text-black">
            Latest article
          </h2>
          <div className="mb-14 flex flex-col sm:flex-row w-full">
            <Link href={`/blog/${latestArticle.slug}`} legacyBehavior>
              <a className="w-full text-gray-500 sm:w-4/5">
                <div key={latestArticle.id}>
                  <h3 className="text-2xl text-gray-600">
                    {latestArticle.title}
                  </h3>
                  <p className="text-sm my-1">
                    <span>{latestArticle.published_at}</span>
                    <span className="px-1">-</span>
                    <span>
                      {latestArticle.tag_list.map((tag) => `#${tag} `)}
                    </span>
                  </p>
                  <p className="text-base mt-2">{latestArticle.description}</p>
                  <p className="text-base mt-2 underline hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
                    Read more
                  </p>
                </div>
              </a>
            </Link>
          </div>

          {/* Featured Article */}
          {featuredArticle && (
            <>
              <h2 className="text-3xl md:text-4xl mb-4 text-black">
                Featured article
              </h2>
              <div className="mb-14 flex flex-col sm:flex-row w-full">
                <Link href={`/blog/${featuredArticle.slug}`} legacyBehavior>
                  <a className="w-full text-gray-500 sm:w-4/5">
                    <div key={featuredArticle.id}>
                      <h3 className="text-2xl text-gray-600">
                        {featuredArticle.title}
                      </h3>
                      <p className="text-sm my-1">
                        <span>{featuredArticle.published_at}</span>
                        <span className="px-1">-</span>
                        <span>
                          {featuredArticle.tag_list.map((tag) => `#${tag} `)}
                        </span>
                      </p>
                      <p className="text-base mt-2">
                        {featuredArticle.description}
                      </p>
                      <p className="text-base mt-2 underline hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
                        Read more
                      </p>
                    </div>
                  </a>
                </Link>
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const articles = await getArticlesFromAPI()

  // Get latest article
  const latestArticle = articles[0]

  // Get featured article
  const featuredArticle =
    articles.find(
      (article) =>
        article.slug ===
        'deploy-docker-application-to-droplet-using-github-actions-cicd-o8a'
    ) || null

  return { props: { latestArticle, featuredArticle }, revalidate: 60 }
}
