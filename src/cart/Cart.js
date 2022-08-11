import React, { Component } from "react";

import { CartContext } from "./context/CartProvider";

export class Cart extends Component {

  removeCart = (context, productId) => {
    if (window.confirm('Bạn có chắc chắn')){
       
        let currentIndex = null;
        if (context.carts.length){
            context.carts.some((product, index) => {

                if (parseInt(product.productId) === parseInt(productId)){
                    currentIndex = index;
                    return true;
                }
            })  
        }

        if (currentIndex!==null){
            context.carts.splice(currentIndex, 1);
        }

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
                    <td>{index+1}</td>
                    <td>{product.name}</td>
                    <td>{product.price.toLocaleString()}</td>
                    <td><input type="number" className="form-control" value={cartItem.quantity} onChange={() => {}}/></td>
                    <td>{amount.toLocaleString()}</td>
                    <td><button type="button" className="btn btn-danger btn-sm" onClick={() => {
                        this.removeCart(context, cartItem.productId);
                    }}>Xoá</button></td>
                </tr>
            );
        })
    }

    return (
        
        <CartContext.Consumer>
            {
                context => {
                    
                    const hasCarts = renderCart(context)
                    return (
                        <div className="container">
                            <h2>GIỎ HÀNG</h2>
                            {
                                hasCarts.length?
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
                                            <th colSpan={3}>
                                                Tổng
                                            </th>
                                            <th>
                                                {totalQuantiy}
                                            </th>
                                            <th colSpan={2}>
                                                {totalAmount.toLocaleString()}
                                            </th>
                                        </tr>
                                    </tbody>
                                    </table>
                                    <hr />
                                    <button type="button" className="btn btn-success me-2">Cập nhật giỏ hàng</button>
                                    <button type="button" className="btn btn-danger">Xoá giỏ hàng</button>
                                </>:
                                <div className="alert alert-danger">Không có sản phẩm trong giỏ hàng</div>
                            }
                            
                        </div>
                    )
                }
            }
        </CartContext.Consumer>
    );
  }
}

export default Cart;
