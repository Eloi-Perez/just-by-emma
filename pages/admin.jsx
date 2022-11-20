import { useState, useContext, useEffect } from 'react'

import { ProductsContext } from '../contexts/products-context'
import AddProductForm from '../components/admin/add-product-form/add-product-form'
import ProductCard from '../components/admin/product-card/product-card'
import s from '../styles/admin.module.scss'

export default function Admin() {
  const { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND}/products/`,
    fetcher,
  )

  const { products, fetchProducts } = useContext(ProductsContext)
  const [searchInput, setSearchInput] = useState('')
  const [openAdd, setOpenAdd] = useState(false)

  const toOpen = (id) => {
    setOpenUpdate({
      ...openUpdate, // remove this line to auto close when click on a different item
      [id]: !openUpdate[id],
    })
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <main>
      <div className={s.main_container}>
        <button onClick={() => setOpenAdd(!openAdd)}>Add new product</button>
        {openAdd && <AddProductForm />}
        <h1>Product list:</h1>
        {/* TODO add search */}
        {data &&
          data.map((product) => (
            <div key={product._id}>
              <h3>{product.name}</h3>
              <div className={s.container_flex}>
                {product.images[0] &&
                  product.images.map((img) => (
                    <div className={s.img_container} key={img._id}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND}/img/${img.filename}`}
                        alt=""
                        // width={100}
                        // height={100}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="20vw"
                        priority
                      />
                    </div>
                  ))}
              </div>
              <p>{product.description}</p>
              <h3>Price: £{product.price}</h3>
              <button onClick={() => toOpen(product._id)}>Update info</button>
              <DeleteProductForm id={product._id} />
              {openUpdate[product._id] && (
                <UpdateProductForm id={product._id} old={product} />
              )}

              <hr />
            </div>
          ))}
      </div>
      )
      <input
        type="search"
        placeholder="Search here"
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      />
      {products &&
        !searchInput &&
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      {products &&
        searchInput &&
        products
          .filter((li) =>
            li.name.toLowerCase().includes(searchInput.toLowerCase()),
          )
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
    </main>
  )
}
