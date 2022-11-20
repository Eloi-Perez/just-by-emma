import { useReducer, createContext } from 'react'

const userDataReducer = (state, action) => {
  console.log(action)

  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.payload
      }

    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload
      }

    default:
      return state
  }
}

export const UserDataContext = createContext()

export const UserDataProvider = props => {
  const initialState = {
    userData: '',
    token: ''
  }

  const [state, dispatch] = useReducer(userDataReducer, initialState)

  const setUserData = newUserData => {
    dispatch({ type: 'SET_USER_DATA', payload: newUserData })
  }

  const setToken = token => {
    dispatch({ type: 'SET_TOKEN', payload: token })
  }

  return (
    <UserDataContext.Provider
      value={{
        userData: state.userData,
        setUserData,
        setToken,
        token: state.token
      }}
    >
      {props.children}
    </UserDataContext.Provider>
  )
}
