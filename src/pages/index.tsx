import { useState, useEffect } from 'react'
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
  const [data, setData] = useState<any>()
  const [isLoading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    comment: '',
  })
  const [postDataSuccess, setPostDataSuccess] = useState(false)

  useEffect(() => {
    fetch('/comments')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
    setPostDataSuccess(false)
  }, [postDataSuccess])

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    fetch('/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then(() => {
      setPostDataSuccess(true)
      setFormData({
        name: '',
        comment: '',
      })
    })
  }

  return (
    <>
      <Head>
        <title>WA | Home</title>
        <meta
          name="description"
          content="Hi, I'm Naz - I'm a Software Engineer and currently living in Brisbane, AU."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {/* Header */}
        <div className="mt-14 lg:mt-32 font-light w-full text-[#00020d] dark:text-white">
          <div className="flex flex-row gap-4 flex-wrap pb-4 items-center">
            {/* <h1 className="drop-shadow-lg text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-contain bg-clip-text bg-[url('/vibrant_flower.png')] animate-stripes">
              Hi, I&apos;m Wildan
            </h1> */}
            {/* <h1 className="drop-shadow-lg text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-[#00020d] dark:bg-white">
              Hi, I&apos;m Wildan
            </h1> */}
            <h1 className="drop-shadow-lg text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-[#00020d] dark:text-white">
              Hi, I&apos;m Naz
            </h1>
            <Image
              className="drop-shadow-lg"
              src={'/images/helmet.svg'}
              width={80}
              height={80}
              alt="helmet"
            />
          </div>
          <p className="font-medium pb-4 text-xl sm:text-2xl lg:text-3xl w-11/12 sm:w-5/6 md:w-11/12 lg:w-4/5 xl:w-3/5">
            I&apos;m a Software Engineer and currently living in Brisbane, AU.
          </p>
          {/* <div className="flex flex-row gap-1">
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
          </div> */}
        </div>

        {/* About */}
        <div className="text-base sm:text-lg font-light leading-relaxed lg:w-4/5 2xl:w-2/3 text-gray-600 dark:text-gray-300 mt-4">
          <h2 className="text-2xl md:text-3xl mb-4 text-[#00020d] dark:text-white font-normal">
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
          {/*           <p className="my-2">
            Check out my{' '}
            <Link
              href="/Resume.pdf"
              className="text-[#d23669] dark:text-[#d4433b] font-bold"
              target="_blank"
              aria-label="resume"
            >
              resume
            </Link>{' '}
            and cool playlist.
          </p> */}

          {/* Spotify playlist */}
          <div className="flex flex-row gap-4 flex-wrap my-6 items-center drop-shadow-lg">
            <Link
              href="https://open.spotify.com/user/31gv36hn5nnojr335xoy327cixs4"
              target="_blank"
              aria-label="spotify account"
            >
              <Spotify width={96} height={32} />
            </Link>
          </div>
          <div className="mx-auto max-w-sm md:max-w-2xl inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-0.5 [&_img]:max-w-none animate-infinite-scroll transform-gpu">
              {playlists.items.map((playlist: any) => (
                <li key={playlist.id}>
                  <Link
                    href={playlist.external_urls.spotify}
                    target="_blank"
                    aria-label="external url 1"
                  >
                    <Image
                      className="rounded-xl"
                      alt="playlist"
                      src={playlist.images[0].url}
                      width={128}
                      height={128}
                      loading="eager"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <ul
              className="flex items-center justify-center md:justify-start [&_li]:mx-0.5 [&_img]:max-w-none animate-infinite-scroll transform-gpu"
              aria-hidden="true"
            >
              {playlists.items.map((playlist: any) => (
                <li key={playlist.id}>
                  <Link
                    href={playlist.external_urls.spotify}
                    target="_blank"
                    aria-label="external url 2"
                  >
                    <Image
                      className="rounded-xl"
                      alt="playlist"
                      src={playlist.images[0].url}
                      width={128}
                      height={128}
                      loading="eager"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-base sm:text-lg font-light leading-relaxed lg:w-4/5 2xl:w-2/3 text-gray-800 mt-12">
          {/* Latest Article */}
          <h2 className="text-2xl md:text-3xl mb-4 text-[#00020d] dark:text-white font-normal">
            Latest article
          </h2>
          <div className="mb-14 flex flex-col sm:flex-row w-full">
            <Link href={`/blog/${latestArticle.slug}`} legacyBehavior>
              <a
                className={`w-full text-gray-800 dark:text-gray-100 hover:text-orange-400 hover:dark:text-orange-400 transition-colors ${
                  latestArticle.cover_image
                    ? 'sm:w-1/2 lg:w-1/2 xl:w-3/5'
                    : 'sm:w-4/5'
                }`}
              >
                <div key={latestArticle.id}>
                  <h3 className="text-2xl">{latestArticle.title}</h3>
                  <p className="text-sm my-1 text-gray-600 dark:text-gray-300">
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
                  <p className="text-base mt-2 text-gray-600 dark:text-gray-300">
                    {latestArticle.description}
                  </p>
                  <p className="text-base mt-2 underline text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-100 transition-colors">
                    Read more
                  </p>
                </div>
              </a>
            </Link>
            {latestArticle.cover_image && (
              <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-2/5 mt-4 sm:mt-0 sm:ml-4 flex items-center justify-center">
                <img
                  src={latestArticle.cover_image}
                  className="w-full rounded-sm"
                  alt={latestArticle.title}
                />
              </div>
            )}
          </div>

          {/* Featured Article */}
          {featuredArticle && (
            <>
              <h2 className="text-2xl md:text-3xl mb-4 text-[#00020d] dark:text-white font-normal">
                Featured article
              </h2>
              <div className="mb-14 flex flex-col sm:flex-row w-full">
                <Link href={`/blog/${featuredArticle.slug}`} legacyBehavior>
                  <a
                    className={`w-full text-gray-800 dark:text-gray-100 hover:text-blue-400 hover:dark:text-blue-400 transition-colors ${
                      latestArticle.cover_image
                        ? 'sm:w-1/2 lg:w-1/2 xl:w-3/5'
                        : 'sm:w-4/5'
                    }`}
                  >
                    <div key={featuredArticle.id}>
                      <h3 className="text-2xl">{featuredArticle.title}</h3>
                      <p className="text-sm my-1 text-gray-600 dark:text-gray-300">
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
                      <p className="text-base mt-2 text-gray-600 dark:text-gray-300">
                        {featuredArticle.description}
                      </p>
                      <p className="text-base mt-2 underline text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition-colors">
                        Read more
                      </p>
                    </div>
                  </a>
                </Link>
                {featuredArticle.cover_image && (
                  <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-2/5 mt-4 sm:mt-0 sm:ml-4 flex items-center justify-center">
                    <img
                      src={featuredArticle.cover_image}
                      className="w-full rounded-sm"
                      alt={featuredArticle.title}
                    />
                  </div>
                )}
              </div>
            </>
          )}
          <h2 className="text-2xl md:text-3xl mb-6 text-[#00020d] dark:text-white font-normal">
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
                  className="bg-[#000000] dark:bg-opacity-50 rounded-md drop-shadow-lg"
                >
                  <Link href={project.data.homepage || project.data.html_url} legacyBehavior>
                    <a
                      className="w-full text-white block p-[40px] break-words shadow-md"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="flex justify-between items-center text-xs uppercase tracking-[2.5px] mb-3">
                        <div className="flex items-center">
                          {project.fork ? (
                            <span className="text-yellow-400">Forked</span>
                          ) : (
                            <span className="text-green-400">Main Project</span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {
                            project.fork
                              ? project.languages.map((language: any, index: any) => (
                                  <span
                                    key={index}
                                    className="text-xs text-gray-200 mr-2"
                                  >
                                    {language}
                                  </span>
                                ))
                              : project.data.language && (
                                  <span className="text-xs text-gray-200">
                                    {project.data.language}
                                  </span>
                                )
                          }
                        </div>
                      </div>
                      <h3 className="text-2xl text-gray-100 mt-2">
                        {project.data.name}
                      </h3>
                      <p className="text-base mt-2 text-gray-200">
                        {project.data.description}
                      </p>

                      {/* Project Stats */}
                      <div className="mt-4 flex justify-between text-sm text-gray-300">
                        <div className="flex items-center">
                          <span className="mr-1">⭐</span> {project.data.stars || "0"} Stars
                        </div>
                        <div className="flex items-center">
                          <span className="mr-1">🍴</span> {project.data.forks || "0"} Forks
                        </div>
                        <div className="flex items-center">
                          <span className="mr-1">📅</span> Last Updated: {project.data.updated_at ? new Date(project.data.updated_at).toLocaleDateString() : "N/A"}
                        </div>
                      </div>

                      {/* Divider Line */}
                      <div className="mt-4 border-t border-gray-500"></div>
                    </a>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
          {/* Comments */}
          <div className="w-auto xl:w-full mb-6">
            <h1 className="text-base sm:text-lg my-4 font-light text-gray-600 dark:text-gray-300 leading-relaxed">
              Please feel free to leave a comment below or send me an e-mail :)
            </h1>
            
            {/* Comment Form */}
            <form className="mb-6" onSubmit={handleSubmit}>
              <div className="py-3 px-4 mb-4 rounded-lg border bg-white">
                <label htmlFor="name" className="sr-only">Your name</label>
                <input
                  id="name"
                  name="name"
                  className="px-3 py-2 w-full text-gray-600 text-sm border-0 focus:ring-0 focus:outline-none placeholder-gray-600 rounded-lg"
                  placeholder="Your name..."
                  required
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="py-3 px-4 mb-4 rounded-lg border bg-white">
                <label htmlFor="comment" className="sr-only">Your comment</label>
                <textarea
                  id="comment"
                  name="comment"
                  className="px-3 py-2 w-full text-sm border-0 focus:ring-0 focus:outline-none text-gray-600 placeholder-gray-600 rounded-lg"
                  placeholder="Write a comment..."
                  required
                  value={formData.comment}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center py-3 px-6 text-sm font-semibold text-white bg-indigo-800 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
              >
                Post Comment
              </button>
            </form>

            {/* Loading Indicator */}
            {isLoading ? (
              <div className="flex flex-col w-full items-center" role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 animate-spin text-gray-300 fill-purple-400"
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
              data.map((comment: any) => (
                <article
                  key={comment.Id}
                  className="mt-4 p-6 dark:bg-[#000000] bg-white text-gray-600 dark:text-gray-300 rounded-lg shadow-lg transition-all"
                >
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="text-sm text-gray-800 dark:text-gray-100 font-semibold">{comment.name}</p>
                    </div>
                  </footer>
                  <p className="text-base">{comment.Comment}</p>
                </article>
              ))
            )}
          </div>

        </div>
      </Layout>
      <hr className="h-px my-8 bg-[#00020d] border-0 dark:bg-white" />
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
        'configure-nginx-reverse-proxy-on-ubuntu-vms-ssl-encryption-o4m'
    ) || null

  // Get featured projects
  const featuredProjects = []

  featuredProjects.push({
    fork: false,
    data:
      projects.find(
        (Project) => Project.full_name === 'wildanazz/d3-spotify-genres'
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
