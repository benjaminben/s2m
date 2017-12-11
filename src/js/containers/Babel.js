import React, { Component } from 'react'
import { connect } from 'react-redux'

class Babel extends Component {
  constructor(props) {
    super(props)
    this.run = this.run.bind(this)
  }

  componentDidMount() {
    this.anim = window.requestAnimationFrame(this.run)
  }

  componentWillUnmount() {
    this.props.ctx.clearRect(0,0,this.props.canvas.width,this.props.canvas.height)
    window.cancelAnimationFrame(this.anim)
  }

  run() {
    if (this.props.touch) {
      var {ctx, touch, dims} = this.props
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Babel)
