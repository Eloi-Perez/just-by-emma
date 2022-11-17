import { useState, useContext, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ProductsContext } from '../../contexts/products-context'
import s from './navbar.module.scss'

export default function Search() {
  const router = useRouter()
  const initSearch = useRef(false)
  const [searchInput, setSearchInput] = useState('')
  const [errorSearch, setErrorSearch] = useState(false)
  const { products, fetchProducts } = useContext(ProductsContext)

  useEffect(() => {
    const handleRouteChange = () => {
      setSearchInput('')
      setErrorSearch(false)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

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
              <Link href={`/shop/${item._id}`}>{item.name}</Link>
            </li>
          ))}
      </ul>}

      {errorSearch &&
        <p>no match</p>
      }
    </div>
  )
}