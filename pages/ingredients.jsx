import HeaderImage from '../components/UI/header-image/header-image'
import Background from '../components/UI/background/background'
import EmmaImage from '../components/UI/emma-image/emma-image'
import s from '../styles/home.module.scss'

export default function Ingredients() {
  return (
    <>
      <HeaderImage />
      <Background />
      <h1 className={s.title}>INGREDIENTS</h1>
      <p className={s.description}>
        Simple & Natural Oils, Butters, Botanical Extracts & Essential Oils
      </p>
      <EmmaImage />
      <div>
        <div>Ingredient 1</div>
        <div>Ingredient 2</div>
        <div>Ingredient 3</div>
        <div>...</div>
      </div>
      <button>Shop Now</button>
      <button>Create Account</button>
    </>
  )
}
