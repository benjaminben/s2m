import React, { Component } from 'react'
import Screen from '../containers/Screen'
import Controls from '../containers/Controls'

class ConsoleView extends Component {
  render() {
    const { props, state } = this
    return(
      <div id="Console" ref={(el) => this.el = el}>
        <div className="screen-cont relative">
          <span className="power-indicator absolute p2p"
                style={{backgroundColor: props.connection ? 'red' : 'black'}} />
          <Screen {...props} />
        </div>
        <Controls {...props} />
        {
          props.fullScreen && !props.isFullscreen ?
          <h3 id="fullscreen" className="p2p" onClick={() => props.fullScreen(this.el)}>
          FULL SCREEN
          </h3> : null
        }
      </div>
    )
  }
}

export default ConsoleView
