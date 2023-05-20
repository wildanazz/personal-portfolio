import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white dark:bg-[#101414] transition-colors duration-100 ease-linear">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
