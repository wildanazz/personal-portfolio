import { useState, useEffect } from 'react'
import Head from 'next/head'
import moment from 'moment'
import { motion, useScroll, useSpring } from 'framer-motion'
import { getArticlesFromAPI } from '@/lib/load-articles'
import ReCAPTCHA from 'react-google-recaptcha';
import Layout from '@/components/Layout'
import Footer from '@/components/Footer'

export default function ArticlePage({ article }: any) {
  const [data, setData] = useState<any>()
  const [isLoading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    email: '',
    captcha: '',
  })
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [postDataSuccess, setPostDataSuccess] = useState(false)
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (!captchaValue) {
      alert('Please verify the CAPTCHA.');
      return;
    }

    // Check if the email matches the regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

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
        email: '',
        captcha: ''
      })
    })
  }

  useEffect(() => {
    fetch('/comments')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
    setPostDataSuccess(false)
  }, [postDataSuccess])

  return (
    <>
      <Head>
        <title>WA | {article.title}</title>
        <meta name="description" content={article.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        className="fixed top-[0] right-[0] left-[0] h-[10px] bg-indigo-400 dark:bg-indigo-400 origin-[0%]"
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
          <div className="max-w-2xl w-full md:w-5/6 xl:w-9/12 mb-6">
              <h1 className="text-base sm:text-lg my-4 font-light text-gray-600 dark:text-gray-300 leading-relaxed">
                Please feel free to leave a comment below or send me an e-mail :)
              </h1>
              
              {/* Comment Form */}
              <form className="mb-6" onSubmit={handleSubmit}>
                <div className="py-3 px-4 mb-4 rounded-lg border bg-white">
                  <label htmlFor="email" className="sr-only">Your email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"  // Set the input type to "email"
                    className="px-3 py-2 w-full text-gray-600 text-sm border-0 focus:ring-0 focus:outline-none placeholder-gray-600 rounded-lg"
                    placeholder="Your email..."
                    required
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>

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

                {/* reCAPTCHA */}
                <div className="mb-4">
                  <ReCAPTCHA
                    sitekey="YOUR_GOOGLE_RECAPTCHA_SITE_KEY" // Replace with your site key
                    onChange={handleCaptchaChange}
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
                    className="mt-6 p-6 dark:bg-[#000000] bg-white text-gray-600 dark:text-gray-300 rounded-lg shadow-lg transition-all hover:shadow-xl bg-opacity-10 dark:bg-opacity-10"
                  >
                    {/* Comment Header */}
                    <footer className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        {/* Profile Image Placeholder */}
                        <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 mr-4">
                          {/* You can replace this with comment.profilePicture if available */}
                        </div>
                        <div>
                          <p className="text-sm text-gray-800 dark:text-gray-100 font-semibold">{comment.name}</p>
                          {/* Timestamp */}
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(comment.timestamp).toLocaleDateString()} at {new Date(comment.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </footer>
                
                    {/* Comment Text */}
                    <p className="text-base text-gray-700 dark:text-gray-300 mb-4">{comment.Comment}</p>
                
                    {/* Reply Button */}
                    <div className="flex justify-start text-sm text-gray-500 dark:text-gray-400">
                      <button className="hover:text-blue-500 focus:outline-none">Reply</button>
                    </div>
                
                    {/* Replies Section */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-6 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                        <h4 className="text-gray-700 dark:text-gray-300 font-semibold text-sm mb-4">Replies:</h4>
                        {comment.replies.map((reply: any, index: number) => (
                          <div key={index} className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center mb-3">
                              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 mr-3">
                                {/* You can replace this with reply.profilePicture if available */}
                              </div>
                              <div>
                                <p className="text-sm text-gray-800 dark:text-gray-100 font-semibold">{reply.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(reply.timestamp).toLocaleDateString()} at {new Date(reply.timestamp).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                            <p className="text-base text-gray-700 dark:text-gray-300">{reply.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
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
