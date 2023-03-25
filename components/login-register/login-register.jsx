import { useState } from 'react'

import Login from './login'
import Register from './register'
import { Button } from '../UI/button/button.styles'
import s from './login-register.module.scss'

export default function LoginRegister({ close }) {
  const [registerActive, setRegisterActive] = useState(false)
  const [alert, setAlert] = useState('')

  return (
    <div className={s.root}>
      {!registerActive && (
        <>
          <Login setAlert={setAlert} close={close} />
          <Button className={s.registerButton}
            onClick={() => {
              setRegisterActive(true)
              setAlert('')
            }}
          >
            Create Account
          </Button>
        </>
      )}
      {registerActive && (
        <>
          <Register setAlert={setAlert} toLogin={() => setRegisterActive(false)} />
          <a
            href="#"
            className={s.back_login}
            onClick={(e) => {
              e.preventDefault()
              setRegisterActive(false)
              setAlert('')
            }}
          >
            Already have an account?
          </a>
        </>
      )}
      {alert && <h3>{alert}</h3>}
    </div>
  )
}
