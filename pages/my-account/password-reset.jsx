import { useState } from 'react'
import { useRouter } from 'next/router'

import HeaderImage from '../../components/UI/header-image/header-image'
import { Button } from '../../components/UI/button/button.styles'

import s from '../../styles/my-account.module.scss'

export default function PasswordReset() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [alert, setAlert] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { resetToken: router.query.key, newPassword: password }
    try {
      const call = await fetch('/backend/v0/users/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (call.ok) {
        setPassword('')
        setConfirmPassword('')
        setAlert('Updated!')
        setTimeout(() => router.push('/'), 2000)
      } else {
        setAlert('error')
      }
    } catch (error) {
      setAlert('error')
    }
  }

  const handleConfirmPassword = async (e) => {
    setConfirmPassword(e.target.value)
    if (password !== e.target.value) {
      e.target.setCustomValidity(`Passwords dont't match`)
    } else {
      e.target.setCustomValidity('')
    }
  }

  return (
    <>
      <HeaderImage />
      <div className={s.content}>
        <h1>Password Reset</h1>
        <form className={s.form} onSubmit={handleSubmit}>
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
          <input
            className={s.input}
            type="password"
            placeholder="Confirm Password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => handleConfirmPassword(e)}
            required
          />
          <div className={s.button_container}>
            <Button type="submit">
              Update password
            </Button>
          </div>
        </form >
        {alert && <h3>{alert}</h3>}
      </div>
    </>
  )
}

