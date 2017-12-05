import React, { Component } from 'react'
import Screen from '../containers/Screen'
import Controls from '../containers/Controls'

class ConsoleView extends Component {
  render() {
    const { props, state } = this
    return(
      <div id="Console">
        <div className="screen-cont relative">
          <span className="power-indicator absolute"
                style={{backgroundColor: props.connection ? 'red' : 'black'}} />
          <Screen {...props} />
        </div>
        <Controls {...props} />
      </div>
    )
  }
}

export default ConsoleView
