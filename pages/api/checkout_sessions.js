const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        // customer_email: {},
        // customer_email: 'test@123.com',
        line_items: req.body.line_items,
        billing_address_collection: 'auto',
        shipping_address_collection: {
          allowed_countries: ['GB'],
        },
        shipping_options: [
          { shipping_rate: 'shr_1MgagzHikk8qRRx0Fo1UcaW8' },
          { shipping_rate: 'shr_1MgahaHikk8qRRx0wsfpkqK0' },
          { shipping_rate: 'shr_1Mgaj2Hikk8qRRx00fxw1ylh' },
        ],
        mode: 'payment',
        allow_promotion_codes: true,
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cart/?canceled=true`,
      })
      // res.redirect(303, session.url)
      res.json({ url: session.url })
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}