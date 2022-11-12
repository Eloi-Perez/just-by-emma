import { useReducer, createContext } from 'react'

const cartReducer = (state, action) => {
  // redeclare to avoid page not refreshing with new result if return {state}
  let newState = { ...state }
  const match = newState.cart.findIndex(e => e.id === action.payload.id)
  const matchSize = (match !== -1) ? newState.cart[match].size[action.payload.select] : undefined
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
      // TODO save newState to localStorage
      return newState
    case 'REMOVE_FROM_CART':
      // { id, select: {size} } }
      if (match >= 0 && matchSize) {
        delete newState.cart[match].size[action.payload.select]
      } else {
        console.error('Nothing to delete')
      }
      return newState
    case 'ADD_QUANTITY':
      // { id, select: {size} } }
      if (match === -1) { // ID not in cart
        newState.cart.push({
          id: action.payload.id,
          size: { [action.payload.select]: 1 },
          product: action.payload.product
        })
      } else if (match >= 0 && !matchSize) { // size not in cart
        newState.cart[match].size[action.payload.select] = 1
      } else {
        console.log('test2')
        newState.cart[match].size[action.payload.select] += 1
      }
      return newState
    case 'SUB_QUANTITY':
      // { id, select: {size} } }
      if (match >= 0 && matchSize === 1) {
        delete newState.cart[match].size[action.payload.select]
      } else if (match >= 0 && matchSize > 1) {
        newState.cart[match].size[action.payload.select] -= 1
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
      [// example data // load from localStorage
        {
          "id": "63455d77f0c1b313f5c7708c",
          "size": { "s50ml": 3, "s15ml": 1 },
          "product": { "_id": "63455d77f0c1b313f5c7708c", "name": "222", "price": 222, "description": "2222", "images": [{ "filename": "63455d77f0c1b313f5c7708c_0.jpg", "priority": 0, "_id": "63455d77f0c1b313f5c7708d" }, { "filename": "63455d77f0c1b313f5c7708c_1.jpg", "priority": 1, "_id": "63455d77f0c1b313f5c7708e" }], "createdAt": "2022-10-11T12:11:35.080Z", "updatedAt": "2022-10-15T19:03:39.674Z", "__v": 0 }
        }
        // { "id": "63455d5bf0c1b313f5c77085", "size": { "s50ml": 2, "s15ml": 1 } }
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