import { useState } from 'react'
import Head from 'next/head'
import { InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'
import { motion } from 'framer-motion'
import Layout from '@/components/Layout'
import Social from '@/components/Social'
import Footer from '@/components/Footer'
import { getArticlesFromAPI } from '@/lib/load-articles'
import { getLanguagesFromFork, getProjectsFromApi } from '@/lib/load-projects'
import { writeArticlesToCache, writeProjectsToCache } from '@/lib/utils'

export default function Home({
  latestArticle,
  featuredArticle,
  featuredProjects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [isHovered, setHovered] = useState(false)

  return (
    <>
      <Head>
        <title>WA | Home 👨‍🚀</title>
        <meta
          name="description"
          content="Hi, I'm Wildan - I'm a Software Engineer and currently living in Brisbane, AU."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {/* Header */}
        <div className="mt-14 lg:mt-32 font-light w-full text-black dark:text-white">
          <div className="flex flex-row gap-4 flex-wrap pb-4 items-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-[#d23669] dark:bg-[#00ace9]">
              Hi, I&apos;m Wildan
            </h1>
            <Image
              src={'/images/helmet.svg'}
              width={80}
              height={80}
              alt="helmet"
            />
          </div>
          <p className="text-2xl sm:text-3xl lg:text-4xl w-11/12 sm:w-5/6 md:w-11/12 lg:w-4/5 xl:w-3/5">
            I&apos;m a Software Engineer and currently living in Brisbane, AU.
          </p>
        </div>

        {/* About */}
        <div className="text-base sm:text-lg font-light leading-relaxed lg:w-4/5 2xl:w-2/3 text-gray-600 dark:text-gray-300 mt-24">
          <h2 className="text-3xl md:text-4xl mb-4 text-black dark:text-white">
            About
          </h2>
          <p className="my-2">
            I build and develop web and mobile application. Sometimes I use
            Node.js, Python, and Java. I also make use of Cloud Computing
            technologies such as Docker and Kubernetes for my projects many
            times. I&apos;m now currently experimenting with Serverless
            technologies on AWS.
          </p>
          <p className="my-2">
            In my spare time I create content for my blog where I discuss other
            projects I&apos;ve been working on, interesting problems I&apos;ve
            had to solve and create tutorials to educate, and help others use
            various technologies for the first time or in a more efficient
            manner.
          </p>
          <p className="my-2">
            Check out my resume{' '}
            <Link
              href="/Resume.pdf"
              className="text-[#d23669] dark:text-[#00ace9] font-bold hover:text-gray-600"
              target="_blank"
            >
              here
            </Link>
            .
          </p>
        </div>

        <div className="text-base sm:text-lg font-light leading-relaxed lg:w-4/5 2xl:w-2/3 text-gray-600 mt-12">
          {/* Latest Article */}
          <h2 className="text-3xl md:text-4xl mb-4 text-black dark:text-white">
            Latest article
          </h2>
          <div className="mb-14 flex flex-col sm:flex-row w-full">
            <Link href={`/blog/${latestArticle.slug}`} legacyBehavior>
              <a className="w-full text-gray-500 sm:w-4/5 dark:text-gray-300">
                <div key={latestArticle.id}>
                  <h3 className="text-2xl text-gray-600 dark:text-gray-100">
                    {latestArticle.title}
                  </h3>
                  <p className="text-sm my-1">
                    <span>
                      {moment(latestArticle.published_at).format(
                        'Do MMMM YYYY'
                      )}
                    </span>
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
              <h2 className="text-3xl md:text-4xl mb-4 text-black dark:text-white">
                Featured article
              </h2>
              <div className="mb-14 flex flex-col sm:flex-row w-full">
                <Link href={`/blog/${featuredArticle.slug}`} legacyBehavior>
                  <a className="w-full text-gray-500 sm:w-4/5 dark:text-gray-300">
                    <div key={featuredArticle.id}>
                      <h3 className="text-2xl text-gray-600 dark:text-gray-100">
                        {featuredArticle.title}
                      </h3>
                      <p className="text-sm my-1">
                        <span>
                          {moment(featuredArticle.published_at).format(
                            'Do MMMM YYYY'
                          )}
                        </span>
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
          <h2 className="text-3xl md:text-4xl mb-5 text-black dark:text-white">
            Featured projects
          </h2>
          <div className="w-auto xl:w-full">
            <div className="mb-14 flex flex-col w-full gap-4">
              {featuredProjects.map((project: any) => (
                <motion.article
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  animate={{ opacity: isHovered ? 0.25 : 1 }}
                  whileHover={{ opacity: 1, scale: 1.025 }}
                  key={project.data.id}
                  className="bg-[#00020d] bg-opacity-10 rounded-md"
                >
                  <Link href={project.data.html_url} legacyBehavior>
                    <a className="w-full text-gray-500 dark:text-gray-300 block p-[40px] break-words">
                      {project.fork ? (
                        <p className="text-xs uppercase tracking-[2.5px]">
                          <span>
                            {project.languages.map(
                              (language: String) => `${language} `
                            )}
                          </span>
                        </p>
                      ) : (
                        <p className="text-xs uppercase tracking-[2.5px]">
                          {project.data.language}
                        </p>
                      )}
                      <h3 className="text-2xl text-gray-600 dark:text-gray-100 mt-2">
                        {project.data.full_name}
                      </h3>
                      <p className="text-base mt-2">
                        {project.data.description}
                      </p>
                    </a>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </Layout>
      <Footer />
      <Social />
    </>
  )
}

export const getStaticProps = async () => {
  const articles = await getArticlesFromAPI()
  const projects = await getProjectsFromApi()

  // Write articles to cache
  writeArticlesToCache(articles)

  // Write projects to cache
  writeProjectsToCache(projects)

  // Get latest article
  const latestArticle = articles[0]

  // Get featured article
  const featuredArticle =
    articles.find(
      (article) =>
        article.slug ===
        'deploy-docker-application-to-droplet-using-github-actions-cicd-o8a'
    ) || null

  // Get featured projects
  const featuredProjects = []

  featuredProjects.push({
    fork: false,
    data:
      projects.find(
        (Project) => Project.full_name === 'wildanazz/wildanazz.com'
      ) || null,
  })

  const languages = await getLanguagesFromFork()
  featuredProjects.push({
    fork: true,
    data:
      projects.find(
        (Project) => Project.full_name === 'wildanazz/PatternFlow'
      ) || null,
    languages: Object.keys(languages),
  })

  featuredProjects.push({
    fork: false,
    data:
      projects.find((Project) => Project.full_name === 'wildanazz/minote') ||
      null,
  })

  return {
    props: { latestArticle, featuredArticle, featuredProjects },
    revalidate: 10,
  }
}
