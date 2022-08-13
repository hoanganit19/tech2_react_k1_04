import React, { Component } from "react";

import { CartContext } from "./context/CartProvider";

export class Cart extends Component {

  constructor(props){
    super(props);

    this.state = {
        quantity: []
    }
  }  

  removeCart = (context, productId) => {
    if (window.confirm("Bạn có chắc chắn")) {
      let currentIndex = null;
      if (context.carts.length) {
        context.carts.some((product, index) => {
          if (parseInt(product.productId) === parseInt(productId)) {
            currentIndex = index;
            return true;
          }
        });
      }

      if (currentIndex !== null) {
        context.carts.splice(currentIndex, 1);
      }

      context.updateCart(context.carts);
    }
  };

  removeAll = (context) => {
      if (window.confirm('Bạn có chắc chắn?')){
            context.carts.splice(0);
        
            context.updateCart(context.carts); 
      } 
  }

  changeQuantity = (e) => {
    const quantity = e.target.value;
    const productId = e.target.dataset.id;
    
    const quantityArr = {...this.state.quantity};

    quantityArr[productId] = quantity;

    this.setState({
            quantity: quantityArr
        }
    )
    
  };

  updateCart = (context) => {
    const quantityObj = this.state.quantity;
   
    if (Object.keys(quantityObj).length){
        const productIds = Object.keys(quantityObj);
        
        context.carts.forEach((product, index) => {
            const productId = product.productId.toString();
            if (productIds.includes(productId)) {
                
                context.carts[index] = {
                    productId: parseInt(productId),
                    quantity: parseInt(quantityObj[productId])
                }
                
            }
        });

        context.updateCart(context.carts);
    }
  }

  render() {
    let totalQuantiy;

    let totalAmount;

    const renderCart = (context) => {
      totalQuantiy = 0;
      totalAmount = 0;

      return context.carts.map((cartItem, index) => {
        const product = context.getProduct(cartItem.productId);
        const amount = product.price * cartItem.quantity;
        totalQuantiy += parseInt(cartItem.quantity);
        totalAmount += parseInt(amount);
        return (
          <tr key={cartItem.productId}>
            <td>{index + 1}</td>
            <td>{product.name}</td>
            <td>{product.price.toLocaleString()}</td>
            <td>
              <input
                type="number"
                className="form-control"
                defaultValue={cartItem.quantity}
                key={cartItem.quantity}
                onChange={this.changeQuantity}
                data-id={cartItem.productId}
              />
            </td>
            <td>{amount.toLocaleString()}</td>
            <td>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => {
                  this.removeCart(context, cartItem.productId);
                }}
              >
                Xoá
              </button>
            </td>
          </tr>
        );
      });
    };

    return (
      <CartContext.Consumer>
        {(context) => {
          const hasCarts = renderCart(context);
          return (
            <div className="container">
              <h2>GIỎ HÀNG</h2>
              {hasCarts.length ? (
                <>
                  <hr />
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th width="5%">STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th width="10%">Số lượng</th>
                        <th>Thành tiền</th>
                        <th width="5%">Xoá</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hasCarts}
                      <tr>
                        <th colSpan={3}>Tổng</th>
                        <th>{totalQuantiy}</th>
                        <th colSpan={2}>{totalAmount.toLocaleString()}</th>
                      </tr>
                    </tbody>
                  </table>
                  <hr />
                  <button type="button" className="btn btn-success me-2" onClick={() => {
                    this.updateCart(context);
                  }}>
                    Cập nhật giỏ hàng
                  </button>
                  <button type="button" className="btn btn-danger" onClick={() => {
                    this.removeAll(context);
                  }}>
                    Xoá giỏ hàng
                  </button>
                </>
              ) : (
                <div className="alert alert-danger">
                  Không có sản phẩm trong giỏ hàng
                </div>
              )}
            </div>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

export default Cart;
