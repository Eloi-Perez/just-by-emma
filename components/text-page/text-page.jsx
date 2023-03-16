import HeaderImage from '../UI/header-image/header-image'
import EmmaImage from '../UI/emma-image/emma-image'
import s from '../../styles/text.module.scss'

export default function TextPage({ title, children }) {
  return (
    <>
      <HeaderImage />
      <div className={s.header_content}>
        <div className={s.header_content_left}>
          <div className={s.title}>{title}</div>
          <p className={s.header_text}>
            If you would like to talk about your order or have any questions about Just by Emma products
            or the brand, I am here to help you.
          </p>
        </div>
        <EmmaImage />
      </div>
      <div className={s.box}>{children}</div>
    </>
  )
}
