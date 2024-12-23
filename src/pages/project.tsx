import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { InferGetStaticPropsType } from 'next'
import { motion } from 'framer-motion'
import { getProjectsFromApi } from '@/lib/load-projects'
import { GitHub, Twitter, Facebook, LinkedIn } from '@/components/Icons'
import Background from '@/components/Background'

export default function Project({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hidden dark:block">
        <Background />
      </div>
      <motion.div
        initial={{ x: -200, y: 0, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        exit={{ x: 0, y: -100, opacity: 0 }}
        transition={{ type: 'linear' }}
      >
        <main className="relative flex flex-col mt-24 mx-8 sm:mx-16 md:mx-36 lg:mx-52 xl:mx-80 2xl:mx-96">
          {/* Header */}
          <div className="mt-14 lg:mt-32 font-light text-black dark:text-white static xl:fixed w-auto xl:w-1/5">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl pb-4 font-extrabold text-transparent bg-clip-text bg-[#00020d] dark:bg-white">
              Projects
            </h1>
            <p className="font-medium pb-4 text-xl sm:text-2xl lg:text-3xl">
              Collections of projects I&apos;ve been working and worked on.
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
          {/* Contents */}
          <div className="text-base sm:text-lg font-light leading-relaxed text-gray-600 mt-12 right-0 static xl:absolute w-auto xl:w-3/5">
            <div className="mb-14 flex flex-col w-full gap-4">
              {projects.map((project: any) => (
                <motion.article
                  onHoverStart={() => setHovered(true)}
                  onHoverEnd={() => setHovered(false)}
                  animate={{ opacity: isHovered ? 0.25 : 1 }}
                  whileHover={{ opacity: 1, scale: 1.025 }}
                  key={project.id}
                  className="bg-[#000000] dark:bg-opacity-50 rounded-md drop-shadow-lg"
                >
                  <Link href={project.html_url} legacyBehavior>
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
                              ? project.languages?.map((language: any, index: any) => (
                                  <span
                                    key={index}
                                    className="text-xs text-gray-200 mr-2"
                                  >
                                    {language}
                                  </span>
                                ))
                              : project.language && (
                                  <span className="text-xs text-gray-200">
                                    {project.language}
                                  </span>
                                )
                          }
                        </div>
                      </div>
                      <h3 className="text-2xl text-gray-100 mt-2">
                        {project.name}
                      </h3>
                      <p className="text-base mt-2 text-gray-200">
                        {project.description}
                      </p>

                      {/* Project Stats */}
                      <div className="mt-4 flex justify-between text-sm text-gray-300">
                        <div className="flex items-center">
                          <span className="mr-1">⭐</span> {project.stars || "0"} Stars
                        </div>
                        <div className="flex items-center">
                          <span className="mr-1">🍴</span> {project.forks || "0"} Forks
                        </div>
                        <div className="flex items-center">
                          <span className="mr-1">📅</span> Last Updated: {project.updated_at ? new Date(project.updated_at).toLocaleDateString() : "N/A"}
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
        </main>
      </motion.div>
    </>
  )
}

export const getStaticProps = async () => {
  const projects = await getProjectsFromApi()

  return { props: { projects }, revalidate: 10 }
}
