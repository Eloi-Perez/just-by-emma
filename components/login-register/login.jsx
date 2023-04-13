import { useState } from 'react'

import { Logo } from '../UI/svg'
import { Button } from '../UI/button/button.styles'
import s from './login-register.module.scss'

export default function Login({ setAlert, close, toReset }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { email, password }

    try {
      const call = await fetch('/backend/v0/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const response = await call.json()
      if (call.ok) {
        setEmail('')
        setPassword('')
        // console.log(response)
        setAlert('logged in!')
        localStorage.setItem('credentials', response.token)
        // Close Dialog
        close()
      } else {
        // console.log(response)
        setAlert('error')
      }
    } catch (error) {
      // console.error('An unexpected error happened:', error)
      setAlert('error')
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
            A natural skincare range. Just simple natural ingredients, lovingly handmade. Keeping
            your skincare routine simple and natural
          </p>
          <p className={[s.title, s.login_title].join(' ')}>Sign in</p>
          <p className={s.login_subtitle}>Welcome back, please sign in below:</p>
          <form className={s.form} onSubmit={handleSubmit}>
            <input
              className={s.input}
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
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
            <a
              href="#"
              className={s.forgotten_button}
              onClick={(e) => {
                e.preventDefault()
                toReset()
              }}
            >
              Forgotten password ?
            </a>
            <div className={s.buttonContainer}>
              <Button type="submit" className={s.login} primaryColor>
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
