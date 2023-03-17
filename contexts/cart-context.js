import { useReducer, createContext, useEffect } from 'react'

const cartReducer = (state, action) => {
  // redeclare to avoid page not refreshing with new result if return {state}
  const newState = JSON.parse(JSON.stringify(state))
  const match = newState.cart.findIndex((e) => e.id === action.payload?.id)
  const matchSize =
    match !== -1
      ? newState.cart[match].quantities.findIndex((e) => e.size === action.payload.select)
      : undefined
  switch (action.type) {
    case 'SET_CART':
      // Only used to set cart from localStorage, so no need to set it back
      // localStorage.setItem('jbe_cart', JSON.stringify(action.payload))
      return {
        ...state,
        cart: action.payload,
      }
    case 'EMPTY_CART':
      localStorage.removeItem('jbe_cart')
      return {
        ...state,
        cart: [],
      }
    // case 'ADD_TO_CART':
    // case 'MODIFY_CART':
    case 'REMOVE_FROM_CART':
      // {id, select: 'size'}
      if (match >= 0 && newState.cart[match].quantities[matchSize].quantity) {
        if (newState.cart[match].quantities.length === 1) {
          // only 1 variant
          newState.cart.splice(match, 1)
        } else {
          newState.cart[match].quantities.splice(matchSize, 1)
        }
      } else {
        console.error('Nothing to delete')
      }
      localStorage.setItem('jbe_cart', JSON.stringify(newState.cart))
      return newState
    case 'ADD_QUANTITY':
      // {id, select: 'size', product}
      if (match === -1) {
        // ID not in cart
        newState.cart.push({
          id: action.payload.id,
          quantities: [{ size: action.payload.select, quantity: 1 }],
          product: action.payload.product,
        })
      } else if (match >= 0 && matchSize === -1) {
        // size not in cart
        newState.cart[match].quantities.push({ size: action.payload.select, quantity: 1 })
      } else {
        newState.cart[match].quantities[matchSize].quantity += 1
      }
      localStorage.setItem('jbe_cart', JSON.stringify(newState.cart))
      return newState
    case 'SUB_QUANTITY':
      // {id, select: 'size'}
      if (match >= 0 && newState.cart[match].quantities[matchSize].quantity === 1) {
        if (newState.cart[match].quantities.length === 1) {
          newState.cart.splice(match, 1)
        } else {
          newState.cart[match].quantities.splice(matchSize, 1)
        }
      } else if (match >= 0 && newState.cart[match].quantities[matchSize].quantity > 1) {
        newState.cart[match].quantities[matchSize].quantity -= 1
      } else {
        console.error('Nothing to delete')
      }
      localStorage.setItem('jbe_cart', JSON.stringify(newState.cart))
      return newState
    default:
      return state
  }
}

export const CartContext = createContext()

export const CartProvider = (props) => {
  const initialState = {
    cart: [],
  }

  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    const oldCart = localStorage.getItem('jbe_cart')
    if (oldCart) {
      setCart('SET_CART', JSON.parse(oldCart))
    }
  }, [])

  const setCart = (type, newCart) => {
    dispatch({ type: type, payload: newCart })
    // dispatch({ type: 'SET_CART', payload: newCart })
  }

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        setCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  )
}
