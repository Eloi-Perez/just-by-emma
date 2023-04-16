import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

import { Facebook, Instagram } from '../UI/svg'
import s from './footer.module.scss'

const year = new Date().getFullYear()

export default function Footer() {
  const [supportVisible, setSupportVisible] = useState(false)
  const [discoverVisible, setDiscoverVisible] = useState(false)
  const [infoVisible, setInfoVisible] = useState(false)

  const isMobile = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 800
    }
    return false
  }

  const toggleSupport = () => {
    if (isMobile()) {
      setSupportVisible(!supportVisible)
    }
  }

  const toggleDiscover = () => {
    if (isMobile()) {
      setDiscoverVisible(!discoverVisible)
    }
  }

  const toggleInfo = () => {
    if (isMobile()) {
      setInfoVisible(!infoVisible)
    }
  }

  return (
    <footer>
      <div className={s.root}>
        <div className={s.support}>
          <div className={s.category_name} onClick={toggleSupport}>
            SUPPORT
            {/* <span>
              <Image className={s.arrow} src={UpArrow} />
            </span> */}
          </div>
          <div className={`${s.links} ${supportVisible ? s.visible : ''}`}>
            <Link href="/contact">Contact</Link>
            <Link href="/faq">FAQ&apos;s</Link>
            <Link href="/delivery">Delivery</Link>
            <Link href="/returns">Return & Exchanges</Link>
            <Link href="/legal">Terms & Conditions</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
        <div className={s.discover}>
          <div className={s.category_name} onClick={toggleDiscover}>
            DISCOVER
            {/* <span>
              <Image className={s.arrow} src={UpArrow} />
            </span> */}
          </div>
          <div className={`${s.links} ${discoverVisible ? s.visible : ''}`}>
            <Link href="/reviews">Our Reviews</Link>
            <Link href="/recycling">Recycling & Packaging</Link>
            <Link href="/ingredients">Ingredients</Link>
            <Link href="/sustainability">Sustainability</Link>
          </div>
        </div>
        <div className={s.info}>
          <div className={s.category_name} onClick={toggleInfo}>
            INFO
            {/* <span>
              <Image className={s.arrow} src={UpArrow} />
            </span> */}
          </div>
          <div className={`${s.links} ${infoVisible ? s.visible : ''}`}>
            <Link href="/stockist">Stockist</Link>
            <Link href="/news">News</Link>
            <Link href="/routines">Skin Routines</Link>
            <Link href="/concerns">Skin Concerns</Link>
            <Link href="/admin">Admin</Link>
          </div>
        </div>
      </div>
      <div className={s.social}>
        <a href="https://www.facebook.com/people/justbyemma/100069221673666" target="_blank">
          <Facebook />
        </a>
        <a href="https://www.instagram.com/just.by.emma" target="_blank">
          <Instagram />
        </a>
      </div>
      <div className={s.copyright}>©{year} by Just by Emma</div>
    </footer>
  )
}
