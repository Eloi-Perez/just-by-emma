import ProductCard from '../components/product-card/product-card'
import s from '../styles/shop.module.scss'

export default function Shop({ arrayProducts }) {
  return (
    <div className={s.root}>
        <h1>Shop</h1>
        {arrayProducts.map((product) => ( //TODO export to component product-card
          <ProductCard key={product._id} product={product}/>
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