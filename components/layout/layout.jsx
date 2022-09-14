import HeadContent from './head-content'
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'
// import s from './layout.module.css'

export default function Layout({ children }) {
  return (
    <div>
      <HeadContent />
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}