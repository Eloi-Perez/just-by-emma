import { useState } from 'react'

// import s from '../../styles/admin.module.scss'

export default function AddProductForm() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [images, setImages] = useState(null)
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const priorities = Array.from(Array(images.length).keys())
    let imagesMeta = Array.apply(null, Array(images.length))
    imagesMeta.forEach((e, i, a) => (a[i] = {
      priority: priorities[i],
      ext: images[i].name.split(".").pop()
    }))

    const data = { name, price, description, imagesMeta }

    try {
      const call = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/products/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TESTING_JWT}`
        },
        body: JSON.stringify(data)
      })
      const response = await call.json()
      if (call.ok) {
        //Upload Image
        let formData = new FormData()
        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i], response._id + '_' + i + '.' + images[i].name.split(".").pop())
        }
        const callImg = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/products/img`, {
          method: 'POST',
          headers: {
            // 'Content-Type': 'multipart/form-data;',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TESTING_JWT}`
          },
          body: formData
        })
        const responseImg = await callImg.json()
        console.log(responseImg)
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
      <h1>New Product Form:</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="item name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <input type="file" accept="image/*" multiple
          onChange={(e) => { setImages(e.target.files) }} required />
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder="write your description here*"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="text" // number
            placeholder="price*"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Send</button>
        </div>
        <hr />
      </form>
    </>

  )
}
