import { useContext, useState, useEffect } from 'react'
import Image from 'next/image'

import { CartContext } from '../contexts/cart-context'
import Link from 'next/link'
import { Bin } from '../components/UI/svg'
import QuantityButton from '../components/UI/quantity-button/quantity-button'
import { Button } from '../components/UI/button/button.styles'
import CheckoutButton from '../components/checkout/checkout-button'

import styles from '../styles/cart.module.scss'

const toCurrency = (number) => {
  return new Intl.NumberFormat('en-uk', {
    style: 'currency',
    currency: 'GBP',
  }).format(number / 100)
}

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
      <div className={styles.container}>
        <div>
          <h2 className={styles.visible}>CHECKOUT</h2>
          {cart &&
            cart.map((item) =>
              item.quantities.map((variant, i) => (
                <div key={i} className={styles.item_container}>
                  <Link href={`/shop/${item.id}`}>
                    <Image
                      src={`/backend/img/products/${item.product.images[0].filename}`}
                      alt="product image"
                      width={100}
                      height={100}
                      placeholder="blur"
                      blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP3g3f///yH5BAEAAAEALAAAAAABAAEAAAICRAEAOw=="
                      sizes="20vw"
                      priority
                      style={{ objectFit: 'cover', borderRadius: '50%', marginRight: '50px' }}
                    />
                  </Link>
                  <div className={styles.line_container}>
                    <div className={styles.description_container}>
                      <h3>{item.product.name}</h3>
                      <p>
                        {variant.size}{' '}
                        {item.product.sizes[0].price
                          ? toCurrency(
                              item.product.sizes[
                                item.product.sizes.findIndex((e) => e.name === variant.size)
                              ].price
                            )
                          : 'error'}
                      </p>
                    </div>
                    <div className={styles.quantity_button_container}>
                      <QuantityButton
                        variant={variant}
                        item={item}
                        handleAdd={handleAdd}
                        handleSub={handleSub}
                      />
                    </div>
                    <div className={styles.item_cost}>
                      {toCurrency(
                        item.product.sizes[
                          item.product.sizes.findIndex((e) => e.name === variant.size)
                        ].price * variant.quantity
                      )}
                    </div>
                    <div>
                      <button
                        className={styles.button}
                        onClick={() => handleRemove(item.id, variant.size)}
                      >
                        <Bin />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
        </div>
        <div className={styles.checkout_container}>
          <div className={styles.order_container}>
            <h3 className={styles.order_header}>Your Order ({nItems} items)</h3>
            <hr className={styles.hr} />
            <div className={styles.itemized_list}>
              <div className={styles.merchandise}>
                Merchandise <span className={styles.float}>{toCurrency(merchandiseTotal)}</span>
              </div>
              <div>
                Estimated Shipping: <span className={styles.float}>£11?</span>
              </div>
            </div>
            <div className={styles.subtotal}>
              Subtotal <span className={styles.float}>{toCurrency(merchandiseTotal + 1100)}</span>
            </div>
          </div>
          <div className={styles.checkout_button_container}>
            <CheckoutButton />
          </div>
          <div className={styles.button_container}>
            <Link href="/shop">
              <Button style={{ fontSize: '1.5rem' }} primaryColor>
                Shop Now
              </Button>
            </Link>
            <Button>Sign up for 10% Discount</Button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.empty}>
        <h2>Cart is empty</h2>
        <Link href="/shop">
          <Button primaryColor>Shop Now</Button>
        </Link>
      </div>
    )
  }
}
