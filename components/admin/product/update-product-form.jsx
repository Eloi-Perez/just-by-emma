import { useState, useRef, useContext, useMemo } from 'react'
import Select from 'react-select'

import { ProductsContext } from '../../../contexts/products-context'
// import s from '../../styles/admin.module.scss'

// const ingredientsList = [
//   { value: '641a323f2602668b318fd2da', label: 'Chocolate' },
//   { value: '641a33e12602668b318fd310', label: 'Strawberry' },
// ]

export default function UpdateProductForm({ id, old }) {
  const { fetchProducts, ingredients: dataIngredientsList } = useContext(ProductsContext)
  const [name, setName] = useState(old.name)
  const [description, setDescription] = useState(old.description)
  const [sizes, setSizes] = useState(old.sizes)
  const [images, setImages] = useState(null)
  const [ingredients, setIngredients] = useState(() => {
    const oldList = JSON.parse(JSON.stringify(old.ingredients))
    const newList = oldList.map((e) => ({ value: e._id, label: e.name }))
    return newList
  })
  const [alert, setAlert] = useState('')

  const inputFileRef = useRef(null)

  const ingredientsList = useMemo(() => {
    const toConvertList = JSON.parse(JSON.stringify(dataIngredientsList))
    const convertedList = toConvertList.map((e) => (
      { value: e._id, label: e.name }
    ))
    return convertedList
  }, [dataIngredientsList])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const credentials = localStorage.getItem('credentials')

    async function resetFetchRevalidate() {
      //reset values
      setImages(null)
      inputFileRef.current.value = null
      //fetch updates
      fetchProducts()
      //Revalidate pages
      const callRevalidate = await fetch(`/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ revalidate: ['/shop', `/shop/${old._id}`] }),
      })
      const responseRevalidate = await callRevalidate.json()
      console.log(responseRevalidate)
    }

    const imagesMeta = async () => {
      const priorities = Array.from(Array(images.length).keys())
      let meta = await Array.apply(null, Array(images.length))
      await meta.forEach(
        (e, i, a) =>
        (a[i] = {
          priority: priorities[i] + 1,
          ext: images[i].name.split('.').pop(),
        })
      )
      return await meta
    }

    const ingredientsToData = await ingredients?.map((e) => e.value)

    let data = {
      ...(name && { name: name.trim() }),
      ...(description && { description: description.trim() }),
      ...(sizes && { sizes }),
      ...(images && { imagesMeta: await imagesMeta() }),
      ...(ingredients && { ingredients: ingredientsToData }),
    }

    try {
      const call = await fetch(`/backend/v0/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials}`,
        },
        body: JSON.stringify(data),
      })
      const response = await call.json()
      if (call.ok && images) {
        //Upload Image
        let formData = new FormData()
        for (let i = 0; i < images.length; i++) {
          formData.append(
            'images',
            images[i],
            response._id + '_' + i + '.' + images[i].name.split('.').pop()
          )
        }
        const callImg = await fetch(`/backend/v0/products/img`, {
          method: 'POST',
          headers: {
            // 'Content-Type': 'multipart/form-data;',
            Authorization: `Bearer ${credentials}`,
          },
          body: formData,
        })
        const responseImg = await callImg.json()
        // console.log(response)
        console.log(responseImg)
        setAlert('Updated!')
        resetFetchRevalidate()
      } else if (call.ok && !images) {
        // console.log(response)
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
        setSizes((s) => s.concat([{ name: '', price: '', available: true }]))
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
        <input
          ref={inputFileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            setImages(e.target.files)
          }}
        />
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
          {[...Array(sizes.length)].map((_, i) => (
            <div key={i}>
              <div>
                <label htmlFor={'sizeName' + i}>Size Name:</label>
                <input
                  id={'sizeName' + i}
                  type="text"
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
                  value={sizes[i].price === 0 ? null : sizes[i].price / 100}
                  onChange={(e) => handleSetSizes(e.target.value * 100, 'price', i)}
                  required
                />
              </div>
              <div>
                <label htmlFor={'sizeAvailable' + i}>Available:</label>
                <input
                  type="checkbox"
                  id={'sizeAvailable' + i}
                  value="available"
                  checked={sizes[i].available}
                  onChange={(e) => handleSetSizes(e.target.checked, 'available', i)}
                />
              </div>
              {/* <div>
                <label htmlFor={'sizeOffer' + i}>Size Offer (0 = no offer):</label>
                <input
                  id={'sizeOffer' + i}
                  type="number"
                  value={sizes[i].offer}
                  onChange={(e) => handleSetSizes(e.target.value, 'offer', i)}
                />
              </div> */}
              <br />
            </div>
          ))}
        </div>
        <div>
          <label>Please choose one or more Ingredients:</label>
          <Select
            defaultValue={ingredients}
            onChange={setIngredients}
            options={ingredientsList}
            isMulti
          />
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
