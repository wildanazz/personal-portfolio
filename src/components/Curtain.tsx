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

export default function Curtain({ isOpen }: CurtainProps) {
  return (
    <motion.section
      className="fixed top-0 right-0 bottom-auto left-0"
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      transition={{ duration: 0.5 }}
      variants={variants}
    />
  )
}
