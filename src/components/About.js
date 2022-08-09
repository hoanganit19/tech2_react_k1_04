import React, { Component } from 'react'

import { GlobalContext } from '../context/GlobalState'

export class About extends Component {
  render() {
    return (

      <GlobalContext.Consumer>
          {data => {
            
                return (
                    <>
                        <h1 style={{
                        color: data.color
                    }}>About</h1>
                        <button onClick={() => {
                            data.action('add')
                        }}>Add</button>
                    </>
                )
          }
                
          }  
      </GlobalContext.Consumer>
    )
  }
}

export default About