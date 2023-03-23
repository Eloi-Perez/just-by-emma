import { useContext } from 'react'

import { ProductsContext } from '../../../contexts/products-context'

import AddIngredientsForm from './add-ingredients-form'
import DeleteIngredientsForm from './delete-ingredients-form'

export default function Ingredients() {
  const { ingredients } = useContext(ProductsContext)

  return (
    <>
      <AddIngredientsForm />
      <h2>Ingredients list:</h2>
      {ingredients && ingredients.map((e) => (
        <div key={e._id}>
          <h3>{e.name}</h3>
          <p>{e.description}</p>
          <img src={`/backend/img/ingredients/${e.image}`}
            alt=""
            width="100px"
            height="100px"
            style={{ objectFit: 'cover' }}
          />
          <DeleteIngredientsForm id={e._id} />
        </div>
      ))}
    </>
  )
}