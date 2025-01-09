import { motion } from 'framer-motion'
import { GitHub, Twitter, Facebook, LinkedIn } from '@/components/Icons'

export default function Footer() {
  return (
    <footer className="whitespace-nowrap w-full flex flex-row items-center justify-center my-2 md:my-2 lg:my-0 h-[120px] md:h-[120px] lg:h-[90px] text-white">
      <div className="flex flex-col md:flex-col lg:flex-row justify-center items-center gap-y-1">
        <motion.div
          // initial={{ y: 10, opacity: 0 }}
          // whileInView={{ y: 0, opacity: 1 }}
          className="flex flex-col justify-center items-center gap-y-1 mx-2"
        >
          <div className="flex flex-row gap-x-1">
            <motion.div whileTap={{ scale: 1.5 }} whileHover={{ scale: 1.2 }}>
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
            <motion.div whileTap={{ scale: 1.5 }} whileHover={{ scale: 1.2 }}>
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
            <motion.div whileTap={{ scale: 1.5 }} whileHover={{ scale: 1.2 }}>
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
            <motion.div whileTap={{ scale: 1.5 }} whileHover={{ scale: 1.2 }}>
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
        </motion.div>
      <p className="text-[#00020d] dark:text-white text-sm">
        &nbsp;Copyright © 2025 MWA. All rights reserved.&nbsp;
      </p>
      <p className="text-[#00020d] dark:text-white text-sm">
        Built with ☕ and 🍩.
      </p>
      </div>
        {/* <a
          className="text-[#00020d] dark:text-white text-sm"
          href="mailto:wildanazzwa@gmail.com?Subject=Hello"
        >
          wildanazzwa@gmail.com
        </a> */}
        {/* <p className="text-[#00020d] dark:text-white text-sm">
          Powered by the Dev.to API
        </p> */}
    </footer>
  )
}
