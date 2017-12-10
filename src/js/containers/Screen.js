import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spawn from './Spawn'
import Eden from './Eden'

class Screen extends Component {
  constructor(props) {
    super(props)
    this.resizeScreen = this.resizeScreen.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d')
    window.addEventListener('resize', this.resizeScreen)
    this.resizeScreen()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeScreen)
  }

  resizeScreen() {
    return this.props.dispatch({
      type: 'game:resize',
      screenWidth: this.el.clientWidth,
      screenHeight: this.el.clientHeight,
    })
  }

  handleTouchStart(e) {
    console.log("start")
  }

  handleTouchMove(e) {
    console.log("move")
  }

  handleTouchEnd(e) {
    console.log("end")
  }

  render() {
    const { props, state } = this
    return (
      <div id="Screen" ref={el => this.el = el} className="absolute">
        <canvas width={props.screenWidth}
                height={props.screenHeight}
                ref={(el) => this.canvas = el}
                className="relative scene"
                onClick={() => console.log("fart")}
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd} />
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
