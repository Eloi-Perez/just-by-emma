import { useState, useRef, useContext } from 'react'

import { ProductsContext } from '../../../contexts/products-context'

export default function AddIngredientsForm() {
  const { fetchIngredients } = useContext(ProductsContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [alert, setAlert] = useState('')
  const inputFileRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const credentials = localStorage.getItem('credentials')

    const imageMeta = {
      ext: image[0].name.split('.').pop(),
    }
    const data = {
      name: name.trim(),
      description: description.trim(),
      imageMeta,
    }

    try {
      const call = await fetch('/backend/v0/ingredients/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials}`,
        },
        body: JSON.stringify(data),
      })
      const response = await call.json()
      if (call.ok) {
        const formData = new FormData()
        formData.append(
          'image',
          image[0],
          response._id + '.' + image[0].name.split('.').pop()
        )
        const callImg = await fetch('/backend/v0/ingredients/img', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${credentials}`,
          },
          body: formData,
        })
        const responseImg = await callImg.json()
        console.log(responseImg)
        setName('')
        setDescription('')
        inputFileRef.current.value = null // clean images
        console.log(response)
        setAlert('Sent!')
        fetchIngredients()
        // Revalidate pages
        // const callRevalidate = await fetch(`/api/revalidate`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ revalidate: ['/ingredients'] }),
        // })
        // const responseRevalidate = await callRevalidate.json()
        // console.log(responseRevalidate)
      } else {
        console.log(response)
        setAlert(response.message)
      }
    } catch (error) {
      console.error('An unexpected error happened:', error)
    }
  }

  return (
    <>
      <h2>Add Ingredients Form:</h2>
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
        <br />
        <input
          ref={inputFileRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files)
          }}
          required
        />
        <div>
          <button type="submit">Send</button>
        </div>
        <h3>{alert}</h3>
      </form>
    </>
  )
}
