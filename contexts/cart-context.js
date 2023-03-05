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
      return {
        ...state,
        cart: action.payload,
      }
    case 'EMPTY_CART':
      return {
        ...state,
        cart: [],
      }
    // case 'ADD_TO_CART':
    // case 'MODIFY_CART': // review changes new schema
    //   // {id, "quantities": [{ "size": "15ml", "quantity": 1 }], product}
    //   if (match === -1) {
    //     newState.cart.push(action.payload)
    //   } else {
    //     newState.cart[match] = {
    //       ...newState.cart[match],
    //       size: { ...newState.cart[match].size, ...action.payload.size }
    //     }
    //   }
    //   return newState
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
      return newState
    default:
      return state
  }
}

export const CartContext = createContext()

// const mockData = {
//   id: '637035139fe8d9dcd00238e9',
//   quantities: [
//     { size: '15ml', quantity: 1 },
//     { size: '50ml', quantity: 3 },
//   ],
//   product: {
//     _id: '637035139fe8d9dcd00238e9',
//     name: 'item with multiple sizes',
//     sizes: [
//       {
//         name: '15ml',
//         price: 5,
//         offer: 0,
//         available: true,
//         _id: '637035139fe8d9dcd00238ea',
//       },
//       {
//         name: '50ml',
//         price: 30,
//         offer: 0,
//         available: true,
//         _id: '637035139fe8d9dcd00238eb',
//       },
//     ],
//     description: 'amazing description',
//     images: [
//       {
//         filename: '637035139fe8d9dcd00238e9_0.jpg',
//         priority: 0,
//         _id: '637035139fe8d9dcd00238ec',
//       },
//       {
//         filename: '637035139fe8d9dcd00238e9_1.jpeg',
//         priority: 1,
//         _id: '637035139fe8d9dcd00238ed',
//       },
//     ],
//     createdAt: '2022-11-13T00:06:43.048Z',
//     updatedAt: '2022-11-13T00:06:43.048Z',
//     __v: 0,
//   },
// }

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
  useEffect(() => {
    localStorage.setItem('jbe_cart', JSON.stringify(state.cart))
  }, [state])

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
