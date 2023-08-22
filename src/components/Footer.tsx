import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="whitespace-nowrap w-full flex flex-row items-center justify-center h-[120px] mt-12 text-white bg-[#00020d] dark:bg-[#d4433b] dark:bg-opacity-50">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        className="flex flex-col justify-center items-center gap-y-1"
      >
        <p className="text-sm">© 2023 MWA.</p>
        <a
          className="text-sm"
          href="mailto:wildanazzwa@gmail.com?Subject=Hello"
        >
          wildanazzwa@gmail.com
        </a>
      </motion.div>
    </footer>
  )
}
