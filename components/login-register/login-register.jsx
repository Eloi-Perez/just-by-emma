import { useState } from 'react'

import Login from './login'
import Register from './register'
import { Button } from '../UI/button/button.styles'
import s from './login-register.module.scss'

export default function LoginRegister({ close }) {
  const [registerActive, setRegisterActive] = useState(false)

  return (
    <div className={s.root}>
      {!registerActive && (
        <>
          <Login close={close} />
          <Button onClick={() => setRegisterActive(true)}>
            Create Account
          </Button>
        </>
      )}
      {registerActive && (
        <>
          <Register toLogin={() => setRegisterActive(false)} />
          <a
            href="#"
            className={s.back_login}
            onClick={(e) => {
              e.preventDefault()
              setRegisterActive(false)
            }}
          >
            Already have an account?
          </a>
        </>
      )}
    </div>
  )
}
