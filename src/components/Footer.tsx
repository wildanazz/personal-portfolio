import { motion } from 'framer-motion'
import { GitHub, Twitter, Facebook, LinkedIn } from '@/components/Icons'

export default function Footer() {
  return (
    <footer className="whitespace-nowrap w-full flex flex-row items-center justify-center h-[120px] mt-6 mb-6 text-white">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        className="flex flex-col justify-center items-center gap-y-1"
      >
        <div className="flex flex-row gap-x-1">
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
        <p className="text-[#d23669] dark:text-[#d4433b] text-sm">
          © 2024 MWA.
        </p>
        <a
          className="text-[#d23669] dark:text-[#d4433b] text-sm"
          href="mailto:wildanazzwa@gmail.com?Subject=Hello"
        >
          wildanazzwa@gmail.com
        </a>
        <p className="text-[#d23669] dark:text-[#d4433b] text-sm">
          Powered by the Dev.to API
        </p>
      </motion.div>
    </footer>
  )
}
