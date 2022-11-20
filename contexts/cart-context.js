import { useReducer, createContext } from 'react'

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        cart: action.payload
      }
    default:
      return state
  }
}

export const CartContext = createContext()

export const CartProvider = props => {
  const initialState = {
    cart: [{ id: 'idNumber', name: 'newest item', quantity: 2 }]
  }

  const [state, dispatch] = useReducer(cartReducer, initialState)

  const setCart = newCart => {
    dispatch({ type: 'SET_CART', payload: newCart })
  }

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        setCart
      }}
    >
      {props.children}
    </CartContext.Provider>
  )
}

