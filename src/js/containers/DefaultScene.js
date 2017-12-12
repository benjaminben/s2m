import React, { Component } from 'react'
import { connect } from 'react-redux'

class DefaultScene extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.run = this.run.bind(this)
  }

  componentDidMount() {
    this.anim = window.requestAnimationFrame(this.run)
  }

  componentWillUnmount() {
    this.props.ctx.clearRect(0, 0, this.props.screenWidth, this.props.screenHeight)
    window.cancelAnimationFrame(this.anim)
  }

  run() {
    var {ctx, touch, dims, screenWidth, screenHeight} = this.props

    if (this.props.controls.onB) {
      ctx.clearRect(0, 0, screenWidth, screenHeight)
    }

    if (this.props.touch) {
      ctx.fillStyle = 'rgba(40,40,40,1)'
      ctx.fillRect(
        touch.clientX - dims.x,
        touch.clientY - dims.y,
        4, 4
      )
    }

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
    controls: state.controls,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultScene)
