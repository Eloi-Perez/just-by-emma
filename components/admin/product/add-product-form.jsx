import { useState, useRef, useContext } from 'react'

import { ProductsContext } from '../../../contexts/products-context'
// import s from '../../styles/admin.module.scss'

export default function AddProductForm() {
  const { fetchProducts } = useContext(ProductsContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [sizes, setSizes] = useState([{ name: '', price: '' }])
  const [images, setImages] = useState(null)
  const [alert, setAlert] = useState('')
  const inputFileRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const credentials = localStorage.getItem('credentials')

    for (let x = 0; x < images.length; x++) {
      const fileSize = images[x].size
      console.log(fileSize)
      if (fileSize > (11 * 1000000)) {
        setImages(null)
        inputFileRef.current.value = null
        setAlert('file size limit is 10 MB')
        return null
      }
    }


    const priorities = Array.from(Array(images.length).keys())
    let imagesMeta = Array.apply(null, Array(images.length))
    imagesMeta.forEach(
      (e, i, a) =>
      (a[i] = {
        priority: priorities[i] + 1,
        ext: images[i].name.split('.').pop(),
      })
    )

    const data = {
      name: name.trim(),
      description: description.trim(),
      sizes,
      imagesMeta,
    }

    try {
      const call = await fetch('/backend/v0/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TESTING_JWT}`
          Authorization: `Bearer ${credentials}`,
        },
        body: JSON.stringify(data),
      })
      const response = await call.json()
      if (call.ok) {
        //Upload Image
        let formData = new FormData()
        for (let i = 0; i < images.length; i++) {
          formData.append(
            'images',
            images[i],
            response._id + '_' + i + '.' + images[i].name.split('.').pop()
          )
        }
        const callImg = await fetch('/backend/v0/products/img', {
          method: 'POST',
          headers: {
            // 'Content-Type': 'multipart/form-data;',
            Authorization: `Bearer ${credentials}`,
          },
          body: formData,
        })
        const responseImg = await callImg.json()
        console.log(responseImg)
        setName('')
        setDescription('')
        setSizes([{ name: '', price: '' }])
        inputFileRef.current.value = null // clean images
        console.log(response)
        setAlert('Created!')
        fetchProducts()
        //Revalidate pages
        const callRevalidate = await fetch(`/api/revalidate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ revalidate: ['/shop', `/shop/${response._id}`] }),
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

  function handleNSizes(action) {
    switch (action) {
      case 'add':
        setSizes((s) => s.concat([{ name: '', price: '' }]))
        break
      case 'remove':
        setSizes((s) => s.slice(0, -1))
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
        <input
          ref={inputFileRef}
          type="file"
          accept=".png, .jpg, .jpeg, .webp"
          multiple
          onChange={(e) => {
            setImages(e.target.files)
          }}
          required
        />
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
          {[...Array(sizes.length)].map((_, i) => (
            <div key={i}>
              <div>
                <label htmlFor={'sizeName' + i}>Size Name:</label>
                <input
                  id={'sizeName' + i}
                  type="text"
                  placeholder="size name*"
                  value={sizes[i].name}
                  onChange={(e) => handleSetSizes(e.target.value.trim(), 'name', i)}
                  required
                />
              </div>
              <div>
                <label htmlFor={'sizePrice' + i}>Size Price:</label>
                <input
                  id={'sizePrice' + i}
                  type="number"
                  placeholder="price*"
                  value={sizes[i].price === 0 ? null : sizes[i].price / 100}
                  onChange={(e) => handleSetSizes(e.target.value * 100, 'price', i)}
                  required
                />
              </div>
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
      {sizes.length > 1 && <button onClick={() => handleNSizes('remove')}>Remove Sizes</button>}
    </>
  )
}
