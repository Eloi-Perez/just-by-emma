import { useState, useContext, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'

import { ProductsContext } from '../contexts/products-context'
import AddProductForm from '../components/admin/product/add-product-form'
import ProductCard from '../components/admin/product-card/product-card'
import News from '../components/admin/news/news'
// import s from '../styles/admin.module.scss'

function decodeJwt(token) {
  const base64Payload = token.split('.')[1]
  const payloadBuffer = Buffer.from(base64Payload, 'base64')
  return JSON.parse(payloadBuffer.toString())
}

export default function Admin() {
  const { products, fetchProducts } = useContext(ProductsContext)
  const [searchInput, setSearchInput] = useState('')
  const [openAdd, setOpenAdd] = useState(false)
  const router = useRouter()

  useEffect(() => {
    ; (async function () {
      if (!(await isAdmin())) {
        router.push('/')
      }
    })()
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isAdmin = async () => {
    const credentials = localStorage.getItem('credentials')
    if (!credentials) {
      console.warn('Not authorized')
      return false
    }
    const userID = decodeJwt(credentials)._id
    try {
      const call = await fetch(`/backend/v0/users/${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials}`,
        },
      })
      const response = await call.json()
      if (response.admin) {
        return true
      } else {
        console.warn('Not authorized')
        return false
      }
    } catch (error) {
      console.error('An unexpected error happened:', error)
      return false
    }
  }

  return (
    <>
      <button onClick={() => setOpenAdd(!openAdd)}>Add new product</button>
      {openAdd && <AddProductForm />}
      <h1>Product list:</h1>
      <input
        type="search"
        placeholder="Search here"
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      />
      {products &&
        !searchInput &&
        products.map((product) => <ProductCard key={product._id} product={product} />)}
      {products &&
        searchInput &&
        products
          .filter((li) => li.name.toLowerCase().includes(searchInput.toLowerCase()))
          .map((product) => <ProductCard key={product._id} product={product} />)}

      <h1>News</h1>
      <News />
    </>
  )
}
