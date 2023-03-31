import Image from 'next/image'

import s from './header-image.module.scss'
import header_img from '../../../public/img/header.webp'

export default function HeaderImage() {
  return (
    <div className={s.root}>
      <Image
        src={header_img}
        alt="Photo Showcase of the range of products on a pink background"
        placeholder="blur"
        sizes="(max-width: 800px) 150vw,
               100vw"
        fill
        priority
      />
    </div>
  )
}
