import Link from 'next/link'

import Search from './search'
import s from './navbar.module.scss'

export default function Navbar() {
  return (
    <nav className={s.root}>
    <div className={s.logo}>
    logo
    </div>
    <div className={s.top_elements}>
    <Search />
    </div>
    <div className={s.menu}>
    <Link href="/">Home</Link>
    <Link href="/shop">Shop</Link>
    <Link href="/ingredients">Ingredients</Link>
    <Link href="/register">Sign up</Link>
    <Link href="/about">About</Link>
    <Link href="/news">News</Link>
    <Link href="/contact">Contact</Link>
    </div>
    </nav>
  )
}
