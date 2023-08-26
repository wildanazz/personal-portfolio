import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Curtain from '@/components/Curtain'
import { navigations } from '@/components/Navigations'
import Toggle from '@/components/Toggle'
import DarkModeToggle from './DarkModeToggle'
import Profile from './Profile'

const variants = {
  visible: {
    bottom: 0,
  },
  hidden: {
    bottom: '100vh',
  },
}

const variants2 = {
  open: {
    opacity: 1,
    display: 'block',
  },
  closed: {
    opacity: 0,
    transitionEnd: {
      display: 'none',
    },
  },
}

export default function Navbar() {
  const text = 'Wildan'
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleToggle(): void {
    setIsOpen(!isOpen)
  }

  const ctrls = useAnimation()

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      ctrls.start('visible')
    }

    if (!inView) {
      ctrls.start('hidden')
    }
  }, [ctrls, inView])

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
      <div className="flex flex-row justify-center items-center absolute top-[30px] left-[24px] rounded-[50px] text-3xl text-yellow-400 dark:text-yellow-300 focus:outline-none gap-5">
        <Profile />
        <DarkModeToggle />
      </div>

      {/* Astronaut */}
      {isOpen && (
        <motion.img
          className="absolute top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%] rotate-[135deg] z-[-100]"
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          exit={{ opacity: 0 }}
          src={'/images/dead_astronaut.svg'}
          alt="dead astronaut"
          width={500}
          height={250}
          transition={{ duration: 2.4, delay: 1.2, ease: 'linear' }}
          variants={variants2}
        />
      )}

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
                    className="text-white block mb-2 pl-[0.3em] mx-[10px] my-[0] text-2xl md:text-3xl tracking-[0.3em] no-underline uppercase ease-in duration-300 hover:pl-[0.6em] hover:tracking-[0.6em] hover:text-[#d23669] dark:hover:text-[#d4433b]"
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
