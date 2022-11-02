import Image from 'next/image'

import s from '../styles/shop.module.scss'

export default function Shop({ arrayProducts }) {
  return (
    <div className={s.main_container}>
        <h1>Hi</h1>
        {arrayProducts.map((
          product, //TODO export to component product-card
        ) => (
          <div key={product._id}>
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
            <h3>Price: £{product.price}</h3>
            <hr />
          </div>
        ))}
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.BACKEND}/products`)
  const arrayProducts = await res.json()

  return {
    props: {
      arrayProducts,
    },
  }
}
