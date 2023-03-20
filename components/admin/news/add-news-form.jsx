import { useState, useRef } from 'react'

export default function AddNewsForm({update}) {
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
      imageMeta,
    }

    try {
      const call = await fetch('/backend/v0/news/add', {
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
        const callImg = await fetch('/backend/v0/news/img', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${credentials}`,
          },
          body: formData,
        })
        const responseImg = await callImg.json()
        console.log(responseImg)
        inputFileRef.current.value = null // clean images
        console.log(response)
        setAlert('Sent!')
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

  return (
    <>
      <h2>Post News Form:</h2>
      <form onSubmit={handleSubmit}>
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
