import Link from 'next/link'

import Search from './search'

import s from './navbar.module.scss'

export default function Navbar() {
  return (
    <nav className={s.root}>
      <Link href="/"><a>Home</a></Link>
      <Link href="/shop"><a>Shop</a></Link>
      <Link href="/ingredients"><a>Ingredients</a></Link>
      <Link href="/register"><a>Sign up</a></Link>
      <Link href="/about"><a>About</a></Link>
      <Link href="/news"><a>News</a></Link>
      <Link href="/contact"><a>Contact</a></Link>
      <Search />
    </nav>
  )
}