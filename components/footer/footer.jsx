import Link from 'next/link'

import Facebook from '../UI/svg/facebook'
import Instagram from '../UI/svg/instagram'
import s from './footer.module.scss'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer>
      <div className={s.root}>
        <div className={s.support}>
          <div className={s.category_name}>SUPPORT</div>
          <Link href="/contact">Contact</Link>
          <Link href="/faq">FAQ's</Link>
          <Link href="/delivery">Delivery</Link>
          <Link href="/returns">Return & Exchanges</Link>
          <Link href="/legal">Terms & Conditions</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
        <div className={s.discover}>
          <div className={s.category_name}>DISCOVER</div>
          <Link href="/reviews">Our Reviews</Link>
          <Link href="/recycling">Recycling & Packaging</Link>
          <Link href="/ingredients">Ingredients</Link>
          <Link href="/sustainability">Sustainability</Link>
        </div>
        <div className={s.info}>
          <div className={s.category_name}>INFO</div>
          <Link href="/stockist">Stockist</Link>
          <Link href="/news">News</Link>
          <Link href="/routines">Skin Routines</Link>
          <Link href="/concerns">Skin Concerns</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </div>
      <div className={s.social}>
        <Facebook />
        <Instagram />
      </div>
      <div className={s.copyright}>©{year} by Just by Emma</div>
    </footer>
  )
}
