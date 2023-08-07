import { motion } from 'framer-motion'

type CurtainProps = {
  isOpen: boolean
}

const variants = {
  open: {
    height: '100vh',
    opacity: 0.9,
    backgroundColor: '#000000',
  },
  closed: {
    height: 0,
  },
}

const variants2 = {
  open: {
    opacity: 0.9,
    top: '100vh',
    display: 'block',
  },
  closed: {
    opacity: 0,
    top: 35,
    transitionEnd: {
      display: 'none',
    },
  },
}

export default function Curtain({ isOpen }: CurtainProps) {
  return (
    <>
      <motion.section
        className="fixed top-0 right-0 bottom-auto left-0"
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.5 }}
        variants={variants}
      />
      <motion.img
        className="block absolute top-1/2 left-1/2 translate-x-[-50%] rotate-[135deg] z-[-100]"
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        exit={{ opacity: 0 }}
        src={'/images/dead_astronaut.svg'}
        alt=""
        width={225}
        height={225}
        transition={{ duration: 0.5 }}
        variants={variants2}
      />
    </>
  )
}
