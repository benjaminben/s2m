import React, { Component } from 'react'
import { connect } from 'react-redux'

class Spawn extends Component {
  render() {
    return (
      <canvas id="Spawn" ref={(el) => this.canvas = el} className="absolute scene" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Spawn)
