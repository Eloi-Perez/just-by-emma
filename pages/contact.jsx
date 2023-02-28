import { useState } from 'react'

import EmmaImage from '../components/UI/emma-image/emma-image'
import HeaderImage from '../components/UI/header-image/header-image'
import { Facebook, Instagram } from '../components/UI/svg'
import s from '../styles/home.module.scss'

export default function Contact() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [alert, setAlert] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { firstName, lastName, email, message }
    try {
      const call = await fetch('/backend/v0/email/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      const response = await call.json()
      if (call.ok) {
        console.log(response)
        setFirstName('')
        setLastName('')
        setEmail('')
        setMessage('')
        setAlert('Sent!')
      } else {
        console.log(response)
        setAlert(response.message)
      }
    } catch (error) {
      console.error('An unexpected error happened:', error)
    }
  }

  return (
    <div className={s.root}>
      <HeaderImage />
      <h1 className={s.title}>CONTACT</h1>
      <h3>
        If you would like to talk about your order or have any questions about Just by Emma products or brand, I am here to help you.
      </h3>
      <EmmaImage />
      <p>Email us at: info@justbyemma.com</p>
      <p>Social Media FB IG</p>
      <Facebook />
      <Instagram />
      <p>For direct message please put your details and questions in the lines below.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            id="message"
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Send</button>
        </div>
        <h3>{alert}</h3>
      </form>
      <p>We will always aim to get back to you within 24 hours.<br />
        Thanks for shopping with Just by Emma.</p>
    </div>
  )
}
