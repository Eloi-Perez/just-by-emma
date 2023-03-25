import { UserDataProvider } from './user-context'
import { ProductsProvider } from './products-context'
import { CartProvider } from './cart-context'

export default function ContextProviders({ children }) {
  return (
    // <UserDataProvider>
    <ProductsProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </ProductsProvider>
    // </UserDataProvider>
  )
}
