import s from '../styles/home.module.scss'

export default function Contact() {
  return (
    <div className={s.root}>
      <h1 className={s.title}>CART</h1>
      <div>products list...</div>

      <div className={s.order}>
        <h3>Your Order (X items)</h3>
        <hr />
        <div>Merchandise £888</div>
        <div>Estimated Shipping: £111</div>
        <div>Subtotal £999</div>
        <button>Member Checkout</button>
        <button>Guest Checkout</button>
      </div>
    </div>
  )
}
