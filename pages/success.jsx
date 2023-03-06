import { useContext, useEffect } from 'react'

import { CartContext } from '../contexts/cart-context'

import Background from '../components/UI/background/background'
// import s from '../styles/success.module.scss'

export default function Success() {
  const { setCart } = useContext(CartContext)

  useEffect(() => {
    setCart('EMPTY_CART')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Background />
      <h2>Thank You ! For Shopping With Just By Emma</h2>
      <p>Your order is being processed and an email will be sent to you shortly.</p>
    </>
  )
}
