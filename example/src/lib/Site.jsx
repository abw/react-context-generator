import React from 'react'
import Head from 'next/head.js'
import Link from 'next/link.js'

const Site = ({Component, pageProps}) => {
  const getLayout = Component.getLayout || (page => page)

  return (
    <>
      <Head>
        <title>React Context Generator Example</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
        </nav>
        {getLayout(<Component {...pageProps} />)}
      </main>
    </>
  )
}

export default Site
