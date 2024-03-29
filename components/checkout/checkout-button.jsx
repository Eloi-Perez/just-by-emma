import { useContext, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

import { CartContext } from '../../contexts/cart-context'
import { Button } from '../UI/button/button.styles'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
export default function CheckoutButton() {
  const { cart } = useContext(CartContext)
  const [alert, setAlert] = useState('')
  // useEffect(() => {
  //   // Check to see if this is a redirect back from Checkout
  //   const query = new URLSearchParams(window.location.search)
  //   if (query.get('success')) {
  //     console.log('Order placed! You will receive an email confirmation.')
  //   }

  //   if (query.get('canceled')) {
  //     console.log('Order canceled -- continue to shop around and checkout when you’re ready.')
  //   }
  // }, [])

  const checkout = async (e) => {
    e.preventDefault()
    let line_items = []
    cart.map((p) => {
      p.quantities.map((item) => {
        line_items.push({
          price_data: {
            currency: 'GBP',
            unit_amount: p.product.sizes.find((el) => el.name === item.size).price,
            product_data: {
              name: p.product.name,
              description: item.size,
              // TODO change for server image
              images: ['https://eloiperez.com/photography/img/food/02.webp'],
            },
          },
          quantity: item.quantity,
          // tax_rates: ['txr_1Mgb7THikk8qRRx09X5F5Tnk'], // not needed
        })
      })
    })

    const data = { line_items }
    try {
      const call = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const response = await call.json()
      if (call.ok) {
        // console.log(response)
        window.location.href = response.url // or send to iframe
      } else {
        // console.log(response)
        setAlert('error, please try again in a few minutes')
      }
    } catch (error) {
      // console.error('An unexpected error happened:', error)
      setAlert('error, please try again in a few minutes')
    }
  }

  return (
    <form onSubmit={checkout}>
      {/* <form action="/api/checkout_sessions" method="POST"> */}
      <Button
        style={{ width: '200px', marginTop: '10px', fontSize: '1.5rem' }}
        type="submit"
        role="link"
        primaryColor
      >
        Checkout
      </Button>
      <h3>{alert}</h3>
    </form>
  )
}
