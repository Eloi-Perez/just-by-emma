import CreateStyle from '../styles/register.module.scss'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { UserDataContext } from '../contexts/user-context'
import axios from 'axios'

const CreateAccount = () => {
  const [user, setUser] = useState({
    firsname: '',
    lastname: '',
    email: '',
    password: '',
  })

  const router = useRouter()

  const [{ userData }, dispatch] = useContext(UserDataContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    axios
      .post('http//localhost:3001/users/register/', user)
      .then((response) => {
        const userData = response.data
        console.log(data)

        dispatch({ type: 'SET_USER_DATA', userData })
        localStorage.setItem('token', JSON.stringify(userData.token))

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
        <img
          className={CreateStyle.image}
          src="https://unsplash.com/photos/0XnuFXiMLTk"
          alt=""
        />
        <p className={CreateStyle.description}>
          A natural skincare range. Just simple 100% natural ingredients,
          lovingly handmade. Keeping your skincare routine simple and natural
        </p>
        <p className={CreateStyle.title}>Create Account</p>
        <form className={CreateStyle.form}>
          <input className={CreateStyle.input} type="text" />
          <input
            className={CreateStyle.input}
            type="text"
            placeholder="First Name"
            name="firstname"
            onChange={handleChange}
          />
          <input
            className={CreateStyle.input}
            type="text"
            placeholder="Last Name"
            name="lastname"
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
            type="text"
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
