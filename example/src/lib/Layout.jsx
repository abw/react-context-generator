import React      from 'react'
import Products   from './Products.js'
import Container  from './Container.jsx'
import Head       from 'next/head.js'
import Link       from 'next/link.js'

const Layout = ({Products, children}) =>
  <>
    <Head>
      <title>Products</title>
      <meta name="description" content="Products" />
    </Head>
    <h1>Products Section</h1>
    <nav>
      [<Link href="/">Home</Link>]
      [<Link href="/products">Products</Link>]
    </nav>
    { Products.loading
      ? 'Loading...'
      : children
    }
  </>

export default Container(Products, Layout)
