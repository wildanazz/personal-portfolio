import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white dark:bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[#00020d] to-[#101414] transition-colors duration-100 ease-linear">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
