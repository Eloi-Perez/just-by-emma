import Link from 'next/link'

import SearchDialog from './search-dialog'
import MobileMenuDialog from './mobile-menu-dialog'
import { Basket, Home, Logo, Magnifier, Profile, Share } from '../UI/svg'
import Dialog from '../UI/dialog/dialog'
import LoginRegister from '../login-register/login-register'
import s from './navbar.module.scss'

export default function Navbar() {
  return (
    <nav className={s.root}>
      <div className={s.logo}>
        <Logo />
      </div>
      <div className={s.top_elements}>
        <div className={s.nav_text}>Just natural and simple skincare</div>
        <SearchDialog>Search</SearchDialog>
        <Share />
        <Link href="/profile">
          <Profile />
        </Link>
        <Link href="/cart">
          <Basket />
        </Link>
      </div>
      <div className={s.menu}>
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/ingredients">Ingredients</Link>
        <Dialog trigger="Sign In">
          <LoginRegister />
        </Dialog>
        <Link href="/about">About</Link>
        <Link href="/news">News</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div className={s.mobile}>
        <Link href="/">
          <Home />
        </Link>
        <MobileMenuDialog />
        <SearchDialog><Magnifier /></SearchDialog>        
        <Share />
        <Link href="/cart">
          <Basket />
        </Link>
      </div>
    </nav>
  )
}
