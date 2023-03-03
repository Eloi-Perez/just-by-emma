import { useState } from 'react'

import Login from './login'
import Register from './register'
import s from './login-register.module.scss'

export default function LoginRegister({ close }) {
  const [registerActive, setRegisterActive] = useState(false)

  return (
    <div className={s.root}>
      {!registerActive && (
        <>
          <Login close={close} />
          <button className={s.create} onClick={() => setRegisterActive(true)}>
            Create Account
          </button>
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
