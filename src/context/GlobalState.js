import React, { Component } from 'react'

export const GlobalContext = React.createContext();

export class GlobalState extends Component {

  constructor(props){
    super(props);

    this.state = {
        color: 'blue',
        action: 'lists',
        cart: []
    }

  }  

  changeAction = (action) => {
        this.setState({
            action: action
        }) 
  }

  updateCart = (cart) => {
    this.setState({
      cart: cart
    })
  }
  render() {

    const {children} = this.props;

    return (
        <GlobalContext.Provider value={
            {
                state: this.state,
                action: this.changeAction,
                updateCart: this.updateCart
            }
        }>
            {children}
        </GlobalContext.Provider>
    )
  }
}

export default GlobalState