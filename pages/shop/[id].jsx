import { useState, useContext, useEffect } from 'react'
import Image from 'next/image'

import { CartContext } from '../../contexts/cart-context'

// import s from '../../styles/product.module.scss'
import s2 from '../../styles/shop.module.scss'

export default function Product({ product }) {
  const { cart, setCart } = useContext(CartContext)
  const [sizeToSend, setSizeToSend] = useState('0')

  useEffect(() => {
    if (product.sizes.length === 1) {
      setSizeToSend(product.sizes[0].name)
    }
  }, [])

  function handleAdd() {
    if (sizeToSend !== '0') {
      setCart('ADD_QUANTITY', {
        id: product._id,
        select: sizeToSend,
        product
      })
    } else {
      console.error('error, no size selected')
    }
  }
  return (
    <div className={s2.root}>
      {/* delete next 2 lines */}
      <h3>Cart Content</h3>
      <p>{JSON.stringify(cart)}</p>
      <h3>{product.name}</h3>
      {product.images[0] && product.images.map((img) => (
        <Image src={`/backend/img/${img.filename}`}
          key={img.filename}
          alt=""
          width={100}
          height={100}
          // fill
          style={{ objectFit: 'cover' }}
          sizes="20vw"
          priority
        />
      ))}
      <p>{product.description}</p>
      <h3>From: £{product.sizes[0].price}</h3>
      {(product.sizes.length > 1) && <div>
        <div>Size</div>
        <select value={sizeToSend} onChange={e => setSizeToSend(e.target.value)}>
          <option value="0">Select</option>
          {product.sizes.map(size =>
            <option key={size.name} value={size.name}>{size.name} £{size.price}</option>
          )}
        </select>
      </div>}
      <br />
      <button onClick={handleAdd}>Add to Cart</button>
      <br /><br />
      <div>
        <h3>Key Ingredients</h3>
        <p>list...</p>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.BACKEND}/products`)
  const arrayProducts = await res.json()
  const paths = arrayProducts.map(p => ({
    params: { id: p._id },
  }))
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.BACKEND}/products/${context.params.id}`)
  const product = await res.json()
  return {
    props: { product },
  }
}