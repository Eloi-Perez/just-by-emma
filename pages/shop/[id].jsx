import { useState, useContext, useEffect } from 'react'
import Image from 'next/image'

import { CartContext } from '../../contexts/cart-context'
import Carousel from '../../components/carousel/carousel'

// import s from '../../styles/shop.module.scss'

const toCurrency = (number) => {
  return new Intl.NumberFormat('en-uk', {
    style: 'currency',
    currency: 'GBP',
  }).format(number / 100)
}

export default function Product({ product }) {
  const { cart, setCart } = useContext(CartContext)
  const [sizeToSend, setSizeToSend] = useState('0')

  useEffect(() => {
    if (product.sizes.length === 1) {
      setSizeToSend(product.sizes[0].name)
    }
  }, [product])

  function handleAdd() {
    if (sizeToSend !== '0') {
      setCart('ADD_QUANTITY', {
        id: product._id,
        select: sizeToSend,
        product,
      })
    } else {
      console.error('error, no size selected')
    }
  }
  return (
    <>
      {/* delete next 2 lines */}
      <h3>Cart Content</h3>
      <p>{JSON.stringify(cart)}</p>
      <h3>{product.name}</h3>
      {product.images[0] && <Carousel images={product.images} />}
      <p>{product.description}</p>
      <h3>{product.sizes[1] && 'From: '}{toCurrency(product.sizes[0].price)}</h3>
      {product.sizes.length > 1 && (
        <div>
          <div>Size</div>
          <select value={sizeToSend} onChange={(e) => setSizeToSend(e.target.value)}>
            <option value="0">Select</option>
            {product.sizes.map((size) => (
              <option key={size.name} value={size.name}>
                {size.name} {toCurrency(size.price)}
              </option>
            ))}
          </select>
        </div>
      )}
      {product.sizes.length === 1 && (
        <div>
          <div>Size</div>
          <div>{product.sizes[0].name}</div>
        </div>
      )}
      <br />
      <button onClick={handleAdd}>Add to Cart</button>
      <br />
      <br />
      <div>
        <h3>Key Ingredients</h3>
        <p>list...</p>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  try {
    const res = await fetch(`${process.env.BACKEND}/v0/products`)
    if (!res.ok) {
      return {
        paths: [],
        fallback: false,
      }
    }
    const allProducts = await res.json()
    const availableProducts = await allProducts.map((pr) => {
      pr.sizes = pr.sizes.filter((s) => s.available)
      if (pr.sizes[0]) {
        return pr
      }
    })
    const arrayProducts = await availableProducts.filter((pr) => pr !== undefined)
    const paths = arrayProducts.map((p) => ({
      params: { id: p._id },
    }))
    return {
      paths,
      fallback: false, // can also be true or 'blocking'
    }
  } catch {
    return {
      paths: [],
      fallback: false,
    }
  }
}

export async function getStaticProps(context) {
  try {
    const res = await fetch(`${process.env.BACKEND}/v0/products/${context.params.id}`)
    if (!res.ok) {
      return { notFound: true }
    }
    const product = await res.json()
    product.sizes = await product.sizes.filter((s) => s.available)
    product.images.sort((a, b) => a.priority - b.priority)
    if (!product.sizes[0]) {
      return { notFound: true }
    }
    return {
      props: { product },
    }
  } catch {
    return { notFound: true }
  }
}
