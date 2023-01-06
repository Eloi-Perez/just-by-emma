import { useState } from 'react'

import Login from './login'
import Register from './register'
import s from './login-register.module.scss'

export default function LoginRegister() {
  const [registerActive, setRegisterActive] = useState(false)

  return (
    <div className={s.root}>
      {!registerActive &&
        <>
          <Login />
          <button className={s.create}
            onClick={() => setRegisterActive(true)}
          >Create Account</button>
        </>
      }
      {registerActive &&
        <>
          <Register />
          <a href="javascript:void(0);" className={s.back_login}
            onClick={() => setRegisterActive(false)}
          >Already have an account?</a>
        </>
      }
    </div>
  )
}