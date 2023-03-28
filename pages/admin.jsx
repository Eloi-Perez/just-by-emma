import { useState, useContext, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'

import { ProductsContext } from '../contexts/products-context'
import AddProductForm from '../components/admin/product/add-product-form'
import ProductCard from '../components/admin/product-card/product-card'
import News from '../components/admin/news/news'
import Ingredients from '../components/admin/ingredients/ingredients'
// import s from '../styles/admin.module.scss'

function decodeJwt(token) {
  const base64Payload = token.split('.')[1]
  const payloadBuffer = Buffer.from(base64Payload, 'base64')
  return JSON.parse(payloadBuffer.toString())
}

export default function Admin() {
  const { products, fetchProducts, fetchIngredients } = useContext(ProductsContext)
  const [searchInput, setSearchInput] = useState('')
  const [showProducts, setShowProducts] = useState(false)
  const [openAddProduct, setOpenAddProduct] = useState(false)
  const [showNews, setShowNews] = useState(false)
  const [showIngredients, setShowIngredients] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // ; (async function () {
    //   if (!(await isAdmin())) {
    //     router.push('/')
    //   } else {
    //     fetchProducts()
    //     fetchIngredients()
    //     setLoading(false)
    //   }
    // })()
    isAdmin().then(result => {
      if (!result) {
        router.push('/')
      } else {
        setLoading(false)
        fetchProducts()
        fetchIngredients()
      }
    })
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

  if (loading) return (<h1>Loading...</h1>)

  return (
    <>
      <h1>Products</h1>
      {!showProducts &&
        <button onClick={() => setShowProducts(true)}>Show Products</button>
      }
      {showProducts &&
        <>
          <button onClick={() => setOpenAddProduct(!openAddProduct)}>Add new product</button>
          {openAddProduct && <AddProductForm />}
          <h2>Product list:</h2>
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
        </>
      }
      <h1>News</h1>
      {!showNews &&
        <button onClick={() => setShowNews(true)}>Show News</button>
      }
      {showNews &&
        <News />
      }
      <h1>Ingredients</h1>
      {!showIngredients &&
        <button onClick={() => setShowIngredients(true)}>Show Ingredients</button>
      }
      {showIngredients &&
        <Ingredients />
      }
    </>
  )
}
