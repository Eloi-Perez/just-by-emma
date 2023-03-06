import * as D from '@radix-ui/react-dialog'
import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { CartContext } from '../../contexts/cart-context'
import s from './side-cart.module.scss'

export default function SideCartDialog({ trigger, children }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { cart } = useContext(CartContext)

  useEffect(() => {
    if (cart?.length && router.pathname !== '/cart' && router.pathname !== '/404') {
      setOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])

    useEffect(() => {
    const handleRouteChange = (url) => {
      if (url === '/cart') {
        setOpen(false)
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

   return (
    <D.Root open={open} onOpenChange={setOpen}>
      {/* <D.Trigger>{trigger}</D.Trigger> */}
      <D.Portal>
        <D.Overlay className={s.overlay}>
          <D.Content className={s.content}>
            <D.Close className={s.close}>{'>'}</D.Close>
             <D.Title className={s.title}>Cart</D.Title>
            {children}
          </D.Content>
        </D.Overlay>
      </D.Portal>
    </D.Root>
  )
}
