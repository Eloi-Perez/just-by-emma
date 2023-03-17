import { useContext, useState, useEffect } from 'react'
import Image from 'next/image'

import { CartContext } from '../contexts/cart-context'
import Link from 'next/link'
import Bin from '../components/UI/svg/bin'
import QuantityButton from '../components/UI/quantity-button/quantity-button'
import CheckoutButton from '../components/checkout/checkout-button'

import styles from '../styles/cart.module.scss'

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
  if (cart.length > 0) {
    return (
      <>
        <div className={styles.container}>
          <div>
            {cart &&
              cart.map((item) =>
                // Object.keys(item.size).map((size, i) => {
                item.quantities.map((variant, i) => (
                  <div>
                    <div key={i} className={styles.itemContainer}>
                      <Link href="/shop">
                        <Image
                          src={`/backend/img/${item.product.images[0].filename}`}
                          alt=""
                          width={100}
                          height={100}
                          // fill
                          style={{ objectFit: 'cover', borderRadius: '50%', marginRight: '50px' }}
                          sizes="20vw"
                          priority
                        />
                      </Link>
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
                        <QuantityButton
                          variant={variant}
                          item={item}
                          handleAdd={handleAdd}
                          handleSub={handleSub}
                        />
                        <div>
                          £
                          {item.product.sizes[
                            item.product.sizes.findIndex((e) => e.name === variant.size)
                          ].price * variant.quantity}
                        </div>
                        <button
                          className={styles.button}
                          onClick={() => handleRemove(item.id, variant.size)}
                        >
                          <Bin />
                        </button>
                        <hr />
                      </div>
                    </div>
                  </div>
                ))
              )}
          </div>
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
  } else {
    return <div>Cart is empty</div>
  }
}
