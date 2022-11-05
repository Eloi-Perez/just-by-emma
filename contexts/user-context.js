import { useReducer, createContext } from 'react'

const userDataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.payload
      }
    default:
      return state
  }
}

export const UserDataContext = createContext()

export const UserDataProvider = props => {
  const initialState = {
    userData: ''
  }

  const [state, dispatch] = useReducer(userDataReducer, initialState)

  const setUserData = newUserData => {
    dispatch({ type: 'SET_USER_DATA', payload: newUserData })
  }

  return (
    <UserDataContext.Provider
      value={{
        userData: state.userData,
        setUserData
      }}
    >
      {props.children}
    </UserDataContext.Provider>
  )
}
