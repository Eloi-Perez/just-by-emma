import { useState } from 'react'

// import s from '../../styles/admin.module.scss'

export default function UpdateProductForm({ id, old }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  // const [images, setImages] = useState({})
  const [description, setDescription] = useState('')


  // images && console.log(images.length)
  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = {
      ...(name && { name }),
      ...(price && { price }),
      ...(description && { description })
    }
    try {

      // setLoading(true)
      const call = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TESTING_JWT}`
        },
        body: JSON.stringify(data)
      })
      const response = await call.json()
      if (call.ok) {
        setName('')
        setPrice('')
        setDescription('')
        console.log(response)
      } else {
        console.log(response)
      }
    } catch (error) {
      console.error('An unexpected error happened:', error)
    }
  }


  return (
    <>
      <h1>Update Product Form:</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder={old.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="text" // number
            placeholder={old.price}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder={old.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Send</button>
        </div>
      </form>
    </>

  )
}
