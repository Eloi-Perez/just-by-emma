import Link from 'next/link'

import Search from './search'
import Dialog from '../UI/dialog/dialog'
import Logo from '../UI/svg/logo'
import Share from '../UI/svg/share'
import Profile from '../UI/svg/profile'
import Basket from '../UI/svg/basket'
import s from './navbar.module.scss'

export default function Navbar() {
  return (
    <nav className={s.root}>
      <div className={s.logo}>
        <Logo />
      </div>
      <div className={s.top_elements}>
        <div className={s.nav_text}>
          Just 100% natural and simple skincare
      </div>
        <Search />
        <Share />
        <Link href="/profile"><Profile /></Link>
        <Basket />
      </div>
      <div className={s.menu}>
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/ingredients">Ingredients</Link>
        <Dialog trigger="Sign Up">Login/Register here...</Dialog>
        <Link href="/about">About</Link>
        <Link href="/news">News</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  )
}
