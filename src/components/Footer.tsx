import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="whitespace-nowrap w-full flex flex-row items-center justify-center h-[120px] mt-12 text-gray-600 dark:text-gray-300 gap-2.5">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        className="flex flex-col justify-center items-center gap-2.5"
      >
        <p>© 2023 MWA.</p>
        <a href="mailto:wildanazzwa@gmail.com?Subject=Hello">
          wildanazzwa@gmail.com
        </a>
      </motion.div>
    </footer>
  )
}
