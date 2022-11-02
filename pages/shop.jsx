import Link from 'next/link'

import s from '../styles/shop.module.scss'

export default function Shop({ arrayProducts }) {
  return (
    <div className={s.container}>
      <main className={s.main}>
        <h1>Hi</h1>
        {arrayProducts.map((
          product, //TODO export to component product-card
        ) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <h3>Price: £{product.price}</h3>
            <hr />
          </div>
        ))}
      </main>
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
