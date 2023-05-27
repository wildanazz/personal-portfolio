import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { InferGetStaticPropsType } from 'next'
import { motion } from 'framer-motion'
import { getProjectsFromApi } from '@/lib/load-projects'
import Footer from '@/components/Footer'

export default function Project({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [isHovered, setHovered] = useState(false)

  return (
    <>
      <Head>
        <title>WA | Projects 💻</title>
        <meta
          name="description"
          content="Projects - Collections of projects I've been working and worked on."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: 'linear' }}
      >
        <main className="relative flex flex-col mt-24 mx-8 sm:mx-16 md:mx-36 lg:mx-52 xl:mx-80 2xl:mx-96">
          {/* Header */}
          <div className="mt-14 lg:mt-32 font-light text-black dark:text-white static xl:fixed w-auto xl:w-1/5">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl pb-4 font-extrabold text-transparent bg-clip-text bg-[#d23669] dark:bg-[#00ace9]">
              Projects
            </h1>
            <p className="text-2xl sm:text-3xl lg:text-4xl">
              Collections of projects I&apos;ve been working and worked on.
            </p>
            <div className="hidden xl:block fixed bottom-0 w-auto xl:w-1/5">
              <Footer />
            </div>
          </div>
          {/* Contents */}
          <div className="text-base sm:text-lg font-light leading-relaxed text-gray-600 mt-24 md:mt-32 xl:mt-44 right-0 static xl:absolute w-auto xl:w-3/5">
            <div className="mb-14 flex flex-col w-full gap-4">
              {projects.map((project) => (
                <motion.article
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  animate={{ opacity: isHovered ? 0.25 : 1 }}
                  whileHover={{ opacity: 1, scale: 1.025 }}
                  key={project.id}
                  className="bg-[#00020d] bg-opacity-10 rounded-md"
                >
                  <Link href={project.html_url} legacyBehavior>
                    <a className="w-full text-gray-500 dark:text-gray-300 block p-[40px] break-words">
                      <p className="text-xs uppercase tracking-[2.5px]">
                        {project.language}
                      </p>
                      <h3 className="text-2xl text-gray-600 dark:text-gray-100 mt-2">
                        {project.full_name}
                      </h3>
                      <p className="text-base mt-2">{project.description}</p>
                    </a>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </main>
      </motion.div>
      <div className="block xl:hidden">
        <Footer />
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const projects = await getProjectsFromApi()

  return { props: { projects }, revalidate: 10 }
}
