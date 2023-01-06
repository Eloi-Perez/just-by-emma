import { useState, useContext } from 'react'

import { ProductsContext } from '../../../contexts/products-context'

export default function DeleteProductForm({ id }) {
  const { fetchProducts } = useContext(ProductsContext)
  const [alert, setAlert] = useState('')

  const credentials = localStorage.getItem('credentials')

  const apiCall = async () => {
    if (window.confirm('Do you really want to delete?')) {
      try {
        const call = await fetch(`/backend/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${credentials}`
          }
        })
        const response = await call.json()
        if (call.ok) {
          console.log(response)
          fetchProducts()
        } else {
          console.log(response)
          setAlert(response.message)
        }
      } catch (error) {
        console.error('An unexpected error happened:', error)
      }
    }
  }
  return (
    <>
      <h3>{alert}</h3>
      <button onClick={() => apiCall()}>Delete</button>
    </>
  )
}
