import { useState, useContext, useEffect } from 'react'

import { ProductsContext } from '../contexts/products-context'
import AddProductForm from '../components/admin/add-product-form/add-product-form'
import ProductCard from '../components/admin/product-card/product-card'
import s from '../styles/admin.module.scss'

export default function Admin() {
  const { products, fetchProducts } = useContext(ProductsContext)
  const [searchInput, setSearchInput] = useState('')
  const [openAdd, setOpenAdd] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className={s.container}>
      <main className={s.main}>
        <button onClick={() => setOpenAdd(!openAdd)}>Add new product</button>
        {openAdd && <AddProductForm />}
        <h1>Product list:</h1>
        <input
          type="search"
          placeholder="Search here"
          onChange={e => setSearchInput(e.target.value)}
          value={searchInput} />
        {products && !searchInput && products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
        {products && searchInput && products.filter(li => li.name.toLowerCase().includes(searchInput.toLowerCase())).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </main>
    </div>
  )
}