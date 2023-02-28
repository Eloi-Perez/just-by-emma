import Link from 'next/link'
import Image from 'next/image'

import Carousel from '../carousel/carousel'
import Basket from '../UI/svg/basket'
import s from './product-card.module.scss'

export default function ProductCard({ product }) {
  return (
    <div className={s.root}>
      {product.images[1] && <Carousel images={product.images} />}
      <Link href={`/shop/${product._id}`}>
        {product.images[0] && !product.images[1] && product.images.map((img) => (
          <Image src={`/backend/img/${img.filename}`}
            key={img.filename}
            alt=""
            width={100}
            height={100}
            // fill
            style={{ objectFit: 'cover' }}
            sizes="20vw"
          // priority
          />
        ))}
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <h3>Cost From £{product.sizes[0].price}</h3>
        <Basket />
      </Link>
      <hr />
    </div>
  )
}