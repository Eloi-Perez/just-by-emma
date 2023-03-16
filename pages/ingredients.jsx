import HeaderImage from '../components/UI/header-image/header-image'
import EmmaImage from '../components/UI/emma-image/emma-image'
// import s from '../styles/home.module.scss'

export default function Ingredients() {
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
