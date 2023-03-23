import Image from 'next/image'
import PictureOne from '../../../public/img/skincare1.png'
import PictureTwo from '../../../public/img/skincare2.png'
import PictureThree from '../../../public/img/skincare3.png'
import PictureFour from '../../../public/img/skincare4.png'

import s from './skincare-routine.module.scss'

function SkinCareSection() {
  return (
    <div>
      <div className={s.container}>
        <div className={s.child}>
          <Image src={PictureOne} alt="" style={{ margin: '0 auto' }} />
          <p className={s.header}>No 1: Cleanse using the Nourishing Beauty </p>
          <p className={s.text}>
            A gentle all purpose balm for cleansing and moisturising. Formulated using 100% natural,
            simple ingredients rich in antioxidants to help calm, balance, boost, nourish and give
            your skin a natural glow.
          </p>
        </div>
        <div className={s.child}>
          <Image src={PictureTwo} alt="" style={{ margin: '0 auto' }} />
          <p className={s.header}>No 2: Detox using the Detoxifying Face Mask </p>
          <p className={s.text}>
            A base powder detoxifying face mask with a light floral aroma and blend of vitamins and
            antioxidants. This mask will help draw out dirt and toxins to leave the skin clean and
            fresh with an even, smoother skin tone and balanced complexion.
          </p>
        </div>
        <div className={s.child}>
          <Image src={PictureThree} alt="" style={{ margin: '0 auto' }} />
          <p className={s.header}>No 3: Moisturise using the Regenerating Face Cream</p>
          <p className={s.text}>
            A lightweight, non-greasy face cream, formulated with oils, extracts and hyaluronic acid
            to regenerate, balance, repair and improve your skin&apos;s elasticity, while helping
            prevent and reduce fine lines. Your skin will be left brightened and hydrated, leaving
            an even, smoother skin tone and balanced complexion.
          </p>
        </div>
        <div className={s.child}>
          <Image src={PictureFour} alt="" style={{ margin: '0 auto' }} />
          <p className={s.header}>No 4: Nourish using Rejuvenating Facial Oil</p>
          <p className={s.text}>
            A light facial oil to help repair and rejuvenate damaged skin. Including oils rich in
            Omega 5 fatty acids and anti-aging properties to fend off free radicals. Formulated
            using 100% natural, simple ingredients rich in antioxidants to help calm, balance,
            boost, nourish, rejuvenate and revitalise your skin.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SkinCareSection
