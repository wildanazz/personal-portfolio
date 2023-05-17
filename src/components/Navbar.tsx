import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Curtain from '@/components/Curtain'
import { navigations } from '@/components/Navigations'
import Toggle from '@/components/Toggle'
import DarkModeToggle from './DarkModeToggle'

const variants = {
  visible: {
    bottom: 0,
  },
  hidden: {
    bottom: '100vh',
  },
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleToggle(): void {
    setIsOpen(!isOpen)
  }

  return (
    <motion.div
      className="fixed top-0 right-0 bottom-[100vh] left-0"
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      transition={{
        type: 'tween',
        ease: [0.6, -0.28, 0.735, 0.045],
        duration: 0.5,
      }}
      variants={variants}
    >
      <Curtain isOpen={isOpen} />
      <DarkModeToggle />
      <nav className="text-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        {isOpen &&
          navigations.map((item) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: item.delay }}
              >
                <Link href={item.path} legacyBehavior>
                  <a
                    className="text-white block mb-2 pl-[0.3em] mx-[10px] my-[0] text-2xl md:text-3xl tracking-[0.3em] no-underline uppercase ease-in duration-300 hover:pl-[0.6em] hover:tracking-[0.6em] hover:text-[#d23669] dark:hover:text-[#00ace9]"
                    onClick={handleToggle}
                  >
                    {item.title}
                  </a>
                </Link>
              </motion.div>
            )
          })}
      </nav>
      <Toggle isOpen={isOpen} handleToggle={handleToggle} />
    </motion.div>
  )
}
