import { useContext, useState, useEffect } from 'react'
import Image from 'next/image'

import { CartContext } from '../contexts/cart-context'

import s from '../styles/home.module.scss'

export default function Cart() {
  const { cart, setCart } = useContext(CartContext)
  const [nItems, setNItems] = useState(0)
  const [merchandiseTotal, setMerchandiseTotal] = useState(0)

  useEffect(() => {
    let items = 0
    cart.map(item =>
      item.quantities.map(q => (items += q.quantity))
    )
    setNItems(items)

    let merchandise = 0
    cart.map(item =>
      item.quantities.map((q, i) => {
        let indexSize = item.product.sizes.findIndex(e => e.name === q.size)
        merchandise += q.quantity * item.product.sizes[indexSize].price
      })
    )
    setMerchandiseTotal(merchandise)
  }, [{ cart }])


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
          item.quantities.map((variant, i) => (
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
              <div>£{item.product.sizes[item.product.sizes.findIndex(e => e.name === variant.size)].price}</div>
              <button onClick={() => handleRemove(item.id, variant.size)}>Delete</button>
              <hr />
            </div>
          )
          )
        )}
      </div>

      <div className={s.order}>
        <h3>Your Order ({nItems} items)</h3>
        <hr />
        <div>Merchandise £{merchandiseTotal}</div>
        <div>Estimated Shipping: £11?</div>
        <div>Subtotal £{merchandiseTotal + 11}</div>
        <button>Checkout</button>
      </div>
    </div>
  )
}
