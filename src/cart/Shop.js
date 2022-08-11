import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Products from './Products'
import Cart from './Cart'
import CartProvider from './context/CartProvider'

export class Shop extends Component {
  render() {
    return (
      <>
        <CartProvider>
            <Products />
            <Cart />
        </CartProvider>
      </>
    )
  }
}

export default Shop