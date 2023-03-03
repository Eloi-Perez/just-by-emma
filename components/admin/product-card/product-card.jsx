import { useState } from 'react'

import UpdateProductForm from '../update-product-form/update-product-form'
import DeleteProductForm from '../delete-product-form/delete-product-form'
import s from '../../../styles/admin.module.scss'

export default function ProductCard({ product }) {
  const [openUpdate, setOpenUpdate] = useState(false)
  return (
    <div>
      <h3>{product.name}</h3>
      <div className={s.container_flex}>
        {product.images[0] &&
          product.images.map((img) => (
            <div className={s.img_container} key={img._id}>
              <img
                src={`/backend/img/${img.filename}`}
                alt=""
                width="100px"
                height="100px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
      </div>
      <p>{product.description}</p>
      {product.sizes.map((size, i) => (
        <div key={i}>
          {size.available && (
            <h3>
              {size.name}
              <br />
              Price: £{size.price}
            </h3>
          )}
          {!size.available && (
            <h3>
              <del>
                {size.name}
                <br />
                Price: £{size.price}
              </del>
            </h3>
          )}
        </div>
      ))}
      <DeleteProductForm id={product._id} />
      {!openUpdate && <button onClick={() => setOpenUpdate(true)}>Update info</button>}
      {openUpdate && <UpdateProductForm id={product._id} old={product} />}
      <hr />
    </div>
  )
}
