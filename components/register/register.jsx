import { useState } from 'react'
import Logo from '../UI/svg/logo'
import s from './register.module.scss'

export default function Register() {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.logo}>
            <Logo />
          </div>
          <p className={s.description}>
            A natural skincare range. Just simple 100% natural ingredients,
            lovingly handmade. Keeping your skincare routine simple and natural
          </p>
          <p className={s.title}>Create Account</p>
          <form className={s.form} onSubmit={handleSubmit}>
            <input
              className={s.input}
              type="text"
              placeholder="First name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={s.input}
              type="text"
              placeholder="Last name"
              name="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <input
              className={s.input}
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={s.input}
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          {/* <div className={s.buttonContainer}> */}
            <button type="submit" className={s.button}>
              Create Account
            </button>
            {/* <button className={s.create}>Already have an account</button> */}
          {/* </div> */}

          <p>Guest Option</p>
        </div>
      </div>
    </div>
  )
}