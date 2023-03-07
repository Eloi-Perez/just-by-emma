import HeadContent from './head-content'
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'
import SideCart from '../side-cart/side-cart'
import Promo from '../promo/promo'
import s from './layout.module.scss'

export default function Layout({ children }) {
  return (
    <>
      <HeadContent />
      <Navbar />
      <main className={s.root}>{children}</main>
      <SideCart />
      <Promo />
      <Footer />
    </>
  )
}
