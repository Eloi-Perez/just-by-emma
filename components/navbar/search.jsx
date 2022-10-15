import { useState, useContext } from 'react'

import { ProductsContext } from '../../contexts/products-context'

import s from './navbar.module.scss'

export default function Search() {
  const [searchInput, setSearchInput] = useState('')
  const { products, fetchProducts } = useContext(ProductsContext)



  return (
    <div className={s.search}>
      <input
        type="text"
        placeholder="Search here"
        onChange={e => setSearchInput(e.target.value)}
        value={searchInput} />

      {searchInput && <ul>
        {products.filter(li => li.name.toLowerCase().includes(searchInput.toLowerCase()))
          .map((item, key) => (
            <li key={key}>
              {item.name}
            </li>
          ))}
      </ul>}
    </div>
  )
}