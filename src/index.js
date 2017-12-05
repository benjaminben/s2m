import React, { Component } from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import Stage from './js/containers/Stage'
import store from './js/reducers'

import './js/init'

const root = document.getElementById('root')

class Root extends Component {
  render() {
    return(
      <Provider store={store}>
        <Stage roomID={root.getAttribute('data-room')} />
      </Provider>
    )
  }
}

ReactDOM.render(<Root />, root)
