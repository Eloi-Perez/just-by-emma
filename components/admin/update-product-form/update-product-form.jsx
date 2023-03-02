import { useState, useRef, useContext } from 'react'

import { ProductsContext } from '../../../contexts/products-context'
// import s from '../../styles/admin.module.scss'

//TODO update to new schema (being able to update sizes)

export default function UpdateProductForm({ id, old }) {
  const { fetchProducts } = useContext(ProductsContext)
  const [name, setName] = useState('') 
  const [description, setDescription] = useState('')
  const [sizes, setSizes] = useState(old.sizes)
  const [images, setImages] = useState(null)
  const [alert, setAlert] = useState('')
  console.log(old)
  const inputFileRef = useRef(null)

  const credentials = localStorage.getItem('credentials')

  const handleSubmit = async (e) => {
    e.preventDefault()

    function resetFetchRevalidate() {
      //reset values
      setName('')
      setDescription('')
      setSizes([{ name: '', price: '' }])
      setImages(null)
      inputFileRef.current.value = null
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
      ...(description && { description }),
      ...(sizes && { sizes }),
      ...(images && { imagesMeta: await imagesMeta() }),
    }

    try {
      const call = await fetch(`/backend/v0/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${credentials}`
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
        const callImg = await fetch(`/backend/v0/products/img`, {
          method: 'POST',
          headers: {
            // 'Content-Type': 'multipart/form-data;',
            'Authorization': `Bearer ${credentials}`
          },
          body: formData
        })
        const responseImg = await callImg.json()
        console.log(response)
        console.log(responseImg)
        setAlert('Updated!')
        resetFetchRevalidate()
      } else if (call.ok && !images) {
        console.log(response)
        setAlert('Updated!')
        resetFetchRevalidate()
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
