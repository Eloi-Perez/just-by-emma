import { useState } from 'react'
import Image from 'next/image'

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
          src={`/backend/img/${images[currentImage].filename}`}
          key={images[currentImage].filename}
          alt=""
          width={100}
          height={100}
          // fill
          style={{ objectFit: 'cover' }}
          sizes="20vw"
          // priority
        />
      )}
      <button onClick={() => prevImg()}>Prev</button>
      <button onClick={() => nextImg()}>Next</button>
    </div>
  )
}
