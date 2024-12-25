import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Curtain from '@/components/Curtain'
import { navigations } from '@/components/Navigations'
import Toggle from '@/components/Toggle'
import DarkModeToggle from './DarkModeToggle'
import Profile from './Profile'
import { DeadAstronaut } from './Icons'

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
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [scrollDirection, setScrollDirection] = useState<string>('up')
  const [isAtTop, setIsAtTop] = useState<boolean>(true)

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

  // Handle window resizing to detect mobile screens
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768px is the standard breakpoint for mobile
      setIsOpen(false)
    };

    handleResize(); // Set the initial value based on the current screen width
    window.addEventListener('resize', handleResize); // Listen for resize events

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup the event listener on unmount
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsAtTop(true); // If the user is at the top, show the navbar
      } else {
        setIsAtTop(false); // If scrolled down, hide the navbar
      }

      if (window.scrollY > lastScrollY) {
        setScrollDirection('down'); // Scrolling down
      } else {
        setScrollDirection('up'); // Scrolling up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup event listener on unmount
    };
  }, []);

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
        <motion.div
          className="absolute left-[50vw] translate-x-[-50%] translate-y-[-50%] rotate-[135deg] z-[-100] top-[55vh]"
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
          variants={variants2}
        >
          <DeadAstronaut width={500} height={500} />
        </motion.div>
      )}
      <motion.nav 
        className="text-[#00020d]"
        animate={{
          opacity: isAtTop ? 1 : 0, // Fade in and out based on scroll position
          paddingLeft: isAtTop ? '0.6em' : '0.3em', // Increase padding when at top
          letterSpacing: isAtTop ? '0.3em' : '0.15em', // Increase letter spacing when at top
          display: isAtTop ? 'block' : 'none', // Hide element when not at top
        }}
      >
          {!isMobile && (
            // <div className="absolute top-[40px] left-[158px]">
            //   <a href="#" className="hover:text-indigo-400 px-3 py-2 rounded-md text-2xl tracking-[0.3em] uppercase no-underline ease-in duration-300 hover:pl-[0.6em] hover:tracking-[0.6em]">Home</a>
            //   <a href="#about" className="hover:text-indigo-400 px-3 py-2 rounded-md text-2xl tracking-[0.3em] uppercase no-underline ease-in duration-300 hover:pl-[0.6em] hover:tracking-[0.6em]">Blog</a>
            //   <a href="#services" className="hover:text-indigo-400 px-3 py-2 rounded-md text-2xl tracking-[0.3em] uppercase no-underline ease-in duration-300 hover:pl-[0.6em] hover:tracking-[0.6em]">Tools</a>
            //   <a href="#contact" className="hover:text-indigo-400 px-3 py-2 rounded-md text-2xl tracking-[0.3em] uppercase no-underline ease-in duration-300 hover:pl-[0.6em] hover:tracking-[0.6em]">Projects</a>
            // </div>
            <div className="font-medium absolute top-[40px] left-[158px] flex justify-center items-center space-x-4">
              {navigations.map((item) => {
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: item.delay }}
                  >
                    <Link href={item.path} legacyBehavior>
                      <a
                        className="dark:text-white px-3 py-2 text-2xl tracking-[0.15em] uppercase no-underline ease-in duration-300 hover:pl-[0.3em] hover:tracking-[0.3em] hover:text-indigo-400 dark:hover:text-indigo-400"
                      >
                        {item.title}
                      </a>
                    </Link>
                  </motion.div>
              )})}
            </div>
            
          )}
      </motion.nav>

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
                    className="text-white font-medium block mb-2 pl-[0.3em] mx-[10px] my-[0] text-2xl md:text-3xl tracking-[0.3em] no-underline uppercase ease-in duration-300 hover:pl-[0.6em] hover:tracking-[0.6em] hover:text-indigo-400 dark:hover:text-indigo-400"
                    onClick={handleToggle}
                  >
                    {item.title}
                  </a>
                </Link>
              </motion.div>
            )
          })}
      </nav>
      {isMobile && <Toggle isOpen={isOpen} handleToggle={handleToggle} />}
    </motion.div>
  )
}
