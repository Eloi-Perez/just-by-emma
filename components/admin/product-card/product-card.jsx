import { useState } from 'react'

import UpdateProductForm from '../update-product-form/update-product-form'
import DeleteProductForm from '../delete-product-form/delete-product-form'
import s from '../../../styles/admin.module.scss'

export default function ProductCard({ product }) {
  const [openUpdate, setOpenUpdate] = useState({})
  const toOpen = (id) => {
    setOpenUpdate({
      ...openUpdate, // remove this line to auto close when click on a different item
      [id]: !openUpdate[id]
    })
  }

  return (
    <div>
      <h3>{product.name}</h3>
      <div className={s.container_flex}>
        {product.images[0] && product.images.map((img) => (
          <div className={s.img_container} key={img._id}>
            <img src={`/backend/img/${img.filename}`}
              alt=""
              width="100px"
              height="100px"
              style={{ objectFit: 'cover' }}
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
  )
}