import Link from 'next/link'

import s from './footer.module.scss'

export default function Footer() {
  return (
    <footer className={s.root}>
      <p><s>This is a Footer</s></p>
      <p><Link href="/admin">Admin Page</Link></p>
    </footer>
  )
}