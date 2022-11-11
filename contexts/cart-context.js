import { useReducer, createContext } from 'react'

const cartReducer = (state, action) => {
  // redeclare to avoid page not refreshing with new result if return {state}
  let newState = { ...state }
  const match = newState.cart.findIndex(e => e.id === action.payload.id)
  const matchSize = (match !== -1) ? newState.cart[match].size[action.payload.sizeTo] : undefined
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        cart: action.payload,
      }
    case 'EMPTY_CART':
      return {
        ...state,
        cart: []
      }
    // case 'ADD_TO_CART':
    case 'MODIFY_CART':
      // { id, size: { [size]: quantity } }
      if (match === -1) {
        newState.cart.push(action.payload)
      } else {
        newState.cart[match] = {
          ...newState.cart[match],
          size: { ...newState.cart[match].size, ...action.payload.size }
        }
      }
      return newState
    case 'REMOVE_FROM_CART':
      // { id, sizeTo: {size} } }
      if (match >= 0 && matchSize) {
        delete newState.cart[match].size[action.payload.sizeTo]
      } else {
        console.error('Nothing to delete')
      }
      return newState
    case 'ADD_QUANTITY':
      // { id, sizeTo: {size} } }
      if (match === -1) { // ID not in cart
        newState.cart.push({
          id: action.payload.id,
          size: { [action.payload.sizeTo]: 1 },
        })
      } else if (match >= 0 && !matchSize) { // size not in cart
        newState.cart[match].size[action.payload.sizeTo] = 1
      } else {
        console.log('test2')
        newState.cart[match].size[action.payload.sizeTo] += 1
      }
      return newState
    case 'SUB_QUANTITY':
      // { id, sizeTo: {size} } }
      if (match >= 0 && matchSize === 1) {
        delete newState.cart[match].size[action.payload.sizeTo]
      } else if (match >= 0 && matchSize > 1) {
        newState.cart[match].size[action.payload.sizeTo] -= 1
      } else {
        console.error('Nothing to delete')
      }
      return newState
    default:
      return state
  }
}

export const CartContext = createContext()

export const CartProvider = props => {
  const initialState = {
    cart:
      [// example data
        { id: 'idNumber', size: { s15ml: 2, s50ml: 0 } }
        // { id: 'idNumber', size: '15ml', quantity: 2 }
        // OR [{ id: 'the-product-id', variants: { small: 2, medium: 1 } }]
      ]
  }

  const [state, dispatch] = useReducer(cartReducer, initialState)

  const setCart = (type, newCart) => {
    dispatch({ type: type, payload: newCart })
    // dispatch({ type: 'SET_CART', payload: newCart })
  }

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        setCart
      }}>
      {props.children}
    </CartContext.Provider>
  )
}