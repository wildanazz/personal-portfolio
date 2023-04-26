import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <main className="flex flex-col items-start pt-24 px-8 sm:px-16 md:px-36 lg:px-52 xl:px-80 2xl:px-96">
        {children}
      </main>
    </>
  )
}
