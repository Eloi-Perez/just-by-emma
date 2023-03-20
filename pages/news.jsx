import Image from "next/image"

import HeaderImage from '../components/UI/header-image/header-image'
import EmmaImage from '../components/UI/emma-image/emma-image'
import s from '../styles/news.module.scss'

export default function News({ arrayNews }) {
  return (
    <>
      <HeaderImage />
      <div className={'header_content'}>
        <div className={'header_text_container'}>
          <h1 className={'header_title'}>LATEST NEWS & STORIES</h1>
          <p className={'header_text'}>
            Just by Emma is a small independent skincare business based in Leigh-on-Sea, Essex and run by Emma. All products are handmade in my home studio/lab, in small batches and always made to order to maintain product quality. The ever-evolving skincare range includes products which are formulated using only natural and simple ingredients.<br /><br />

            The Just by Emma ethos is about formulating products which focus on making your skincare routine natural, simple and including ingredients which contain tremendous benefits for your skin.
          </p>
        </div>
        <EmmaImage />
      </div>
      <div>
        {arrayNews && arrayNews.map(nw => (
          <div className={s.image} key={nw._id}>
            <Image
              src={`/backend/img/news/${nw.image}`}
              alt=""
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 900px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </div>
        ))}      
      </div>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.BACKEND}/v0/news`)
  const arrayNews = await res.json()
  return {
    props: {
      arrayNews: arrayNews.reverse(),
    },
  }
}
