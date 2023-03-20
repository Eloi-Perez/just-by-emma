import Image from "next/image"

export default function News({ arrayNews }) {
  return (
    <div>
      {arrayNews && arrayNews.map(nw => (
        <div key={nw._id}>
          <Image
            src={`/backend/img/news/${nw.image}`}
            alt=""
            width={600}
            height={600}
            style={{ objectFit: 'cover' }}
            sizes="60vw"
          />
        </div>
      ))}

    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.BACKEND}/v0/news`)
  const arrayNews = await res.json()
  return {
    props: {
      arrayNews,
    },
  }
}
