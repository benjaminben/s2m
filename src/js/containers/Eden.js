import React, { Component } from 'react'
import { connect } from 'react-redux'

class Eden extends Component {
  render() {
    return (
      <canvas id="Eden" ref={(el) => this.canvas = el} className="absolute scene" />
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Eden)
