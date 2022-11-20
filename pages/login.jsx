import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import axios from 'axios'
import Logo from '../components/UI/logo'
import login from '../styles/login.module.scss'
import { UserDataContext } from '../contexts/user-context'
import ContextProviders from '../contexts/context-providers'

const CreateAccount = () => {
  const { userData, token, setUserData, setToken } = useContext(UserDataContext)

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios
      .post('http://localhost:3000/users/login/', user)
      .then((response) => {
        const data = response.data
        console.log(data)

        setUserData(userData)

        setToken(token)

        setUser('')
      })
      .catch((error) => {
        if (error) {
          console.log(error.message)
        }
      })
  }

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className={login.container}>
      <div className={login.wrapper}>
        <div className={login.logo}>
          <Logo />
        </div>
        <p className={login.description}>
          A natural skincare range. Just simple 100% natural ingredients,
          lovingly handmade. Keeping your skincare routine simple and natural
        </p>
        <p className={login.title}>Sign in</p>
        <p>Welcome again please sign in</p>
        <form className={login.form}>
          <input
            className={login.input}
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
            className={login.input}
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </form>
        <div className={login.buttonContainer}>
          <button className={login.login} onClick={handleSubmit}>
            Login
          </button>
          {/* <button className={login.create}>Create Account</button> */}
        </div>

        <p>Guest Option</p>
      </div>
    </div>
  )
}

export default CreateAccount
