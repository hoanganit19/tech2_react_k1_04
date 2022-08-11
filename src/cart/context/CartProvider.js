import React, { Component } from "react";

export const CartContext = React.createContext();

export class CartProvider extends Component {
  constructor(props) {
    super(props);

    this.productApi = "https://apishoe.herokuapp.com/list";

    this.state = {
      products: [],
      carts: [],
      getProduct: null,
      updateCart: (data) => {
           this.setState({
            carts: data
           }) 
      },


    };
  }

  componentDidMount = () => {
    this.getProducts();
    this.setState({
        getProduct: this.getProduct
    })
  };

  getProducts = () => {
    fetch(this.productApi)
      .then((response) => response.json())
      .then((products) => {
        this.setState({
          products: products,
        });
      });
  };

  getProduct = (productId) => {

    let productDetail = null;

    this.state.products.some(product => {
        
        if (parseInt(product.id) === parseInt(productId)){
            productDetail = product;
            return true;
        }
    })

    return productDetail;
  } 

  render() {
    
    const { children } = this.props;

    return (
      <CartContext.Provider value={this.state}>{children}</CartContext.Provider>
    );
  }
}

export default CartProvider;
