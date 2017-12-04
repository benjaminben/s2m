import React, { Component } from 'react'
import ConsoleView from '../components/ConsoleView'

class Console extends Component {
  render() {
    const { props, state } = this
    return(
      <ConsoleView {...props} />
    )
  }
}

export default Console
