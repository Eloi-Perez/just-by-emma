import Image from 'next/image'

import s from './background.module.scss'
import orange from '../../../public/img/orange.webp'
import grapefruit from '../../../public/img/grapefruit.webp'
import coconut from '../../../public/img/coconut.webp'

export default function Background() {
  return (
    <div className={s.root}>
      <div className={s.empty}></div>
      <div className={s.spacer400}></div>
      <Image
        className={s.img1_1}
        src={orange}
        alt="Background image of fruits"
      />
      <Image
        className={s.img1_2}
        src={orange}
        alt="Background image of fruits"
      />
      <div className={s.spacer200}></div>
      <Image
        className={s.img2}
        src={grapefruit}
        alt="Background image of fruits"
      />
      <div className={s.spacer200}></div>
      <Image
        className={s.img3}
        src={coconut}
        alt="Background image of fruits"
      />
      <div className={s.spacer200}></div>
      <Image
        className={s.img4}
        src={orange}
        alt="Background image of fruits"
      />
    </div>
  )
}