import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Background from './Background'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div className="hidden dark:block">
        <Background />
      </div>
      <motion.div
        initial={{ x: -200, y: 0, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        exit={{ x: 0, y: -100, opacity: 0 }}
        transition={{ type: 'linear' }}
      >
        <main className="flex flex-col items-start pt-24 px-8 sm:px-16 md:px-36 lg:px-52 xl:px-80 2xl:px-96 overflow-hidden">
          {children}
        </main>
      </motion.div>
    </>
  )
}
