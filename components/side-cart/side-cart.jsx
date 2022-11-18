import { useContext, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import { CartContext } from '../../contexts/cart-context'
import s from './side-cart.module.scss'

// TODO include dialog/modal

export default function SideCart() {
  const router = useRouter()
  const { cart, setCart } = useContext(CartContext)
  const [subtotal, setSubtotal] = useState(0)
  const [show, setShow] = useState(false)
  const isInitialMount = useRef(true)

  useEffect(() => {
    let calcSubTotal = 0
    cart.map(item =>
      item.quantities.map((q, i) => {
        let indexSize = item.product.sizes.findIndex(e => e.name === q.size)
        calcSubTotal += q.quantity * item.product.sizes[indexSize].price
      })
    )
    setSubtotal(calcSubTotal)

    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      if (router.pathname !== '/cart') {
        setShow(true)
      }
    }
  }, [JSON.stringify(cart)])

  useEffect(() => {
    const handleRouteChange = () => {
      if (router.pathname === '/cart') {
        setShow(false)
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])


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

  const rootClassName = show ? (`${s.root}`) : (`${s.root} ${s.hidden}`)

  return (
    <div className={rootClassName}>
      <h2 className={s.title}>Cart</h2>
      <button onClick={() => setShow(false)}>Hide</button>
      <div>
        {cart && cart.map(item =>
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
              <p>{variant.size} £{item.product.sizes[item.product.sizes.findIndex(e => e.name === variant.size)].price}</p>
              <button onClick={() => handleSub(item.id, variant.size)}>Subtract</button>
              <span> {variant.quantity} </span>
              <button onClick={() => handleAdd(item.id, variant.size)}>Add</button>
              <div>£{item.product.sizes[item.product.sizes.findIndex(e => e.name === variant.size)].price * variant.quantity}</div>
              <hr />
            </div>
          )
          )
        )}
      </div>

      <div className={s.order}>
        <div>Subtotal £{subtotal}</div>
        <Link href="/cart"><button>View Cart</button></Link>
      </div>
    </div>
  )
}
