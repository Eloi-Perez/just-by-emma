import Link from 'next/link'
import Image from 'next/image'

import PromoDialog from './promo-dialog'
import EmmaImage from '../UI/emma-image/emma-image'
import s from './promo.module.scss'

export default function Promo() {

  return (
    <PromoDialog>
      <EmmaImage />
      <div className={s.text}>
        <h1>GET 10% OFF<br />
          THIS WEEKEND ONLY<br />
          PROMO CODE<br />
          JBE10WK</h1>
        <Link href="/shop">
          <button autoFocus>Shop Now</button>
        </Link>
      </div>
    </PromoDialog >
  )
}