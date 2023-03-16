import HeadContent from './head-content'
import Navbar from '../navbar/navbar'
import Background from '../UI/background/background'
import SideCart from '../side-cart/side-cart'
import Footer from '../footer/footer'
import s from './layout.module.scss'

export default function Layout({ children }) {
  return (
    <div className={s.root}>
      <HeadContent />
      <Navbar />
      <Background />
      <main className={s.main}>{children}</main>
      <SideCart />
      <Footer />
    </div>
  )
}
