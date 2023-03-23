import * as D from '@radix-ui/react-dialog'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Logo, Hamburger, Facebook, Instagram } from '../UI/svg'
import Dialog from '../UI/dialog/dialog'
import LoginRegister from '../login-register/login-register'
import s from './navbar.module.scss'

const year = new Date().getFullYear()

export default function MobileMenuDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleRouteChange = () => {
        setOpen(false)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <D.Root open={open} onOpenChange={setOpen}>
      <D.Trigger className={'resetButton'}><Hamburger /></D.Trigger>
      <D.Portal>
        <D.Overlay className={s.dialog_overlay}>
          <D.Content className={s.mobile_menu_dialog_content}>
            <D.Close className={['resetButton', s.dialog_close].join(' ')}>X</D.Close>
            <div>
              <div className={s.logo}>
                <Logo />
              </div>
              <h3>Just natural and<br />
                simple skincare </h3>
            </div>
            <div className={s.mobile_menu}>
              <hr />
              <Link href="/">Home</Link>
              <hr />
              <Link href="/shop">Shop</Link>
              <hr />
              <Link href="/ingredients">Ingredients</Link>
              <hr />
              <Dialog trigger="Sign In">
                <LoginRegister />
              </Dialog>
              <hr />
              <Link href="/about">About</Link>
              <hr />
              <Link href="/news">News</Link>
              <hr />
              <Link href="/contact">Contact</Link>
              <hr />
            </div>
            <div className={s.bottom}>
              <div className={s.social}>
                <a href="https://www.facebook.com/people/justbyemma/100069221673666" target="_blank">
                  <Facebook />
                </a>
                <a href="https://www.instagram.com/just.by.emma" target="_blank">
                  <Instagram />
                </a>
              </div>
              <div className={s.copyright}>
                ©{year} by Just by Emma
              </div>
            </div>
          </D.Content>
        </D.Overlay>
      </D.Portal>
    </D.Root>
  )
}
