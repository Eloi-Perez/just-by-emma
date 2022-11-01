import { useContext } from "react"

import { ProductsContext } from '../../../contexts/products-context'

export default function DeleteProductForm({ id }) {
  const { fetchProducts } = useContext(ProductsContext)
  const apiCall = async () => {
    if (window.confirm('Do you really want to delete?')) {
      try {
        const call = await fetch(`/backend/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TESTING_JWT}`
          }
        })
        const response = await call.json()
        if (call.ok) {
          console.log(response)
          fetchProducts()
        } else {
          console.log(response)
        }
      } catch (error) {
        console.error('An unexpected error happened:', error)
      }
    }
  }
  return (
    <button onClick={() => apiCall()}>Delete</button>
  )
}
