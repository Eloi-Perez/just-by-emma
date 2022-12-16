import Link from 'next/link'
import Image from 'next/image'

import s from './product-card.module.css'

export default function ProductCard({ product }) {
  return (
    <div className={s.root}>
      <Link href={`/shop/${product._id}`}>
        <h3>{product.name}</h3>
        {product.images[0] && product.images.map((img) => (
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
        <p>{product.description}</p>
        <h3>Cost From £{product.sizes[0].price}</h3>
      </Link>
      <hr />
    </div>
  )
}