import Head from 'next/head'
import Link from 'next/link'
import { InferGetStaticPropsType } from 'next'
import moment from 'moment'
import { motion } from 'framer-motion'
import { getArticlesFromAPI } from '@/lib/load-articles'
import Layout from '@/components/Layout'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function Blog({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const hoverColors = [
    "hover:text-red-400 dark:hover:text-red-400",
    "hover:text-orange-400 dark:hover:text-orange-400",
    "hover:text-yellow-400 dark:hover:text-yellow-400",
    "hover:text-green-400 dark:hover:text-green-400",
    "hover:text-blue-400 dark:hover:text-blue-400",
    "hover:text-indigo-400 dark:hover:text-indigo-400",
    "hover:text-purple-400 dark:hover:text-purple-400"
  ];

  // State for search term and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Generate unique tags from all articles
  const tags = Array.from(new Set(articles.flatMap(article => article.tag_list)));

  // Filter articles based on search term and selected filters
  const filteredArticles = articles.filter(article => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const matchesSearchTerm =
      article.title.toLowerCase().includes(lowerSearchTerm) ||
      article.description.toLowerCase().includes(lowerSearchTerm) ||
      article.tag_list.some(tag => tag.toLowerCase().includes(lowerSearchTerm));

    const matchesTag = selectedTag ? article.tag_list.includes(selectedTag) : true;
    const matchesDate = selectedDate
      ? moment(article.published_at).isSameOrAfter(moment(selectedDate))
      : true;

    return matchesSearchTerm && matchesTag && matchesDate;
  });

  return (
    <>
      <Head>
        <title>WA | Blog</title>
        <meta
          name="description"
          content="Blog - I share anything that may help others, technologies I'm using and cool things I've made."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open Graph Meta Tags for Social Media */}
        <meta
          property="og:description"
          content="Blog - I share anything that may help others, technologies I'm using and cool things I've made."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="WA | Blogs" />
        <meta
          property="og:image"
          content="/images/helmet.svg"
        />
        <meta property="og:url" content="https://wildanazz.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WA | Blogs" />
        <meta
          name="twitter:description"
          content="Blog - I share anything that may help others, technologies I'm using and cool things I've made."
        />
        <meta
          name="twitter:image"
          content="/images/helmet.svg" // Replace with your image URL
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "WA | Blogs",
              "url": "https://wildanazz.com/blog",
              "description": "I share anything that may help others, technologies I'm using and cool things I've made.",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://wildanazz.com/blog",
              },
              "blogPost": filteredArticles.map((article) => ({
                "@type": "BlogPosting",
                "headline": article.title,
                "url": `https://wildanazz.com/blog/${article.slug}`,
                "description": article.description,
                "datePublished": moment(article.published_at).toISOString(),
                "author": {
                  "@type": "Person",
                  "name": "Naz",
                },
                "image": article.cover_image || "https://wildanazz.com/default-image.jpg",
              })),
            }),
          }}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="mt-14 lg:mt-32 font-light w-full text-black dark:text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl pb-4 font-extrabold text-transparent bg-clip-text bg-[#00020d] dark:bg-white">
            Blogs
          </h1>
          <p className="font-medium pb-4 text-xl sm:text-2xl lg:text-3xl w-11/12 sm:w-5/6 md:w-11/12 lg:w-4/5 xl:w-3/5">
            I share anything that may help others, technologies I&apos;m using
            and cool things I&apos;ve made.
          </p>

          {/* Filter Dropdowns */}
          {/* <div className="flex gap-4 mt-4 mb-6 flex-wrap"> */}
            {/* Tag Filter */}
            {/* <div className="flex flex-col w-full sm:w-auto">
              <label htmlFor="tag" className="font-medium text-lg text-gray-600 dark:text-gray-300">Filter by Tag</label>
              <select
                id="tag"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-600 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00020d] transition duration-300"
              >
                <option value="">All Tags</option>
                {tags.map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div> */}

            {/* Date Filter */}
            {/* <div className="flex flex-col w-full sm:w-auto">
              <label htmlFor="date" className="font-medium text-lg text-gray-600 dark:text-gray-300">Filter by Date</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-600 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00020d] transition duration-300"
              />
            </div> */}
          {/* </div> */}
        </div>

        <div className="text-base sm:text-lg font-light leading-relaxed lg:w-4/5 2xl:w-2/3 mt-4">
        
          {/* Filter Dropdowns */}
          <div className="mb-6 mt-2 flex flex-col sm:flex-row gap-2">
            {/* Search Bar */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              className="w-full sm:w-[70%] px-4 py-3 border border-gray-300 rounded-lg text-gray-600 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00020d] transition duration-300"
            />
            <label htmlFor="tag" className="font-medium text-lg text-gray-600 dark:text-gray-300" />

            {/* Tag Filter */}
            <select
              id="tag"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-3 sm:w-[30%] border border-gray-300 rounded-lg text-gray-600 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00020d] transition duration-300"
            >
              <option value="">All Tags</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <motion.div key={article.id} className="mb-8">
                <motion.div className="flex flex-col sm:flex-row">
                  <Link href={`/blog/${article.slug}`} legacyBehavior>
                    <a
                      className={`w-full text-gray-800 dark:text-gray-100 ${hoverColors[index % hoverColors.length]} transition-colors rounded-lg`}
                    >
                      <h3 className="text-2xl">{article.title}</h3>
                      <p className="text-sm my-1 text-gray-600 dark:text-gray-300">
                        <span>
                          {moment(article.published_at).format('Do MMMM YYYY')}
                        </span>
                        <span className="px-1">-</span>
                        <span>{article.tag_list.map((tag) => `#${tag} `)}</span>
                      </p>
                      <p className="text-base mt-2 text-gray-600 dark:text-gray-300">
                        {article.description}
                      </p>
                      {/* Add Positive and Public Reaction Counts */}
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex flex-row space-x-4">
                        {/* Display Reading Time */}
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {article.reading_time_minutes} min read
                        </p>
                        <span>❤️ {article.public_reactions_count}</span>
                      </div>
                      <p className="text-base mt-2 underline text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition-colors">
                        Read more
                      </p>
                    </a>
                  </Link>
                  {article.cover_image && (
                    <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-2/5 mt-4 mr-4 sm:mt-0 sm:ml-4 flex items-center justify-center">
                      <img
                        src={article.cover_image}
                        className="w-full h-auto rounded-lg"
                        alt={article.title}
                      />
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))
          ) : (
            <p>No articles found matching your filters</p>
          )}
        </div>
      </Layout>
      <hr className="h-px my-8 bg-[#00020d] border-0 dark:bg-white" />
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const articles = await getArticlesFromAPI();

  return { props: { articles }, revalidate: 10 };
};
