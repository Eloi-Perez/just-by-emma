import { useState } from 'react'

import Login from './login'
import Register from './register'
import Reset from './reset'
import { Button } from '../UI/button/button.styles'
import s from './login-register.module.scss'

export default function LoginRegister({ close }) {
  const [screenSelector, setScreenSelector] = useState('login')
  const [alert, setAlert] = useState('')

  return (
    <div className={s.root}>
      {screenSelector === 'login' && (
        <>
          <Login setAlert={setAlert} close={close} toReset={() => setScreenSelector('reset')} />
          <Button className={s.registerButton}
            onClick={() => {
              setScreenSelector('register')
              setAlert('')
            }}
          >
            Create Account
          </Button>
        </>
      )}
      {screenSelector === 'register' && (
        <>
          <Register setAlert={setAlert} toLogin={() => setScreenSelector('login')} />
          <a
            href="#"
            className={s.back_login}
            onClick={(e) => {
              e.preventDefault()
              setScreenSelector('login')
              setAlert('')
            }}
          >
            Already have an account?
          </a>
        </>
      )}
      {screenSelector === 'reset' && (
        <>
          <Reset setAlert={setAlert} toLogin={() => setScreenSelector('login')} />
          <a
            href="#"
            className={s.back_login}
            onClick={(e) => {
              e.preventDefault()
              setScreenSelector('login')
              setAlert('')
            }}
          >
            Back to Log in
          </a>
        </>
      )}
      {alert && <h3>{alert}</h3>}
    </div>
  )
}
