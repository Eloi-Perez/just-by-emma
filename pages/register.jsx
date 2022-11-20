import CreateStyle from '../styles/register.module.scss'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Logo from '../components/UI/logo'
import { UserDataContext } from '../contexts/user-context'

const CreateAccount = () => {
  const { token, userData } = useContext(UserDataContext)
  if (token) {
    console.log(userData, token)
  }

  const [user, setUser] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  })

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios
      .post('http://localhost:3000/users/signup/', user)
      .then((response) => {
        const data = response.data
        console.log(data)
        setUser('')
        router.push('/login')
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
    <div className={CreateStyle.container}>
      <div className={CreateStyle.wrapper}>
        <div className={CreateStyle.logo}>
          <Logo />
        </div>

        <p className={CreateStyle.description}>
          A natural skincare range. Just simple 100% natural ingredients,
          lovingly handmade. Keeping your skincare routine simple and natural
        </p>
        <p className={CreateStyle.title}>Create Account</p>
        <form className={CreateStyle.form}>
          <input
            className={CreateStyle.input}
            type="text"
            placeholder="First Name"
            name="name"
            onChange={handleChange}
          />
          <input
            className={CreateStyle.input}
            type="text"
            placeholder="Last Name"
            name="surname"
            onChange={handleChange}
          />
          <input
            className={CreateStyle.input}
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
            className={CreateStyle.input}
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </form>

        <button
          className={CreateStyle.button}
          onClick={handleSubmit}
          value="submit"
        >
          Create Account
        </button>
        <p>Guest Option</p>
      </div>
    </div>
  )
}

export default CreateAccount
