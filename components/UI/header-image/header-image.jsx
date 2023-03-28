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
        sizes="100vw"
        fill
        priority
        style={{ objectFit: 'none', objectPosition: 'bottom 0px right 0px' }}
      />
    </div>
  )
}
