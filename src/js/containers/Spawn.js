import React, { Component } from 'react'
import { connect } from 'react-redux'

class Spawn extends Component {
  constructor(props) {
    super(props)
    this.run = this.run.bind(this)
  }

  componentDidMount() {
    this.anim = window.requestAnimationFrame(this.run)
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.anim)
  }

  run() {
    this.props.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    this.props.ctx.fillStyle = 'pink',
    this.props.ctx.fillRect(10,10,100,100)

    this.anim = window.requestAnimationFrame(this.run)
  }

  render() {
    const { props, state } = this
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    screenWidth: state.game.screenWidth,
    screenHeight: state.game.screenHeight,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spawn)
