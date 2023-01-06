import { useState } from 'react'

import Logo from '../UI/svg/logo'
import s from './login-register.module.scss'

export default function Login() {
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
          <p className={s.title}>Sign in</p>
          <p>Welcome again please sign in</p>
          <form className={s.form} onSubmit={handleSubmit}>
            <input
              className={s.input}
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className={s.input}
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className={s.buttonContainer}>
              <button type="submit" className={s.login}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}