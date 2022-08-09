import React, { Component } from 'react'
import { GlobalContext } from '../context/GlobalState'

export class ShoppingCart extends Component {

  addCartHandle = (data, productItem) => {
        data.state.cart.push(productItem);
        data.updateCart(data.state.cart);
  }  
  render() {
    let count = 0;
    return (
      <>
        <h2>Giỏ hàng</h2>
        <GlobalContext.Consumer>
            {
                data => 
                <>
                    <button onClick={() => {
                    this.addCartHandle(data, 'Product Item: '+ ++count);

                }}>
                    Thêm vào giỏ
                </button>
                <hr />
                <div>
                    {
                        data.state.cart.map((item, index) => <h2 key={index}>{item}</h2>)
                    }
                </div>
                </>
                

            }
        </GlobalContext.Consumer>
      </>
    )
  }
}

export default ShoppingCart