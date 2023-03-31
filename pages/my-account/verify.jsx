import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import HeaderImage from '../../components/UI/header-image/header-image'
import { Button } from '../../components/UI/button/button.styles'

import s from '../../styles/my-account.module.scss'

export default function Verify() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (router.query.key) {
      verify(router.query.key)
    }
  }, [router.query])

  const verify = async (key) => {
    try {
      const call = await fetch(`/backend/v0/users/verify?key=${key}`)
      if (call.ok) {
        setIsLoading(false)
      } else {
        setError(true)
      }
    } catch (error) {
      setError(true)
    }
  }

  if (error) return (
    <>
      <HeaderImage />
      <h2 className={s.message}>Error, we couldn&apos;t verify your account.</h2>
    </>
  )

  if (isLoading) return (
    <>
      <HeaderImage />
      <h2 className={s.message}>Processing...</h2>
    </>
  )

  return (
    <>
      <HeaderImage />
      <div className={s.message}>
        <h2>Your email has been verified!</h2>
        <h3>Thank you for registering!</h3>
        <div className={s.button_container}>
          <Link href="/shop">
            <Button primaryColor>Shop Now</Button>
          </Link>
        </div>
      </div>
    </>
  )
}
