import { useState, useContext } from 'react'
import Image from 'next/image'

import { CartContext } from '../contexts/cart-context'

import s from '../styles/home.module.scss'

export default function Contact() {
  const { cart, setCart } = useContext(CartContext)

  function handleAdd(id, size) {
    setCart('ADD_QUANTITY', {
      id: id,
      select: size
    })
  }
  function handleSub(id, size) {
    setCart('SUB_QUANTITY', {
      id: id,
      select: size
    })
  }
  function handleRemove(id, size) {
    setCart('REMOVE_FROM_CART', {
      id: id,
      select: size
    })
  }


  return (
    <div className={s.root}>
      <h1 className={s.title}>CART</h1>
      {/* delete next 2 lines */}
      <h3>Cart Content</h3>
      <p>{JSON.stringify(cart)}</p>
      <div>
        {cart && cart.map(item =>
          // Object.keys(item.size).map((size, i) => {
          item.quantities.map((variant, i) => {
            return (
              <div key={i}>
                <Image src={`/backend/img/${item.product.images[0].filename}`}
                  alt=""
                  width={100}
                  height={100}
                  // fill
                  style={{ objectFit: 'cover' }}
                  sizes="20vw"
                  priority
                />
                <h3>{item.product.name}</h3>
                <p>{variant.size}</p>
                <button onClick={() => handleSub(item.id, variant.size)}>Subtract</button>
                <span> {variant.quantity} </span>
                <button onClick={() => handleAdd(item.id, variant.size)}>Add</button>
                <div>£20.00</div>
                <button onClick={() => handleRemove(item.id, variant.size)}>Delete</button>
                <hr />
              </div>
            )
          })
        )}
      </div>

      <div className={s.order}>
        <h3>Your Order (X items)</h3>
        <hr />
        <div>Merchandise £888</div>
        <div>Estimated Shipping: £111</div>
        <div>Subtotal £999</div>
        <button>Member Checkout</button>
        <button>Guest Checkout</button>
      </div>
    </div>
  )
}
