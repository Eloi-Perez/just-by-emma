import HeadContent from './head-content'
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'
// import s from './layout.module.css'

export default function Layout({ children }) {
  return (
    <>
      <HeadContent />
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}