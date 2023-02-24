import { useReducer, createContext } from 'react'

const productsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      }
    default:
      return state
  }
}

// to be use only on Admin & navbar search
// DATA WILL BE RETRIEVED WITH getStaticProps ON EACH PAGE AT BUILD

export const ProductsContext = createContext()

export const ProductsProvider = props => {
  const initialState = {
    products: []
  }

  const [state, dispatch] = useReducer(productsReducer, initialState)

  const fetchProducts = async () => {
    try {
      const call = await fetch('/backend/v0/products/')
      const newProducts = await call.json()
      if (call.ok) {
        dispatch({ type: 'SET_PRODUCTS', payload: newProducts })
      }
      console.log('fetched')
    } catch (error) {
      console.error('An unexpected error happened:', error)
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        products: state.products,
        fetchProducts
      }}>
      {props.children}
    </ProductsContext.Provider>
  )
}