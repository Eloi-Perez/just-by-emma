import { useState, useContext, useRef } from 'react'

import { ProductsContext } from '../../contexts/products-context'
import s from './navbar.module.scss'

export default function Search() {
  const initSearch = useRef(false)
  const [searchInput, setSearchInput] = useState('')
  const [errorSearch, setErrorSearch] = useState(false)
  const { products, fetchProducts } = useContext(ProductsContext)

  function handleChange(e) {
    setSearchInput(e.target.value)
    const result = products.filter(li => li.name.toLowerCase().includes(e.target.value.toLowerCase()))
    if (!result.length && !!products.length) { // error won't show on first keystroke
      setErrorSearch(true)
    } else {
      setErrorSearch(false)
    }
    if (!products.length && initSearch.current === false) {
      fetchProducts()
      initSearch.current = true
    }
  }


  //TODO: links on list and clear search onClick
  return (
    <div className={s.search}>
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput} />

      {searchInput && <ul>
        {products
          .filter(li => li.name.toLowerCase().includes(searchInput.toLowerCase()))
          .map((item, key) => (
            <li key={key}>
              {item.name}
            </li>
          ))}
      </ul>}

      {errorSearch &&
        <p>no match</p>
      }
    </div>
  )
}