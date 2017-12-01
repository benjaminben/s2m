import React, { Component } from 'react'
import Stage from './containers/Stage'
import ReactDOM from 'react-dom'

console.log("Hello s2m")

const root = document.getElementById('root')

class Root extends Component {
  render() {
    return(
      <Stage roomID={root.getAttribute('data-room')} />
    )
  }
}

ReactDOM.render(<Root />, root)
