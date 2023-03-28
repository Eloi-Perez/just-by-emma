import { useState } from 'react'

import EmmaImage from '../components/UI/emma-image/emma-image'
import HeaderImage from '../components/UI/header-image/header-image'
import { Button } from '../components/UI/button/button.styles'
import { Facebook, Instagram } from '../components/UI/svg'
import f from '../components/footer/footer.module.scss'
import styles from '../styles/contact.module.scss'

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
        body: JSON.stringify(data),
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
        // console.log(response)
        setAlert('error, try again later')
      }
    } catch (error) {
      // console.error('An unexpected error happened:', error)
      setAlert('error, try again later')
    }
  }

  return (
    <>
      <HeaderImage />
      <div className={'header_content'}>
        <div className={'header_text_container'}>
          <h1 className={'header_title'}>CONTACT</h1>
          <p className={'header_text'}>
            If you would like to talk about your order or have any questions about Just by Emma
            products or brand, I am here to help you.
          </p>
        </div>
        <div className={styles.imageContainer}>
          <EmmaImage />
        </div>
      </div>
      <div className={styles.contactContainer}>
        <p>Email us at: <a href='mailto:Emma<info@justbyemma.com>'>info@justbyemma.com</a></p>
        <div className={styles.socialsContainer}>
          <p>Social Media:</p>
          <div className={f.social}>
            <a href="https://www.facebook.com/people/justbyemma/100069221673666" target="_blank">
              <Facebook />
            </a>
            <a href="https://www.instagram.com/just.by.emma" target="_blank">
              <Instagram />
            </a>
          </div>
        </div>
        <p className={styles.text}>
          For direct message please put your details
          and questions in the lines below.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={styles.input}
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
              className={styles.input}
            />
          </div>
          <div>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
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
              className={styles.input}
              required
            />
          </div>
          <Button className={styles.buttonSend} type="submit" primaryColor>
            Send
          </Button>
          <h3>{alert}</h3>
        </form>
        <p className={styles.text}>
          We will always aim to get back to you within 24 hours.
          <br />
          Thanks for shopping with Just by Emma.
        </p>
      </div>
    </>
  )
}
