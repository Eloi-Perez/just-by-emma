import HeadContent from './head-content'
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'
import SideCart from '../side-cart/side-cart'
// import s from './layout.module.css'

export default function Layout({ children }) {
  return (
    <>
      <HeadContent />
      <Navbar />
      <main>
        {children}
      </main>
      <SideCart />{/* { TODO conditional rendering for Desktop only ?} */}
      <Footer />
    </>
  )
}