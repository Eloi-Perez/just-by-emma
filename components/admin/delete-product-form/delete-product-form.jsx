export default function DeleteProductForm({ id }) {
  const apiCall = async () => {
    try {
      const call = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TESTING_JWT}`
        }
      })
      const response = await call.json()
      if (call.ok) {
        console.log(response)
      } else {
        console.log(response)
      }
    } catch (error) {
      console.error('An unexpected error happened:', error)
    }
  }
  return (
    <button onClick={() => apiCall() }>Delete</button>
  )
}
