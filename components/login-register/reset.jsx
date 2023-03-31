import { useState } from 'react'

import { Logo } from '../UI/svg'
import { Button } from '../UI/button/button.styles'
import s from './login-register.module.scss'

export default function Reset({ setAlert, toLogin }) {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { email: email.trim() }

    try {
      const call = await fetch('/backend/v0/users/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const response = await call.json()
      console.log(await response)
      if (call.ok) {
        setEmail('')
        setAlert('Reset link sent!')
        toLogin()
      } else {
        setAlert('error')
      }
    } catch (error) {
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
            A natural skincare range. Just simple natural ingredients, lovingly handmade.
            Keeping your skincare routine simple and natural
          </p>
          <p className={s.title}>Reset password</p>
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
            <div className={s.buttonContainer}>
              <Button type="submit" className={s.login} primaryColor>
                Reset
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
