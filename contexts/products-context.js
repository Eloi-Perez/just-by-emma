import { useReducer, createContext } from 'react'

const productsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      }
    case 'SET_INGREDIENTS':
      return {
        ...state,
        ingredients: action.payload,
      }
    default:
      return state
  }
}

// to be use only on Admin & navbar search
// DATA WILL BE RETRIEVED WITH getStaticProps ON EACH PAGE AT BUILD

export const ProductsContext = createContext()

export const ProductsProvider = (props) => {
  const initialState = {
    products: [],
    ingredients: [],
  }

  const [state, dispatch] = useReducer(productsReducer, initialState)

  const fetchProducts = async () => {
    try {
      const call = await fetch('/backend/v0/products/')
      const newProducts = await call.json()
      if (call.ok) {
        dispatch({ type: 'SET_PRODUCTS', payload: newProducts })
      }
      console.log('fetched products')
    } catch (error) {
      console.error('An unexpected error happened:', error)
    }
  }

  const fetchIngredients = async () => {
    try {
      const call = await fetch('/backend/v0/ingredients/')
      const newIngredients = await call.json()
      if (call.ok) {
        dispatch({ type: 'SET_INGREDIENTS', payload: newIngredients })
      }
      console.log('fetched ingredients')
    } catch (error) {
      console.error('An unexpected error happened:', error)
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        products: state.products,
        fetchProducts,
        ingredients: state.ingredients,
        fetchIngredients,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  )
}
