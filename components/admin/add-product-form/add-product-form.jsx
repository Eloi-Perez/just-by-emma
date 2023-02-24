import { useState, useRef, useContext } from 'react'

import { ProductsContext } from '../../../contexts/products-context'
// import s from '../../styles/admin.module.scss'

export default function AddProductForm() {
  const { fetchProducts } = useContext(ProductsContext)
  const [name, setName] = useState('')
  const [images, setImages] = useState(null)
  const [description, setDescription] = useState('')
  const [sizes, setSizes] = useState([{ name: '', price: '' }])
  const [alert, setAlert] = useState('')
  const inputFileRef = useRef(null)

  const credentials = localStorage.getItem('credentials')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const priorities = Array.from(Array(images.length).keys())
    let imagesMeta = Array.apply(null, Array(images.length))
    imagesMeta.forEach((e, i, a) => (a[i] = {
      priority: priorities[i],
      ext: images[i].name.split(".").pop()
    }))

    const data = { name, sizes, description, imagesMeta }

    try {
      const call = await fetch('/backend/v0/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TESTING_JWT}`
          'Authorization': `Bearer ${credentials}`
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
        const callImg = await fetch('/backend/products/img', {
          method: 'POST',
          headers: {
            // 'Content-Type': 'multipart/form-data;',
            'Authorization': `Bearer ${credentials}`
          },
          body: formData
        })
        const responseImg = await callImg.json()
        console.log(responseImg)
        setName('')
        inputFileRef.current.value = null // clean images
        setSizes([{ name: '', price: '' }])
        setDescription('')
        console.log(response)
        setAlert('Created!')
        fetchProducts()
        // TODO revalidate product page & store page
      } else {
        console.log(response)
        setAlert(response.message)
      }
    } catch (error) {
      console.error('An unexpected error happened:', error)
    }
  }

  function handleNSizes(action) {
    switch (action) {
      case 'add':
        setSizes(s => s.concat([{ name: '', price: '' }]))
        break
      case 'remove':
        setSizes(s => s.slice(0, -1))
    }
  }

  function handleSetSizes(value, key, formIndex) {
    const setter = sizes.map((size, i) => {
      if (i === formIndex) {
        return { ...size, [key]: value }
      } else {
        return size
      }
    })
    setSizes(setter)
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
        <br />
        <input ref={inputFileRef} type="file" accept="image/*" multiple
          onChange={(e) => { setImages(e.target.files) }} required />
        <div>
          <br />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder="write your description here*"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          {[...Array(sizes.length)].map((e, i) => (
            <div key={i}>
              <div>
                <label htmlFor={'sizeName' + i}>Size Name:</label>
                <input
                  id={'sizeName' + i}
                  type="text"
                  placeholder="size name*"
                  value={sizes[i].name}
                  onChange={(e) => handleSetSizes(e.target.value, 'name', i)}
                  required
                />
              </div>
              <div>
                <label htmlFor={'sizePrice' + i}>Size Price:</label>
                <input
                  id={'sizePrice' + i}
                  type="text" // number
                  placeholder="price*"
                  value={sizes[i].price}
                  onChange={(e) => handleSetSizes(e.target.value, 'price', i)}
                  required
                />
              </div>
              {/* <div>
                <label htmlFor={'sizeOffer' + i}>Size Offer:</label>
                <input
                  id={'sizeOffer' + i}
                  type="text" // number
                  placeholder="0 = no offer"
                  value={sizes[i].price}
                  onChange={(e) => handleSetSizes(e.target.value, 'offer', i)}
                  required
                />
              </div> */}
              {/* <div>
                available: true/false
              </div> */}
              <br />
            </div>
          ))}
        </div>
        <div>
          <button type="submit">Send</button>
        </div>
        <h3>{alert}</h3>
      </form>
      <button onClick={() => handleNSizes('add')}>Add Sizes</button>
      {(sizes.length > 1) && <button onClick={() => handleNSizes('remove')}>Remove Sizes</button>}
    </>

  )
}
