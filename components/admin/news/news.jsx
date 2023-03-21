import { useEffect, useState } from 'react'

import AddNewsForm from './add-news-form'
import DeleteNewsForm from './delete-news-form'

const fetcher = async (address) => {
  try {
    const call = await fetch(address)
    const response = await call.json()
    if (call.ok) {
      return await response
    }
    return ['error']
  } catch (error) {
    console.error('An unexpected error happened:', error)
  }
}

export default function News() {
  const [news, setNews] = useState([])

  useEffect(() => {
    update()
  }, [])

  const update = () => {
    fetcher('/backend/v0/news')
      .then(a => setNews(a.reverse()))
  }

  return (
    <>
      <AddNewsForm update={update} />
      <h2>News list:</h2>
      {news[0] && news.map((e) => (
        <div key={e._id}>
          <img src={`/backend/img/news/${e.image}`}
            alt=""
            width="200px"
            height="200px"
            style={{ objectFit: 'cover' }}
          />
          <DeleteNewsForm update={update} id={e._id} />
        </div>
      ))}
    </>
  )
}