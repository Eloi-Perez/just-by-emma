import * as D from '@radix-ui/react-dialog'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import s from './promo.module.scss'

export default function PromoDialog({ children }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      // TODO store on localStorage?
      // TODO call to DB to check if it should open
      isInitialMount.current = false
      setOpen(true)
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url === '/shop') {
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
      <D.Portal>
        <D.Overlay className={s.overlay}>
          <D.Content className={s.content}>
            <D.Close className={s.close}>{'X'}</D.Close>
            {children}
          </D.Content>
        </D.Overlay>
      </D.Portal>
    </D.Root>
  )
}
