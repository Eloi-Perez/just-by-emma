import HeaderImage from '../components/UI/header-image/header-image'
import s from '../styles/home.module.scss'

export default function About() {
  return (
    <div className={s.root}>
      <HeaderImage />
      <h1 className={s.title}>INGREDIENTS</h1>
      <p className={s.description}>
        Simple & Natural Oils, Butters, Botanical Extracts & Essential Oils
      </p>
      <div style={{ background: 'grey' }}>Emma Image</div>
      <div>
        <div>Ingredient 1</div>
        <div>Ingredient 2</div>
        <div>Ingredient 3</div>
        <div>...</div>
      </div>
      <button>Shop Now</button>
      <button>Create Account</button>
    </div>
  )
}
