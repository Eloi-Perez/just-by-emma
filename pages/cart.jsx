import { useContext, useState, useEffect } from 'react'
import Image from 'next/image'

import { CartContext } from '../contexts/cart-context'
import CheckoutButton from '../components/checkout/checkout-button'

import s from '../styles/home.module.scss'
import styles from '../styles/cart.module.scss'
import { GrTrash } from 'react-icons/gr'

export default function Cart() {
  const { cart, setCart } = useContext(CartContext)
  const [nItems, setNItems] = useState(0)
  const [merchandiseTotal, setMerchandiseTotal] = useState(0)

  useEffect(() => {
    const tempCart = [...cart]
    let items = 0
    tempCart.map((item) => item.quantities.map((q) => (items += q.quantity)))
    setNItems(items)

    let merchandise = 0
    tempCart.map((item) =>
      item.quantities.map((q, i) => {
        let indexSize = item.product.sizes.findIndex((e) => e.name === q.size)
        merchandise += q.quantity * item.product.sizes[indexSize].price
      })
    )
    setMerchandiseTotal(merchandise)
  }, [cart])

  function handleAdd(id, size) {
    setCart('ADD_QUANTITY', {
      id: id,
      select: size,
    })
  }
  function handleSub(id, size) {
    setCart('SUB_QUANTITY', {
      id: id,
      select: size,
    })
  }
  function handleRemove(id, size) {
    setCart('REMOVE_FROM_CART', {
      id: id,
      select: size,
    })
  }

  return (
    <>
      <h1 className={s.title}>CART</h1>
      {/* delete next 2 lines */}
      <h3>Cart Content</h3>
      <p>{JSON.stringify(cart)}</p>
      <div className={styles.container}>
        {cart &&
          cart.map((item) =>
            // Object.keys(item.size).map((size, i) => {
            item.quantities.map((variant, i) => (
              <div key={i} className={styles.itemContainer}>
                <Image
                  src={`/backend/img/${item.product.images[0].filename}`}
                  alt=""
                  width={100}
                  height={100}
                  // fill
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                  sizes="20vw"
                  priority
                />
                <div className={styles.lineContainer}>
                  <div className={styles.descriptionContainer}>
                    <h3>{item.product.name}</h3>
                    <p>
                      {variant.size} £
                      {
                        item.product.sizes[
                          item.product.sizes.findIndex((e) => e.name === variant.size)
                        ].price
                      }
                    </p>
                  </div>
                  <div className={styles.quantityContainer}>
                    <button
                      className={styles.button}
                      onClick={() => handleSub(item.id, variant.size)}
                    >
                      {' '}
                      -{' '}
                    </button>
                    <span> {variant.quantity} </span>
                    <button
                      className={styles.button}
                      onClick={() => handleAdd(item.id, variant.size)}
                    >
                      {' '}
                      +{' '}
                    </button>
                  </div>
                  <div>
                    £
                    {item.product.sizes[
                      item.product.sizes.findIndex((e) => e.name === variant.size)
                    ].price * variant.quantity}
                  </div>
                  <GrTrash onClick={() => handleRemove(item.id, variant.size)}>Delete</GrTrash>
                  <hr />
                </div>
              </div>
            ))
          )}

        <div className={styles.checkoutContainer}>
          <div className={styles.orderContainer}>
            <h3 className={styles.orderHeader}>Your Order ({nItems} items)</h3>
            <hr className={styles.hr} />
            <div className={styles.itemizedList}>
              <div className={styles.merchandise}>
                Merchandise <span className={styles.float}>£{merchandiseTotal}</span>
              </div>
              <div>
                Estimated Shipping: <span className={styles.float}>£11?</span>
              </div>
            </div>
            <div className={styles.subtotal}>
              Subtotal <span className={styles.float}>£{merchandiseTotal + 11}</span>
            </div>
          </div>
          <CheckoutButton style={styles.checkout} />
        </div>
      </div>
    </>
  )
}
