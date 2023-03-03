/* eslint-disable @next/next/no-img-element */
import { useState, useContext, useEffect } from 'react'

import { ProductsContext } from '../../../contexts/products-context'

import s from '../../../styles/admin.module.scss'

export default function Images({ product }) {
  const { fetchProducts } = useContext(ProductsContext)
  const [images, setImages] = useState([])

  const credentials = localStorage.getItem('credentials')

  useEffect(() => {
    setImages([...product.images].sort((a, b) => a.priority - b.priority))
  }, [product])


  const handleSubmit = async () => {
    async function resetFetchRevalidate() {
      //fetch updates
      fetchProducts()
      //Revalidate pages
      const callRevalidate = await fetch(`/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ revalidate: ['/shop', `/shop/${product._id}`] }),
      })
      const responseRevalidate = await callRevalidate.json()
      console.log(responseRevalidate)
    }

    const data = { images }
    try {
      const call = await fetch(`/backend/v0/products/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials}`,
        },
        body: JSON.stringify(data),
      })
      const response = await call.json()
      if (call.ok) {
        console.log(response)
        resetFetchRevalidate()
      }
    } catch (error) {
      console.error('An unexpected error happened:', error)
    }

  }

  const onChangePriority = async (val, i) => {
    const update = [...images] // needs to be a new obj so it triggers update on set
    update[i].priority = parseInt(val)
    setImages(update)
  }

  return (
    <>
      {images[0] && images.map((img, i) => (
        <div key={img._id}>
          <div className={s.img_container}>
            <img src={`/backend/img/${img.filename}`}
              alt=""
              width="100px"
              height="100px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div>
            <input
              className={s.priority_input}
              id={'priority_' + img._id}
              type="number"
              value={images[i].priority}
              onChange={(e) => onChangePriority(e.target.value, i)}
              min="1"
              required
            />
          </div>
        </div>
      ))}
      <button className={s.order_button} onClick={() => handleSubmit()}>Update Order</button>
    </>
  )
}