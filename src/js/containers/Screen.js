import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spawn from './Spawn'
import Eden from './Eden'

class Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {touching: false}
    this.resizeScreen = this.resizeScreen.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d')
    this.dims = this.canvas.getBoundingClientRect()
    window.addEventListener('resize', this.resizeScreen)
    this.resizeScreen()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeScreen)
  }

  resizeScreen() {
    this.dims = this.canvas.getBoundingClientRect()
    return this.props.dispatch({
      type: 'game:resize',
      screenWidth: this.el.clientWidth,
      screenHeight: this.el.clientHeight,
    })
  }

  handleTouchStart(e) {
    this.setState({touching: true})

    let touch = e.nativeEvent.targetTouches[0]
    let pctX = (touch.clientX - this.dims.x) / this.dims.width
    let pctY = (touch.clientY - this.dims.y) / this.dims.height

    console.log("start", pctX, pctY)
    this.props.connection.send(JSON.stringify({
      type: 'input',
      timestamp: Date.now(),
      data: {on: true, keyCode: 'SCREEN', coords: [pctX, pctY]}
    }))
  }

  handleTouchMove(e) {
    let touch = e.nativeEvent.targetTouches[0]
    let pctX = (touch.clientX - this.dims.x) / this.dims.width
    let pctY = (touch.clientY - this.dims.y) / this.dims.height

    if (pctX < 0 || pctX > 1 || pctY < 0 || pctY > 1) {return}

    console.log("move", pctX, pctY)
    this.props.connection.send(JSON.stringify({
      type: 'input',
      timestamp: Date.now(),
      data: {on: true, keyCode: 'PAN', coords: [pctX, pctY]}
    }))
  }

  handleTouchEnd(e) {
    this.setState({touching: false})
    console.log("end", e.nativeEvent)
    this.props.connection.send(JSON.stringify({
      type: 'input',
      timestamp: Date.now(),
      data: {on: false, keyCode: 'SCREEN'}
    }))
  }

  render() {
    const { props, state } = this
    return (
      <div id="Screen" ref={el => this.el = el} className="absolute">
        <canvas width={props.screenWidth}
                height={props.screenHeight}
                ref={(el) => this.canvas = el}
                className="relative scene"
                onTouchStart={state.touching ? null : this.handleTouchStart}
                onTouchMove={state.touching ? this.handleTouchMove : null}
                onTouchEnd={state.touching ? this.handleTouchEnd : null} />
        {
          props.ready ?
            props.scene === 'Spawn' ?
            <Spawn ctx={this.ctx} canvas={this.canvas} /> :
            props.scene === 'Eden' ?
            <Eden ctx={this.ctx} canvas={this.canvas} /> :
            <h2 style={{position: 'absolute', top: 0}}>scene unknown</h2>
          : <h1 style={{position: 'absolute', top: 0}}>no unity</h1>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    connection: state.network.connection,
    screenWidth: state.game.screenWidth,
    screenHeight: state.game.screenHeight,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen)
