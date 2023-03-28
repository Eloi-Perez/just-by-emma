import { useState } from 'react'
import Image from 'next/image'

import { Left, Right } from '../UI/svg'
import s from './carousel.module.scss'

export default function Carousel({ images }) {
  const [currentImage, setcurrentImage] = useState(0)

  const prevImg = () => {
    if (currentImage === 0) {
      setcurrentImage(images.length - 1)
    } else {
      setcurrentImage((x) => x - 1)
    }
  }
  const nextImg = () => {
    if (images.length - 1 <= currentImage) {
      setcurrentImage(0)
    } else {
      setcurrentImage((x) => x + 1)
    }
  }

  return (
    <div className={s.root}>
      {images[0] && (
        <Image
          src={`/backend/img/products/${images[currentImage].filename}`}
          key={images[currentImage].filename}
          alt="product image"
          width={250}
          height={250}
          placeholder="blur"
          blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP3g3f///yH5BAEAAAEALAAAAAABAAEAAAICRAEAOw=="
          sizes="20vw"
          style={{ objectFit: 'cover' }}
        />
      )}
      {images[1] &&
        <>
          <button className={[s.arrow_left, 'resetButton'].join(' ')} onClick={() => prevImg()}><Left /></button>
          <button className={[s.arrow_right, 'resetButton'].join(' ')} onClick={() => nextImg()}><Right /></button>
        </>
      }
    </div>
  )
}
