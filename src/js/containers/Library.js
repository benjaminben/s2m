import React, { Component } from 'react'
import { connect } from 'react-redux'
import h2h from 'hsl-to-hex'

class Library extends Component {
  constructor(props) {
      super(props)
      this.state = {cta: "Drag For Colors"}
      this.run = this.run.bind(this)
  }

  componentDidMount() {
    this.anim = window.requestAnimationFrame(this.run)
  }

  componentWillUnmount() {
    this.props.ctx.clearRect(0, 0, this.props.screenWidth, this.props.screenHeight)
    window.cancelAnimationFrame(this.anim)
    this.props.setBonusData(null)
  }

  run() {
    var {ctx, touch, dims, screenWidth, screenHeight} = this.props

    if (this.props.controls.onB) {
      ctx.clearRect(0, 0, screenWidth, screenHeight)
    }

    if (this.props.touch) {
      if (this.props.touch.type === "touchmove") {
        const color = this.calculateColor(
          (touch.clientX - dims.x) / screenWidth,
          (touch.clientY - dims.y) / screenHeight
        )
        ctx.fillStyle = color
        this.props.setBonusData({color: color})

        ctx.fillRect(0, 0, screenWidth, screenHeight)
      }
      if (this.props.touch.type === "touchstart") {
        if (this.state.cta) this.setState({cta: null})
      }
    }

    this.anim = window.requestAnimationFrame(this.run)
  }

  calculateColor(pctX, pctY) {
    const h = Math.round(pctX * 295),
          s = 45,
          l = Math.round((pctY + 0.25) * 75)

    return h2h(h,s,l)
  }

  render() {
    const { props, state } = this
    return state.cta ? <h3 className="cta">{state.cta}</h3> : null
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

export default connect(mapStateToProps, mapDispatchToProps)(Library)
