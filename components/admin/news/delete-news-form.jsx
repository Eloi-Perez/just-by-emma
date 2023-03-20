import { useState } from 'react'

export default function DeleteNewsForm({ id, update }) {
  const [alert, setAlert] = useState('')

  const apiCall = async () => {
    const credentials = localStorage.getItem('credentials')

    if (window.confirm('Do you really want to delete?')) {
      try {
        const call = await fetch(`/backend/v0/news/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${credentials}`,
          },
        })
        const response = await call.json()
        if (call.ok) {
          console.log(response)
          update()
          // Revalidate pages
          const callRevalidate = await fetch(`/api/revalidate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ revalidate: ['/news'] }),
          })
          const responseRevalidate = await callRevalidate.json()
          console.log(responseRevalidate)
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
      <button onClick={() => apiCall()}>Delete</button>
      <h3>{alert}</h3>
    </>
  )
}
