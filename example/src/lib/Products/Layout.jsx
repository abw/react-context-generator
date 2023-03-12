import React      from 'react'
import Products   from './Context.js'
import Container  from '../Container.jsx'
import Head       from 'next/head.js'

const Layout = ({Products, children}) =>
  <>
    <Head>
      <title>Products</title>
      <meta name="description" content="Products" />
    </Head>
    <main>
      <h1>Products Section</h1>
      { Products.ready
        ? children
        : 'Loading products... (not really, this is just a test)'
      }
    </main>
  </>

export default Container(Products, Layout)
