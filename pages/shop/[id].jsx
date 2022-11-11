import { useState, useContext } from 'react'
import Image from 'next/image'

import { CartContext } from '../../contexts/cart-context'

// import s from '../../styles/product.module.scss'
import s2 from '../../styles/shop.module.scss'

export default function Product({ product }) {
  const { cart, setCart } = useContext(CartContext)
  const [size, setSize] = useState('0')

  function handleAdd() {
    if (size !== '0') {
      setCart('ADD_QUANTITY', {
        id: product._id,
        sizeTo: size
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
      <h3>From: £{product.price}</h3>
      <div>
        <div>Size</div>
        <select value={size} onChange={e => setSize(e.target.value)}>
          <option value="0">Select</option>
          <option value="s50ml">50ml £18.00</option>
          <option value="s15ml">15ml £ 5.00</option>
        </select>
      </div>
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