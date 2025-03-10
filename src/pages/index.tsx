import { useState, useEffect, Suspense, lazy } from 'react'
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
  LetterBoxd
} from '@/components/Icons'
import Footer from '@/components/Footer'
import { getFilmsFromAPI } from '@/lib/load-films'
import { getArticlesFromAPI } from '@/lib/load-articles'
import { getLanguagesFromFork, getProjectsFromApi } from '@/lib/load-projects'
import {
  writeArticlesToCache,
  writeFilmsToCache,
  writePlaylistsToCache,
  writeProjectsToCache,
} from '@/lib/utils'
import { getPlaylistFromAPI } from '@/lib/load-playlist'
const LetterboxdPlot = lazy(() => import('@/components/LetterboxdPlot'));
const EnaoPlot = lazy(() => import('@/components/EnaoPlot'));

export default function Home({
  playlists,
  latestArticle,
  featuredArticle,
  featuredProjects,
  films
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [isHovered, setHovered] = useState(false)
  // const [data, setData] = useState<any>()
  // const [isLoading, setLoading] = useState(true)
  // const [formData, setFormData] = useState({
  //   name: '',
  //   comment: '',
  // })
  // const [postDataSuccess, setPostDataSuccess] = useState(false)

  // useEffect(() => {
  //   fetch('/comments')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data)
  //       setLoading(false)
  //     })
  //   setPostDataSuccess(false)
  // }, [postDataSuccess])

  // const handleChange = (e: any) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   })
  // }

  // const handleSubmit = (e: any) => {
  //   e.preventDefault()

  //   fetch('/comments', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   }).then(() => {
  //     setPostDataSuccess(true)
  //     setFormData({
  //       name: '',
  //       comment: '',
  //     })
  //   })
  // }

  function renderStars(rating: number) {
    const filledStars = '★'.repeat(Math.round(rating)); // Rounded filled stars
    const emptyStars = '☆'.repeat(5 - Math.round(rating)); // Empty stars to make total of 5
    return filledStars + emptyStars; // Combine filled and empty stars
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
        {/* Open Graph Meta Tags for Social Media */}
        <meta
          property="og:description"
          content="Hi, I'm Naz - I'm a Software Engineer from Brisbane, AU. I work with various technologies like Node.js, Python, and more."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="WA | Home" /> 
        <meta
          property="og:image"
          content="/images/helmet.svg"
        />
        <meta property="og:url" content="https://wildanazz.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Naz | Software Engineer" />
        <meta
          name="twitter:description"
          content="Hi, I'm Naz - I'm a Software Engineer from Brisbane, AU. I work with various technologies like Node.js, Python, and more."
        />
        <meta
          name="twitter:image"
          content="/images/helmet.svg"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {/* Header */}
        <div className="mt-14 lg:mt-32 font-light w-full text-[#00020d] dark:text-white">
          <div className="flex flex-row gap-4 flex-wrap pb-4 items-center">
          <h1 className="drop-shadow-lg text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-[#00020d] dark:text-white">
              Hi, I&apos;m
            </h1>
            <h1 className="drop-shadow-lg text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-contain bg-clip-text bg-[url('/vibrant_flower.png')] animate-stripes">
              Naz
            </h1>
            {/* <h1 className="drop-shadow-lg text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-[#00020d] dark:bg-white">
              Hi, I&apos;m Wildan
            </h1> */}
            {/* <h1 className="drop-shadow-lg text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-[#00020d] dark:text-white">
              Hi, I&apos;m Naz
            </h1> */}
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
        </div>

        {/* About */}
        <div className="text-base sm:text-lg font-light leading-relaxed lg:w-4/5 2xl:w-2/3 text-gray-600 dark:text-gray-300 mt-4">
          <h2 className="text-2xl md:text-3xl mb-4 text-[#00020d] dark:text-white font-normal">
            About
          </h2>
          <p className="my-2">
            I mainly build and develop applications using Node.js (with TypeScript), Python, and Java.
            I&apos;m also passionate about cloud computing technologies and computational learning.
            Currently exploring ways to use data to tell engaging and insightful stories.
          </p>
          <p className="my-2">
            In my spare time, I create content for my blog where I discuss other
            projects I&apos;ve been working on, interesting problems I&apos;ve
            had to solve, and create tutorials to educate, and help others use
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
          <div className="flex flex-row gap-2 flex-wrap my-6 items-center drop-shadow-lg">
            <Link
              href="https://open.spotify.com/user/31gv36hn5nnojr335xoy327cixs4"
              target="_blank"
              aria-label="spotify account"
            >
              <Spotify width={96} height={32} />
            </Link>
            <Link
              href="https://letterboxd.com/wildanazz/films/"
              target="_blank"
              aria-label="letterboxd"
            >
              <LetterBoxd width={256} height={32} />
            </Link>    
          </div>
          <div className="mx-auto max-w-sm md:max-w-2xl inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_16px,_black_calc(100%-25px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-0.5 [&_img]:max-w-none animate-infinite-scroll transform-gpu">
              {playlists.items.map((playlist: any) => (
                <li key={playlist.id}>
                  <Link
                    href={playlist.external_urls.spotify}
                    target="_blank"
                    aria-label="external url 1"
                  >
                    <Image
                      className="rounded-sm"
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
                      className="rounded-sm"
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
          <div className="mx-auto max-w-sm md:max-w-2xl inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_16px,_black_calc(100%-25px),transparent_100%)]">
            <ul className="flex items-center justify-start md:justify-start [&_li]:mx-2 [&_img]:max-w-none animate-infinite-scroll-reversed transform-gpu border-t border-b border-gray-500 py-2">
              {films.map((film: any) => (
                <li key={film.Film_title} className="whitespace-nowrap flex flex-row items-center justify-center gap-4 hover:text-gray-700 dark:hover:text-gray-400">
                  <Link href={film.Film_URL} target="_blank" aria-label={film.Film_title}>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{film.Film_title}, {film.Release_year}</span>
                      <span className="text-2xl text-gray-600">
                        {renderStars(film.Average_rating)}
                      </span>
                    </div>
                  </Link>
                  <span className="text-2xl text-gray-500">•</span>
                </li>
              ))}
            </ul>
            <ul className="flex items-center justify-start md:justify-start [&_li]:mx-2 [&_img]:max-w-none animate-infinite-scroll-reversed transform-gpu border-t border-b border-gray-500 py-2"
                aria-hidden="true"
            >
              {films.map((film: any) => (
                <li key={film.Film_title} className="whitespace-nowrap flex flex-row items-center justify-center gap-4 hover:text-gray-700 dark:hover:text-gray-400">
                  <Link href={film.Film_URL} target="_blank" aria-label={film.Film_title}>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{film.Film_title}, {film.Release_year}</span>
                      <span className="text-2xl text-gray-600">
                        {renderStars(film.Average_rating)}
                      </span>
                    </div>
                  </Link>
                  <span className="text-2xl text-gray-500">•</span>
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
                  {/* Add Positive and Public Reaction Counts */}
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex flex-row space-x-4">
                    {/* Display Reading Time */}
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {latestArticle.reading_time_minutes} min read
                    </p>
                    <span>❤️ {latestArticle.public_reactions_count}</span>
                  </div>
                  <p className="text-base mt-2 underline text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition-colors">
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
                      {/* Add Positive and Public Reaction Counts */}
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex flex-row space-x-4">
                        {/* Display Reading Time */}
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {featuredArticle.reading_time_minutes} min read
                        </p>
                        <span>❤️ {featuredArticle.public_reactions_count}</span>
                      </div>
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
          <h2 className="text-2xl md:text-3xl mb-2 text-[#00020d] dark:text-white font-normal">
            Recent projects
          </h2>
          <div className="flex flex-wrap items-center justify-center text-base sm:text-lg font-light leading-relaxed w-full">
            <div className="flex flex-wrap w-full gap-6 justify-center">
              
              {/* Letterboxd Plot */}
              <div className='my-3 flex flex-col justify-center items-center'>
                  <h3 className="text-2xl text-gray-800 dark:text-white font-light inline-block">
                    Popular Films on Letterboxd (2024)
                  </h3>
                  <Suspense fallback={
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
                    </div>}
                  >
                    <LetterboxdPlot />
                    <p className="text-base text-gray-600 dark:text-gray-300">
                      My attempt to apply UMAP (Uniform Manifold Approximation and Projection), a dimensionality reduction technique, to visualize and represent popular films scraped from Letterboxd in 2024. 
                      See more
                      <Link 
                        href={'https://wildanazz.github.io/letterboxd-umap/'} 
                        legacyBehavior
                      >
                        <a
                          className='text-indigo-400'
                          target="_blank"
                          rel="noreferrer"
                        >
                          {' here.'}
                        </a>
                      </Link>
                    </p>
                  </Suspense>
              </div>

              {featuredProjects.map((project: any, index) => (
                <motion.article
                  onHoverStart={() => setHovered(true)}
                  onHoverEnd={() => setHovered(false)}
                  animate={{ opacity: isHovered ? 0.25 : 1 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  key={project.id}
                  className="bg-[#000000] dark:bg-opacity-50 rounded-lg drop-shadow-lg w-full sm:w-64 md:w-72 flex flex-col"
                >
                  <Link href={project.data.html_url} legacyBehavior>
                    <a
                      className="w-full text-white block p-4 break-words shadow-md flex flex-col justify-between sm:h-[285px] h-full"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="flex justify-between items-center text-xs uppercase tracking-[2px] mb-2">
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
                      <h3 className="text-xl text-gray-100 mt-2">{project.data.name}</h3>
                      <p className="text-sm mt-2 text-gray-200 line-clamp-2 flex-grow">{project.data.description}</p>
                      
                      {/* Project Stats */}
                      <div className="mt-4 flex justify-between text-xs text-gray-300">
                        <div className="flex items-center flex-1">
                          <span className="mr-1 text-4xl">⭐</span> {project.data.stars || '0'} Stars
                        </div>
                        <div className="flex items-center flex-1">
                          <span className="mr-1">🍴</span> {project.data.forks || '0'} Forks
                        </div>
                        <div className="flex items-center flex-1">
                          <span className="mr-1">📅</span> Last Updated: {project.data.updated_at ? new Date(project.data.updated_at).toLocaleDateString() : 'N/A'}
                        </div>
                      </div>

                      {/* Divider Line */}
                      <div className="mt-4 border-t border-gray-500"></div>
                    </a>
                  </Link>
                </motion.article>
              ))}
              
            </div>
              <div className="text-xl text-[#00020d] dark:text-white flex items-center justify-start mt-9 font-normal">
                <Link href="/project" legacyBehavior>
                  <a className="transition duration-300 ease-in-out focus:outline-none dark:hover:text-purple-400 hover:text-purple-400">
                    More projects ››››
                  </a>
                </Link>
              </div>
          </div>
        <hr className="h-px bg-[#00020d] border-0 dark:bg-white mt-9" />
        <Footer />
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const articles = await getArticlesFromAPI()
  const projects = await getProjectsFromApi()
  const playlists = await getPlaylistFromAPI()
  const films = await getFilmsFromAPI()

  // Write articles to cache
  writeArticlesToCache(articles)

  // Write projects to cache
  writeProjectsToCache(projects)

  // Write projects to cache
  writePlaylistsToCache(playlists)

  // Write films to cache
  writeFilmsToCache(films)

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
    image: 'https://wildanazz.github.io/d3-spotify-genres/data/image.png',
  })

  featuredProjects.push({
    fork: false,
    data:
      projects.find((Project) => Project.full_name === 'wildanazz/gcn-http-server') ||
      null
  })

  featuredProjects.push({
    fork: true,
    data:
      projects.find(
        (Project) => Project.full_name === 'wildanazz/Letterboxd-list-scraper'
      ) || null,
    languages: Object.keys({"python": 1000}),
  })
  
  // const languages = await getLanguagesFromFork()
  // featuredProjects.push({
  //   fork: true,
  //   data:
  //     projects.find(
  //       (Project) => Project.full_name === 'wildanazz/PatternFlow'
  //     ) || null,
  //   languages: Object.keys(languages),
  // })

  // featuredProjects.push({
  //   fork: false,
  //   data:
  //     projects.find((Project) => Project.full_name === 'wildanazz/minote') ||
  //     null,
  // })

  return {
    props: { playlists, latestArticle, featuredArticle, featuredProjects, films },
    revalidate: 10,
  }
}
