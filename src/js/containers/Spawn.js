import React, { Component } from 'react'
import { connect } from 'react-redux'

class Spawn extends Component {
  constructor(props) {
    super(props)
    this.run = this.run.bind(this)
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d')
    this.anim = window.requestAnimationFrame(this.run)
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.anim)
  }

  run() {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    this.ctx.fillStyle = 'pink',
    this.ctx.fillRect(10,10,100,100)

    this.anim = window.requestAnimationFrame(this.run)
  }

  render() {
    const { props, state } = this
    return (
      <canvas id="Spawn"
              width={props.screenWidth}
              height={props.screenHeight}
              ref={(el) => this.canvas = el}
              className="relative scene" />
    )
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
