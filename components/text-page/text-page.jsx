import HeaderImage from '../UI/header-image/header-image'
import EmmaImage from '../UI/emma-image/emma-image'
import s from '../../styles/text.module.scss'

export default function TextPage({ title, children }) {

  return (
    <div className={s.root}>
      <HeaderImage />
      <div>{title}</div>
      <p>If you would like to talk about your order or have any questions about Just by Emma products or the brand, I am here to help you.</p>
      <EmmaImage />
      <div className={s.box}>{children}</div>
    </div>
  )
}