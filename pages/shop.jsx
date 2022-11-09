import HeaderImage from '../components/UI/header-image/header-image'
import ProductCard from '../components/product-card/product-card'
import s from '../styles/shop.module.scss'

export default function Shop({ arrayProducts }) {
  return (
    <div className={s.root}>
      <HeaderImage />
      <h1>THE JUST BY EMMA SHOP</h1>
      <p>Our ethos is about producing naturally formulated products which focus on keeping your skincare routine natural and simple (with minimal wastage).</p>
      <p>All products are handmade locally in small batches, in Leigh-on-Sea and our packaging is mainly glass and aluminium which can be fully recycled.
        Our face oil and face cream do include a pump/dropper, however this is necessary to keep the product fresh and avoid any contamination and for ease of use.</p>
      <div style={{ background: 'grey' }}>Emma Image</div>
      {arrayProducts.map((product) => ( //TODO export to component product-card
        <ProductCard key={product._id} product={product} />
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