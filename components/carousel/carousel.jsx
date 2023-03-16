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
          width={250}
          height={250}
          style={{ objectFit: 'cover' }}
          sizes="20vw"
          placeholder="blur"
          blurDataURL={`/backend/img/${images[currentImage].filename}`}
        />
      )}
      {images[1] &&
        <>
          <button className={[s.arrow_left, 'resetButton'].join(' ')} onClick={() => prevImg()}>{'<'}</button>
          <button className={[s.arrow_right, 'resetButton'].join(' ')} onClick={() => nextImg()}>{'>'}</button>
        </>
      }
    </div>
  )
}
