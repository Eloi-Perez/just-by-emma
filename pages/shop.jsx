import EmmaImage from '../components/UI/emma-image/emma-image'
import ProductCard from '../components/product-card/product-card'
import s from '../styles/shop.module.scss'

export default function Shop({ arrayProducts }) {
  return (
    <>
      <div className={'header_content'}>
        <div className={'header_text_container'}>
          <h1 className={'header_title'}>THE JUST BY EMMA SHOP</h1>
          <p className={'header_text'}>
            Our ethos is about producing naturally formulated products which focus on keeping your
            skincare routine natural and simple (with minimal wastage.)
            <br />
            All products are handmade locally in small batches, in Leigh-on-Sea and our packaging is
            mainly glass and aluminium which can be fully recycled. Our face oil and face cream do
            include a pump/dropper, however this is necessary to keep the product fresh and avoid
            any contamination and for ease of use.
          </p>
        </div>
        <EmmaImage />
      </div>

      {arrayProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.BACKEND}/v0/products`)
  const allProducts = await res.json()
  const availableProducts = await allProducts.map((pr) => {
    pr.images.sort((a, b) => a.priority - b.priority)
    pr.sizes = pr.sizes.filter((s) => s.available)
    if (pr.sizes[0]) {
      return pr
    }
  })
  const arrayProducts = await availableProducts.filter((pr) => pr !== undefined)
  return {
    props: {
      arrayProducts,
    },
  }
}
