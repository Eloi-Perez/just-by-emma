import Image from 'next/image'

import s from './emma-image.module.scss'
import emma_img from '../../../public/img/emma.webp'

export default function EmmaImage({ className, ...props }) {
  return (
    <div className={[s.root, className].join(' ')} {...props}>
      <Image
        src={emma_img}
        alt="Photo of Emma"
        width={300}
        height={300}
        placeholder="blur"
        priority
      />
    </div>
  )
}
