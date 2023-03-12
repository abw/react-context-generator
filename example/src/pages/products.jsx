import React  from 'react'
import Layout from '../lib/Layout.jsx'

const Products = ({ Products, products, product }) =>
  <>
    <h2>Products 1</h2>
    <p>
      We have {products?.length} products
    </p>
    <ul>
      { products.map(
        product =>
          <li key={product.id}>
            <a onClick={() => Products.selectProduct(product.id)}>
              {product.name}
            </a>
          </li>
      )}
    </ul>
    { Boolean(product) &&
        <>
          <h3>{product.name}</h3>
        </>
    }
  </>

export default Layout(Products)
