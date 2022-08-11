import React, { Component } from 'react'

import { CartContext } from './context/CartProvider';

export class Products extends Component {
 
  constructor(props){
    super(props);

    this.carts = [];

    /*
    carts[] = {
        productId: 1,
        quantity: 5
    }
    */
  } 
  
  checkCart = (productId) => {

    let check = false;
    let currentIndex = null;
    if (this.carts.length){
        check = this.carts.some((product, index) => {

            if (parseInt(product.productId) === parseInt(productId)){
                currentIndex = index;
            }

            return currentIndex!==null ? true: false;
        })  
    }
    
    return {
        status: check,
        index: currentIndex
    };
  }

  addToCart = (productId, quantity) => {
      if (quantity==='' || quantity === null || quantity === undefined || quantity<=0 || parseInt(quantity) != quantity){
        quantity = 1;
      }

     quantity = parseInt(quantity);

     productId = parseInt(productId);

     const {status, index} = this.checkCart(productId); 

    const cartItem = {
        productId: productId,
        quantity: quantity
    }

     if (status){
        //Tồn tại sản phẩm trong giỏ hàng
        quantity+=parseInt(this.carts[index].quantity);
        
        cartItem.quantity = quantity;

        this.carts[index] = cartItem;

     }else{
        //Không tồn tại sản phẩm
        this.carts.push(cartItem);
     }

     return this.carts;
  }
 
  render() {

    return (
        <CartContext.Consumer>
            {
                context => {

                    const renderProducts = context.products.map((product, index) => {
                        return <tr key={product.id}>
                            <td>{index+1}</td>
                            <td>{product.name}</td>
                            <td>{`${product.price.toLocaleString()} đ`}</td>
                            <td className='text-center'>
                                <input type="number" name='quantity' className='form-control mb-2 text-center' defaultValue='1' />
                                <button type='button' className='btn btn-primary btn-sm' onClick={(e) => {
                                    const quantity = e.target.previousElementSibling.value;
                                    const carts = this.addToCart(product.id, quantity);
                                    if (carts.length){
                                        context.updateCart(carts);
                                    }
                                    
                                }}>Thêm vào giỏ</button>
                            </td>
                        </tr>
                    })

                    return (
                        <div className='container'>
                            <h2>DANH SÁCH SẢN PHẨM</h2>
                            <hr />
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th width="5%">STT</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Giá</th>
                                        <th width="15%">Thêm vào giỏ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderProducts}
                                </tbody>
                            </table>
                        </div>
                    )
                    
                }
                
            }
        </CartContext.Consumer>
    )
  }
}

export default Products