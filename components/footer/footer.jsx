import Link from 'next/link'

import Facebook from '../UI/svg/facebook'
import Instagram from '../UI/svg/instagram'
import s from './footer.module.scss'

export default function Footer() {
  return (
    <footer className={s.root}>
      <a href="https://facebook.com" target="_blank"><Facebook /></a>
      <a href="https://instagram.com" target="_blank"><Instagram /></a>
      <p><Link href="/admin">Admin Page</Link></p>
    </footer>
  )
}