import Image from 'next/image'
import Link from 'next/link'

import HeaderImage from '../components/UI/header-image/header-image'
import EmmaImage from '../components/UI/emma-image/emma-image'
import { Button } from '../components/UI/button/button.styles'
import s from '../styles/ingredients.module.scss'

export default function Ingredients({ arrayIngredients }) {
  return (
    <>
      <HeaderImage />
      <div className={'header_content'}>
        <div className={'header_text_container'}>
          <h1 className={'header_title'}>INGREDIENTS</h1>
          <p className={'header_text'}>
            Simple & Natural Oils, Butters, Botanical<br />Extracts & Essential Oils.
          </p>
        </div>
        <EmmaImage />
      </div>
      <div className={s.grid}>
        {arrayIngredients && arrayIngredients.map(e => (
          <div className={s.ingredient} key={e._id}>
            <div className={s.image} >
              <Image
                src={`/backend/img/ingredients/${e.image}`}
                alt=""
                fill
                style={{ objectFit: 'cover', borderRadius: '50%' }}
              />
            </div>
            <div>
              <h3>{e.name}</h3>
              <p>{e.description}</p>
            </div>
          </div>
        ))}
        <Link className={s.buttonConteiner} href="/shop">
          <Button primaryColor>Shop Now</Button>
        </Link>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.BACKEND}/v0/ingredients`)
  const arrayIngredients = await res.json()
  return {
    props: {
      arrayIngredients,
    },
  }
}
