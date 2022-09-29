import { useState } from 'react'
import useSWR from 'swr'
import Image from 'next/future/image'


import AddProductForm from '../../components/admin/add-product-form/add-product-form'
import UpdateProductForm from '../../components/admin/update-product-form/update-product-form'
import DeleteProductForm from '../../components/admin/delete-product-form/delete-product-form'

import s from '../../styles/admin.module.scss'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Admin() {
  const { data, error, mutate } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND}/products/`, fetcher)
  const [openAdd, setOpenAdd] = useState(false)
  const [openUpdate, setOpenUpdate] = useState({})

  const toOpen = (id) => {
    setOpenUpdate({
      ...openUpdate, // remove to auto close when click on a different item
      [id]: !openUpdate[id]
    })
  }

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  return (
    <div className={s.container}>
      <main className={s.main}>
        <button onClick={() => mutate()}>Force Update Data</button>
        <br />
        <button onClick={() => setOpenAdd(!openAdd)}>Add new product</button>
        {openAdd && <AddProductForm />}

        <h1>Product list:</h1>
        {/* TODO add search */}
        {data && data.map((product) => (
          <div key={product._id} >
            <h3>{product.name}</h3>
            <div className={s.container_flex}>
              {product.images[0] && product.images.map((img) => (
                <div className={s.img_container} key={img._id}>
                  <Image src={`${process.env.NEXT_PUBLIC_BACKEND}/img/${img.filename}`}
                    alt=""
                    // width={100}
                    // height={100}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="20vw"
                    priority
                  />
                </div>
              ))}
            </div>
            <p>{product.description}</p>
            <h3>Price: £{product.price}</h3>
            <button onClick={() => toOpen(product._id)}>Update info</button>
            <DeleteProductForm id={product._id} />
            {openUpdate[product._id] && <UpdateProductForm id={product._id} old={product} />}

            <hr />
          </div>
        ))}

      </main>
    </div>
  )
}
