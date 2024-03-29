import { useState, useMemo } from 'react'

import UpdateProductForm from '../product/update-product-form'
import DeleteProductForm from '../product/delete-product-form'
import s from '../../../styles/admin.module.scss'
import Images from './images'

const toCurrency = (number) => {
  return new Intl.NumberFormat('en-uk', {
    style: 'currency',
    currency: 'GBP',
  }).format(number / 100)
}

export default function ProductCard({ product }) {
  const [openUpdate, setOpenUpdate] = useState(false)

  const ingredientsList = useMemo(() => {
    const toConvertList = JSON.parse(JSON.stringify(product.ingredients))
    const convertedList = toConvertList.map((e) => e.name)
    return convertedList
  }, [product])

  return (
    <div>
      <h3>{product.name}</h3>
      <div className={s.container_flex}>
        {product.images[0] && <Images product={product} />}
      </div>
      <p>{product.description}</p>
      <p>Ingredients: {ingredientsList.join(', ')}</p>
      {product.sizes.map((size, i) => (
        <div key={i}>
          {size.available && (
            <h3>
              {size.name}
              <br />
              Price: {toCurrency(size.price)}
            </h3>
          )}
          {!size.available && (
            <h3>
              <del>
                {size.name}
                <br />
                Price: {toCurrency(size.price)}
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
