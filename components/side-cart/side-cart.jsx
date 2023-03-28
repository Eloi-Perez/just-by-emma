import { useContext, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { CartContext } from '../../contexts/cart-context'
import QuantityButton from '../UI/quantity-button/quantity-button'
import { Button } from '../UI/button/button.styles'
import SideCartDialog from './side-cart-dialog'
import s from './side-cart.module.scss'

const toCurrency = (number) => {
  return new Intl.NumberFormat('en-uk', {
    style: 'currency',
    currency: 'GBP',
  }).format(number / 100)
}

export default function SideCart() {
  const { cart, setCart } = useContext(CartContext)
  const [subtotal, setSubtotal] = useState(0)

  useEffect(() => {
    const tempCart = [...cart]
    let calcSubTotal = 0
    tempCart.map((item) =>
      item.quantities.map((q, i) => {
        let indexSize = item.product.sizes.findIndex((e) => e.name === q.size)
        calcSubTotal += q.quantity * item.product.sizes[indexSize].price
      })
    )
    setSubtotal(calcSubTotal)
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

  return (
    <SideCartDialog>
      <div className={s.item_list}>
        {cart &&
          cart.map((item) =>
            item.quantities.map((variant, i) => (
              <div className={s.item} key={i}>
                <Image
                  src={`/backend/img/products/${item.product.images[0].filename}`}
                  alt="product image"
                  width={130}
                  height={130}
                  placeholder="blur"
                  blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP3g3f///yH5BAEAAAEALAAAAAABAAEAAAICRAEAOw=="
                  sizes="20vw"
                  priority
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                />
                <div className={s.right}>
                  <p>{item.product.name}<br />
                    {variant.size}{' '}
                    {item.product.sizes[0].price ?
                      toCurrency(item.product.sizes[item.product.sizes.findIndex((e) => e.name === variant.size)].price) : 'error'
                    }
                  </p>
                  <div className={s.quantity}>
                    <QuantityButton
                      variant={variant}
                      item={item}
                      handleAdd={handleAdd}
                      handleSub={handleSub}
                    />
                  </div>
                </div>
                {/* <div>
                  {toCurrency(item.product.sizes[0].price && item.product.sizes[item.product.sizes.findIndex((e) => e.name === variant.size)].price * variant.quantity)}
                </div> */}
              </div>
            ))
          )}
        <div className={s.subtotal}>Subtotal<br />{toCurrency(subtotal)}</div>
      </div>
      <div className={s.button_section}>
        <Link href="/cart">
          <Button primaryColor autoFocus>View Cart</Button>
        </Link>
      </div>
    </SideCartDialog>
  )
}
