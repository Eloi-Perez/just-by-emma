import { useState, useRef, useContext } from 'react'

import { ProductsContext } from '../../../contexts/products-context'
// import s from '../../styles/admin.module.scss'
//TODO update to new schema
export default function UpdateProductForm({ id, old }) {
  const { fetchProducts } = useContext(ProductsContext)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [images, setImages] = useState(null)
  const [description, setDescription] = useState('')

  const inputFileRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    function resetFetchRevalidate() {
      //reset values
      setName('')
      inputFileRef.current.value = null
      setImages(null)
      setPrice('')
      setDescription('')
      //fetch updates
      fetchProducts()
      //revalidate pages
      // TODO add revalidate product page & store page
    }

    const imagesMeta = async () => {
      const priorities = Array.from(Array(images.length).keys())
      let meta = await Array.apply(null, Array(images.length))
      await meta.forEach((e, i, a) => (a[i] = {
        priority: priorities[i],
        ext: images[i].name.split(".").pop()
      }))
      return await meta
    }

    let data = {
      ...(name && { name }),
      ...(price && { price }),
      ...(description && { description }),
      ...(images && { imagesMeta: await imagesMeta() })
    }

    try {
      const call = await fetch(`/backend/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TESTING_JWT}`
        },
        body: JSON.stringify(data)
      })
      const response = await call.json()
      if (call.ok && images) {
        //Upload Image
        let formData = new FormData()
        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i], response._id + '_' + i + '.' + images[i].name.split(".").pop())
        }
        const callImg = await fetch(`/backend/products/img`, {
          method: 'POST',
          headers: {
            // 'Content-Type': 'multipart/form-data;',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TESTING_JWT}`
          },
          body: formData
        })
        const responseImg = await callImg.json()
        console.log(response)
        console.log(responseImg)
        resetFetchRevalidate()
      }else if (call.ok && !images) {
        console.log(response)
        resetFetchRevalidate()
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
        <input ref={inputFileRef} type="file" accept="image/*" multiple
          onChange={(e) => { setImages(e.target.files) }} />
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
          <button type="submit">Send</button>
        </div>
      </form>
    </>

  )
}
