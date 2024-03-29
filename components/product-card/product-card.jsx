import Link from 'next/link'

import Carousel from '../carousel/carousel'
import { Basket } from '../UI/svg'
import s from './product-card.module.scss'

const toCurrency = (number) => {
  return new Intl.NumberFormat('en-uk', {
    style: 'currency',
    currency: 'GBP',
  }).format(number / 100)
}

export default function ProductCard({ product }) {
  return (
    <div className={s.root}>
      <div className={s.left_side}>
        {product.images[0] && <Carousel images={product.images} />}
        <Link className={s.title_mobile} href={`/shop/${product._id}`}>
          <h3>{product.name};</h3>
        </Link>
      </div>
      <Link className={s.info} href={`/shop/${product._id}`}>
        <h3 className={s.title}>{product.name};</h3>
        <p className={s.description}>{product.description}</p>
        <hr />
        <div className={s.cost}>
          <h3 className={s.cost_item}>
            {product.sizes.length > 1 && <>Cost From {toCurrency(product.sizes[0].price)}</>}
            {product.sizes.length === 1 && <>Cost {toCurrency(product.sizes[0].price)}</>}
          </h3>
          <div className={s.cost_item}><Basket /></div>
        </div>
      </Link>
    </div>
  )
}
