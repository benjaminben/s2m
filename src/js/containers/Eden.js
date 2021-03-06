import React, { Component } from 'react'
import { connect } from 'react-redux'

class Eden extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropText: "Dropped Apple",
    }
    this.run = this.run.bind(this)
  }

  componentDidMount() {
    this.anim = window.requestAnimationFrame(this.run)

    var img = document.createElement('img')
    img.onload = () => {
      let r = img.height / img.width
      let newWidth = this.props.screenWidth / 3
      let newHeight = newWidth * r
      this.props.ctx.drawImage(
        img,
        this.props.screenWidth / 2 - newWidth / 2,
        this.props.screenHeight / 2 - newHeight / 2,
        newWidth,
        newHeight
      )
      this.hand = true
    }
    img.src = '/dist/masterhand.png'
  }

  componentWillUnmount() {
    this.props.ctx.clearRect(0,0,this.props.canvas.width,this.props.canvas.height)
    window.cancelAnimationFrame(this.anim)
  }

  componentWillUpdate(nextProps) {
    if (!this.props.controls.onA && nextProps.controls.onA) {
      var el = document.createElement('div')
      this.scene.appendChild(el)
      el.textContent = this.state.dropText
      el.className="drop-text"
      // window.clearTimeout(this.dropTextTimeout)
      // this.setState({dropText: "Dropped Apple"})
      window.setTimeout(() => {
        this.scene.removeChild(el)
      }, 666)
    }
  }

  run() {
    var {ctx, touch, dims, screenWidth, screenHeight} = this.props

    if (this.props.controls.onB) {
      ctx.clearRect(0, 0, screenWidth, screenHeight)
    }

    if (this.props.touch) {
      if (this.hand) {
        ctx.clearRect(0,0,screenWidth,screenHeight)
        this.hand = false
      }
      ctx.fillStyle = 'rgb(40,40,40)'
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
    return (
      <div className="absolute inner" ref={(el) => this.scene = el}>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Eden)
