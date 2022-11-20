import Link from 'next/link'

import Logo from '../UI/logo'
import Search from './search'
import s from './navbar.module.scss'

export default function Navbar() {
  return (
    <nav className={s.root}>
      <div className={s.logo}><Logo /></div>
      <Link href="/">Home</Link>
      <Link href="/shop">Shop</Link>
      <Link href="/ingredients">Ingredients</Link>
      <Link href="/register">Sign up</Link>
      <Link href="/about">About</Link>
      <Link href="/news">News</Link>
      <Link href="/contact">Contact</Link>
      {/* <Search /> */}
    </nav>
  )
}