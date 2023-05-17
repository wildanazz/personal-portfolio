import Image from 'next/image'
import { motion } from 'framer-motion'
import { GitHub, Twitter, Facebook, LinkedIn } from './Icons'

export default function Social() {
  return (
    <div className="flex flex-col items-center fixed right-[36px] bottom-0">
      <motion.div className="mb-[8px]" whileTap={{ scale: 1.5 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 1.5, 1] }}
          transition={{
            type: 'spring',
            duration: 1,
            delay: 1,
          }}
        >
          <a
            href="https://github.com/wildanazz"
            target="_blank"
            rel="noreferrer"
          >
            <GitHub width={36} height={36} />
          </a>
        </motion.div>
      </motion.div>
      <motion.div className="mb-[8px]" whileTap={{ scale: 1.5 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 1.5, 1] }}
          transition={{
            type: 'spring',
            duration: 1,
            delay: 1.2,
          }}
        >
          <a
            href="https://twitter.com/wildanazz"
            target="_blank"
            rel="noreferrer"
          >
            <Twitter width={36} height={36} />
          </a>
        </motion.div>
      </motion.div>
      <motion.div className="mb-[8px]" whileTap={{ scale: 1.5 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 1.5, 1] }}
          transition={{
            type: 'spring',
            duration: 1,
            delay: 1.4,
          }}
        >
          <a
            href="https://www.facebook.com/wildanazzwa/"
            target="_blank"
            rel="noreferrer"
          >
            <Facebook width={36} height={36} />
          </a>
        </motion.div>
      </motion.div>
      <motion.div className="mb-[8px]" whileTap={{ scale: 1.5 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 1.5, 1] }}
          transition={{
            type: 'spring',
            duration: 1,
            delay: 1.6,
          }}
        >
          <a
            href="https://www.linkedin.com/in/wildanazz/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedIn width={36} height={36} />
          </a>
        </motion.div>
      </motion.div>
      <motion.span
        className="w-[2px] bg-[#d23669] dark:bg-[#00ace9] mt-[8px]"
        initial={{
          height: 0,
        }}
        animate={{
          height: '2rem',
        }}
        transition={{
          type: 'spring',
          duration: 0.8,
          delay: 0.8,
        }}
      />
    </div>
  )
}
