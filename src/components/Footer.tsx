import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center h-[90px] mt-12">
      <a
        className="text-sm mb-4 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
        href="mailto:mwa@wildanazz.com?Subject=Hello"
      >
        mwa@wildanazz.com
      </a>
      <Link href="https://developers.forem.com/api" legacyBehavior>
        <a className="text-sm mb-8 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">
          Powered by the Dev.to API. Find out more.
        </a>
      </Link>
    </footer>
  )
}
