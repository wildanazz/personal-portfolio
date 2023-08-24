import { useState } from 'react'
import Head from 'next/head'
import { InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'
import { motion } from 'framer-motion'
import Layout from '@/components/Layout'
import {
  GitHub,
  Twitter,
  Facebook,
  LinkedIn,
  Spotify,
} from '@/components/Icons'
import Footer from '@/components/Footer'
import { getArticlesFromAPI } from '@/lib/load-articles'
import { getLanguagesFromFork, getProjectsFromApi } from '@/lib/load-projects'
import {
  writeArticlesToCache,
  writePlaylistsToCache,
  writeProjectsToCache,
} from '@/lib/utils'
import { getPlaylistFromAPI } from '@/lib/load-playlist'

export default function Home({
  playlists,
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
        <div className="mt-14 lg:mt-32 font-light w-full text-[#00020d] dark:text-white">
          <div className="flex flex-row gap-4 flex-wrap pb-4 items-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-[#d23669] dark:bg-[#d4433b]">
              Hi, I&apos;m Wildan
            </h1>
            <Image
              src={'/images/helmet.svg'}
              width={80}
              height={80}
              alt="helmet"
            />
          </div>
          <p className="pb-4 text-2xl sm:text-3xl lg:text-4xl w-11/12 sm:w-5/6 md:w-11/12 lg:w-4/5 xl:w-3/5">
            I&apos;m a Software Engineer and currently living in Brisbane, AU.
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

        {/* About */}
        <div className="text-base sm:text-lg font-light leading-relaxed lg:w-4/5 2xl:w-2/3 text-gray-600 dark:text-gray-300 mt-12">
          <h2 className="text-3xl md:text-4xl mb-4 text-[#00020d] dark:text-white">
            About
          </h2>
          <p className="my-2">
            I build and develop web and mobile application. Sometimes I use
            Node.js, Python, and Java. I also make use of Cloud Computing
            technologies such as Docker and Kubernetes for my projects many
            times. I&apos;m now currently experimenting with Serverless
            technologies on Azure.
          </p>
          <p className="my-2">
            In my spare time I create content for my blog where I discuss other
            projects I&apos;ve been working on, interesting problems I&apos;ve
            had to solve and create tutorials to educate, and help others use
            various technologies for the first time or in a more efficient
            manner.
          </p>
          <p className="my-2">
            Check out my{' '}
            <Link
              href="/Resume.pdf"
              className="text-[#d23669] dark:text-[#d4433b] font-bold"
              target="_blank"
              aria-label="resume"
            >
              resume
            </Link>
            .
          </p>
        </div>

        <div className="text-base sm:text-lg font-light leading-relaxed lg:w-4/5 2xl:w-2/3 text-gray-600 mt-12">
          <div className="flex flex-row gap-4 flex-wrap mb-4 items-center">
            {/* <h2 className="text-3xl md:text-4xl text-[#00020d] dark:text-white">
              Playlist
            </h2> */}
            <Link
              href="https://open.spotify.com/user/31gv36hn5nnojr335xoy327cixs4"
              target="_blank"
              aria-label="resume"
            >
              <Spotify width={96} height={32} />
            </Link>
          </div>
          <p className="my-2 text-gray-600 dark:text-gray-300">
            My Spotify playlist.
          </p>
          <div className="mx-auto max-w-sm md:max-w-2xl inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_25px,_black_calc(100%-25px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-1 [&_img]:max-w-none animate-infinite-scroll">
              {playlists.items.map((playlist: any) => (
                <li key={playlist.id}>
                  <Link
                    href={playlist.external_urls.spotify}
                    target="_blank"
                    aria-label="resume"
                  >
                    <Image
                      className="rounded-xl"
                      alt="playlist"
                      src={playlist.images[1].url}
                      width={playlist.images[1].width}
                      height={playlist.images[1].height}
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <ul
              className="flex items-center justify-center md:justify-start [&_li]:mx-1 [&_img]:max-w-none animate-infinite-scroll"
              aria-hidden="true"
            >
              {playlists.items.map((playlist: any) => (
                <li key={playlist.id}>
                  <Image
                    className="rounded-xl"
                    alt="playlist"
                    src={playlist.images[1].url}
                    width={playlist.images[1].width}
                    height={playlist.images[1].height}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-base sm:text-lg font-light leading-relaxed lg:w-4/5 2xl:w-2/3 text-gray-600 mt-12">
          {/* Latest Article */}
          <h2 className="text-3xl md:text-4xl mb-4 text-[#00020d] dark:text-white">
            Latest article
          </h2>
          <div className="mb-14 flex flex-col sm:flex-row w-full">
            <Link href={`/blog/${latestArticle.slug}`} legacyBehavior>
              <a className="w-full text-gray-600 sm:w-4/5 dark:text-gray-100 hover:text-[#d23669] hover:dark:text-[#d4433b] transition-colors">
                <div key={latestArticle.id}>
                  <h3 className="text-2xl">{latestArticle.title}</h3>
                  <p className="text-sm my-1 text-gray-500 dark:text-gray-300">
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
                  <p className="text-base mt-2 text-gray-500 dark:text-gray-300">
                    {latestArticle.description}
                  </p>
                  <p className="text-base mt-2 underline text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
                    Read more
                  </p>
                </div>
              </a>
            </Link>
          </div>

          {/* Featured Article */}
          {featuredArticle && (
            <>
              <h2 className="text-3xl md:text-4xl mb-4 text-[#00020d] dark:text-white">
                Featured article
              </h2>
              <div className="mb-14 flex flex-col sm:flex-row w-full">
                <Link href={`/blog/${featuredArticle.slug}`} legacyBehavior>
                  <a className="w-full text-gray-600 sm:w-4/5 dark:text-gray-100 hover:text-[#d23669] hover:dark:text-[#d4433b] transition-colors">
                    <div key={featuredArticle.id}>
                      <h3 className="text-2xl">{featuredArticle.title}</h3>
                      <p className="text-sm my-1 text-gray-500 dark:text-gray-300">
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
                      <p className="text-base mt-2 text-gray-500 dark:text-gray-300">
                        {featuredArticle.description}
                      </p>
                      <p className="text-base mt-2 underline text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
                        Read more
                      </p>
                    </div>
                  </a>
                </Link>
              </div>
            </>
          )}
          <h2 className="text-3xl md:text-4xl mb-6 text-[#00020d] dark:text-white">
            Featured projects
          </h2>
          <div className="w-auto xl:w-full">
            <div className="mb-14 flex flex-col w-full gap-4">
              {featuredProjects.map((project: any) => (
                <motion.article
                  onHoverStart={() => setHovered(true)}
                  onHoverEnd={() => setHovered(false)}
                  animate={{ opacity: isHovered ? 0.25 : 1 }}
                  whileHover={{ opacity: 1, scale: 1.025 }}
                  key={project.data.id}
                  className="bg-[#00020d] dark:bg-[#d4433b] dark:bg-opacity-50 rounded-md"
                >
                  <Link href={project.data.html_url} legacyBehavior>
                    <a
                      className="w-full text-gray-300 block p-[40px] break-words"
                      target="_blank"
                      rel="noreferrer"
                    >
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
                      <h3 className="text-2xl text-gray-100 mt-2">
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
      <hr className="h-px my-8 bg-[#d23669] border-0 dark:bg-[#d4433b]" />
      <Footer />
    </>
  )
}

export const getStaticProps = async () => {
  const articles = await getArticlesFromAPI()
  const projects = await getProjectsFromApi()
  const playlists = await getPlaylistFromAPI()

  // Write articles to cache
  writeArticlesToCache(articles)

  // Write projects to cache
  writeProjectsToCache(projects)

  // Write projects to cache
  writePlaylistsToCache(playlists)

  // Get latest article
  const latestArticle = articles[0]

  // Get featured article
  const featuredArticle =
    articles.find(
      (article) =>
        article.slug ===
        'deploy-docker-application-to-virtual-machine-using-github-actions-cicd-3p4d'
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
    props: { playlists, latestArticle, featuredArticle, featuredProjects },
    revalidate: 10,
  }
}
