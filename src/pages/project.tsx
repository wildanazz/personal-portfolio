import { useState, Suspense, lazy } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { toollist } from '@/components/Toolslist'
import Layout from '@/components/Layout'
import { GitHub, Twitter, Facebook, LinkedIn } from '@/components/Icons'
import Footer from '@/components/Footer'
import { getProjectsFromApi } from '@/lib/load-projects'
import { InferGetStaticPropsType } from 'next'

const LetterboxdPlot = lazy(() => import('@/components/LetterboxdPlot'));
const EnaoPlot = lazy(() => import('@/components/EnaoPlot'));

const variant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const variantItem = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
}

export default function Project({ projects} : InferGetStaticPropsType<typeof getStaticProps>) {
  const [isHovered, setHovered] = useState(false)

  return (
    <>
      <Head>
        <title>WA | Projects</title>
        <meta
          name="description"
          content="Projects - Collections of projects I've been working and worked on."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open Graph Meta Tags for Social Media */}
        <meta
          property="og:description"
          content="Projects - Collections of projects I've been working and worked on."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="WA | Projects" />
        <meta
          property="og:image"
          content="/images/helmet.svg"
        />
        <meta property="og:url" content="https://wildanazz.com/project" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WA | Projects" />
        <meta
          name="twitter:description"
          content="Projects - Collections of projects I've been working and worked on."
        />
        <meta
          name="twitter:image"
          content="/images/helmet.svg"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {/* Header */}
        <div className="mt-14 lg:mt-32 font-light w-full text-black dark:text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl pb-4 font-extrabold text-transparent bg-clip-text bg-[#00020d] dark:bg-white">
            Projects
          </h1>
          <p className="font-medium pb-4 text-xl sm:text-2xl lg:text-3xl w-11/12 sm:w-5/6 md:w-11/12 lg:w-4/5 xl:w-3/5">
            Collections of projects I&apos;ve been working and worked on.
          </p>
        </div>

        {/* Images */}
        <h3 className='mt-4 text-2xl md:text-3xl mb-2 text-[#00020d] dark:text-white font-normal'>Featured projects</h3>
        <motion.div
          className="flex flex-wrap items-center justify-center text-base sm:text-lg font-light mb-2 leading-relaxed w-full"
          variants={variant}
          initial="hidden"
          animate="show"
        >
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
              </div>
            }>
              <LetterboxdPlot />
              <p className="text-base text-gray-600 dark:text-gray-300 max-w-prose px-4 sm:px-6">
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

          <div className='my-3 flex flex-col justify-center items-center'>
            <h3 className="text-2xl text-gray-800 dark:text-white font-light inline-block">
              Every Noise at Once
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
              </div>
            }>
              <EnaoPlot />
              <p className="text-base text-gray-600 dark:text-gray-300 max-w-prose px-4 sm:px-6">
                A data visualization of music genres scraped from ENAO (Every Noise at Once) website, showcasing a wide array of music samples from various genres simultaneously.
                See more
                <Link 
                  href={'https://wildanazz.github.io/d3-spotify-genres/'} 
                  legacyBehavior
                >
                  <a
                    className='text-rose-400'
                    target="_blank"
                    rel="noreferrer"
                  >
                    {' here.'}
                  </a>
                </Link>
              </p>
            </Suspense>
          </div>
        </motion.div>

        {/* Contents */}
        <h3 className='text-2xl md:text-3xl mb-4 text-[#00020d] dark:text-white font-normal'>Other projects</h3>
        <div className="flex flex-wrap items-center justify-center text-base sm:text-lg font-light leading-relaxed w-full">
          <div className="flex flex-wrap w-full gap-6 justify-center my-3">
            {projects.map((project: any) => (
              <motion.article
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                animate={{ opacity: isHovered ? 0.25 : 1 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                key={project.id}
                className="bg-[#000000] dark:bg-opacity-50 rounded-lg drop-shadow-lg w-full sm:w-64 md:w-72 flex flex-col"
              >
                <Link href={project.html_url} legacyBehavior>
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
                        {project.fork
                          ? project.languages?.map((language: any, index: any) => (
                              <span key={index} className="text-xs text-gray-200 mr-2">
                                {language}
                              </span>
                            ))
                          : project.language && (
                              <span className="text-xs text-gray-200">
                                {project.language}
                              </span>
                            )}
                      </div>
                    </div>
                    <h3 className="text-xl text-gray-100 mt-2">{project.name}</h3>
                    <p className="text-sm mt-2 text-gray-200 line-clamp-2 flex-grow">
                      {project.description}
                    </p>

                    {/* Project Stats */}
                    <div className="mt-4 flex justify-between text-xs text-gray-300">
                      <div className="flex items-center flex-1">
                        <span className="mr-1 text-4xl">⭐</span> {project.stars || '0'} Stars
                      </div>
                      <div className="flex items-center flex-1">
                        <span className="mr-1">🍴</span> {project.forks || '0'} Forks
                      </div>
                      <div className="flex items-center flex-1">
                        <span className="mr-1">📅</span> Last Updated: {project.updated_at ? new Date(project.updated_at).toLocaleDateString() : 'N/A'}
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
        <hr className="h-px bg-[#00020d] border-0 dark:bg-white" />
        <Footer />
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const projects = await getProjectsFromApi()

  return { props: { projects }, revalidate: 10 }
}