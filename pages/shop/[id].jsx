import ProductCard from "../../components/product-card/product-card"

// import s from '../../styles/product.module.scss'
import s2 from '../../styles/shop.module.scss'

export default function Product({ product }) {

  return (
    <div className={s2.root}>
      <ProductCard product={product} />
    </div>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.BACKEND}/products`)
  const arrayProducts = await res.json()
  const paths = arrayProducts.map(p => ({
    params: { id: p._id },
  }))
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.BACKEND}/products/${context.params.id}`)
  console.log(context)
  const product = await res.json()
  return {
    props: { product },
  }
}