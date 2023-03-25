import { useState, useContext } from 'react'

import { ProductsContext } from '../../../contexts/products-context'

export default function DeleteIngredientsForm({ id }) {
  const { fetchProducts, fetchIngredients } = useContext(ProductsContext)
  const [alert, setAlert] = useState('')

  const apiCall = async () => {
    const credentials = localStorage.getItem('credentials')
    setAlert('')

    if (window.confirm('Do you really want to delete?')) {
      try {
        const call = await fetch(`/backend/v0/ingredients/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${credentials}`,
          },
        })
        const response = await call.json()
        if (call.ok) {
          console.log(response)
          fetchIngredients()
          fetchProducts()
          // Revalidate pages
          const callRevalidate = await fetch(`/api/revalidate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ revalidate: ['/ingredients'] }),
          })
          const responseRevalidate = await callRevalidate.json()
          console.log(responseRevalidate)
        } else {
          console.log(response)
          setAlert('error')
        }
      } catch (error) {
        console.error('An unexpected error happened:', error)
        setAlert('error')
      }
    }
  }
  return (
    <>
      <button onClick={() => apiCall()}>Delete</button>
      <h3>{alert}</h3>
    </>
  )
}
