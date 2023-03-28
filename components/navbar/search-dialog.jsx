import { useState, useContext, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as D from '@radix-ui/react-dialog'

import { ProductsContext } from '../../contexts/products-context'
import { Close, Magnifier } from '../UI/svg'
import s from './navbar.module.scss'

const toCurrency = (number) => {
  return new Intl.NumberFormat('en-uk', {
    style: 'currency',
    currency: 'GBP',
  }).format(number / 100)
}

export default function SearchDialog({ children }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const initSearch = useRef(false)
  const [searchInput, setSearchInput] = useState('')
  const [errorSearch, setErrorSearch] = useState(false)
  const { products: unfilteredProducts, fetchProducts } = useContext(ProductsContext)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const handleRouteChange = () => {
      setSearchInput('')
      setErrorSearch(false)
      setOpen(false)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const availableProducts = unfilteredProducts.map((pr) => {
      pr.sizes = pr.sizes.filter((s) => s.available)
      if (pr.sizes[0]) {
        return pr
      }
    })
    const filteredProducts = availableProducts.filter((pr) => pr !== undefined)
    setProducts(filteredProducts)
  }, [unfilteredProducts])

  function handleChange(e) {
    setSearchInput(e.target.value)
    const result = products.filter((li) =>
      li.name.toLowerCase().includes(e.target.value.toLowerCase())
    )
    if (!result.length && !!products.length) {
      // error won't show on first keystroke
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
    <D.Root open={open} onOpenChange={setOpen}>
      <D.Trigger className={['resetButton', s.search].join(' ')}>{children}</D.Trigger>
      <D.Portal>
        <D.Overlay className={s.dialog_overlay}>
          <D.Content className={s.search_dialog_content}>
            <D.Close className={['resetButton', s.dialog_close].join(' ')}><Close /></D.Close>
            <div className={s.search_bar_container}>
              <input type="search" id="search-bar" placeholder="Search here" onChange={handleChange} value={searchInput} autoFocus />
              <label htmlFor="search-bar"><Magnifier /></label>
            </div>
            <div className={s.search_results}>
              {searchInput && (
                <>
                  <h3>Search Results</h3>
                  {products
                    .filter((li) => li.name.toLowerCase().includes(searchInput.toLowerCase()))
                    .map((item, key) => (
                      <Link key={key} className={s.search_results_item} href={`/shop/${item._id}`}>
                        <Image
                          src={`/backend/img/products/${item.images[0].filename}`}
                          alt="product image"
                          width={100}
                          height={100}
                          placeholder="blur"
                          blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP3g3f///yH5BAEAAAEALAAAAAABAAEAAAICRAEAOw=="
                          sizes="20vw"
                          priority
                          style={{ objectFit: 'cover', borderRadius: '50%' }}
                        />
                        <div className={s.item_text}>
                          <div>{item.name}</div>
                          <div>{toCurrency(item.sizes[0].price)}</div>
                        </div>
                      </Link>
                    ))}
                </>
              )}
              {errorSearch && <p>no match</p>}
            </div>
          </D.Content>
        </D.Overlay>
      </D.Portal>
    </D.Root>


  )
}
