import { useState } from 'react'

import { Logo } from '../UI/svg'
import s from './login-register.module.scss'

export default function Register({ toLogin }) {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = { name, surname, email, password }

    try {
      const call = await fetch('/backend/v0/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const response = await call.json()
      if (call.ok) {
        setName('')
        setSurname('')
        setEmail('')
        setPassword('')
        console.log(response)
        // setAlert('Created!')
        toLogin()
        // TODO add message about having to verify email
      } else {
        console.log(response)
        // setAlert(response.message)
      }
    } catch (error) {
      console.error('An unexpected error happened:', error)
    }
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
              required
              autoFocus
            />
            <input
              className={s.input}
              type="text"
              placeholder="Last name"
              name="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
            <input
              className={s.input}
              type="email"
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
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$"
              title="The password should be between 6 and 20 characters, include numbers, uppercase, lowercase and one of: @$!%*?&"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className={s.buttonContainer}>
              <button type="submit" className={s.create}>
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}