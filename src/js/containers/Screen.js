import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeWS } from '../init'
import Spawn from './Spawn'
import Eden from './Eden'
import Babel from './Babel'
import Library from './Library'
import Default from './DefaultScene'

class Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      touch: null,
      bonusData: null,
      overlay: false,
    }
    this.resizeScreen = this.resizeScreen.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d')
    this.setState({dims: this.canvas.getBoundingClientRect()})
    window.addEventListener('resize', this.resizeScreen)
    this.resizeScreen()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeScreen)
  }

  componentWillUpdate(nextProps) {
    if (this.props.connection && !nextProps.connection) {
      this.setState({overlay: true})
    }
    if (nextProps.connection && !this.props.connection) {
      this.setState({overlay: false})
    }
  }

  resizeScreen() {
    this.setState({dims: this.canvas.getBoundingClientRect()})
    return this.props.dispatch({
      type: 'game:resize',
      screenWidth: this.el.clientWidth,
      screenHeight: this.el.clientHeight,
    })
  }

  handleTouchStart(e) {
    var touch = e.nativeEvent.targetTouches[0]
    touch.type = e.type
    var pctX = (touch.clientX - this.state.dims.x) / this.state.dims.width
    var pctY = (touch.clientY - this.state.dims.y) / this.state.dims.height

    this.setState({touch: touch})

    var data = {
      type: 'input',
      timestamp: Date.now(),
      data: {
        on: true,
        keyCode: 'SCREEN',
        data: {
          coords: {x: pctX, y: pctY},
          ...this.state.bonusData
        }
      }
    }

    this.props.connection.send(JSON.stringify(data))
  }

  handleTouchMove(e) {
    var touch = e.nativeEvent.targetTouches[0]
    touch.type = e.type
    var pctX = (touch.clientX - this.state.dims.x) / this.state.dims.width
    var pctY = (touch.clientY - this.state.dims.y) / this.state.dims.height

    var data = {
      type: 'input',
      timestamp: Date.now(),
      data: {
        on: true,
        keyCode: 'PAN',
        data: {
          coords: {x: pctX, y: pctY},
          ...this.state.bonusData
        }
      }
    }

    if (pctX < 0 || pctX > 1 || pctY < 0 || pctY > 1) {
      return this.setState({touch: null})
    } this.setState({touch: touch})

    this.props.connection.send(JSON.stringify(data))
  }

  handleTouchEnd(e) {
    this.setState({touch: null})
    this.props.connection.send(JSON.stringify({
      type: 'input',
      timestamp: Date.now(),
      data: {on: false, keyCode: 'SCREEN'}
    }))
  }

  render() {
    const { props, state } = this
    return (
      <div id="Screen" ref={el => this.el = el}
           onTouchStart={state.touch ? null : this.handleTouchStart}
           onTouchMove={state.touch ? this.handleTouchMove : null}
           onTouchEnd={state.touch ? this.handleTouchEnd : null}
           className={`absolute p2p text-center ${(props.scene || '').toLowerCase()}`}>
        <canvas width={props.screenWidth}
                height={props.screenHeight}
                ref={(el) => this.canvas = el}
                className="relative scene" />
        {
          props.ready && state.dims ?
            props.scene === 'Spawn' ?
            <Spawn ctx={this.ctx} canvas={this.canvas} /> :
            props.scene === 'Eden' ?
            <Eden {...state}
                  {...props}
                  ctx={this.ctx}
                  canvas={this.canvas} /> :
            props.scene === 'Babel' ?
            <Babel {...state}
                   {...props}
                   ctx={this.ctx}
                   dims={state.dims}
                   canvas={this.canvas} /> :
            props.scene === 'Library' ?
            <Library {...state}
                     {...props}
                     ctx={this.ctx}
                     dims={state.dims}
                     canvas={this.canvas}
                     setBonusData={(d) => this.setState({bonusData: d})} /> :
            <Default {...state}
                     {...props}
                     ctx={this.ctx}
                     dims={state.dims}
                     canvas={this.canvas} />
          : <h1 style={{position: 'absolute', top: 0}}>no unity</h1>
        }
        {
          state.overlay ?
          <div className="overlay absolute flex justify-center align-center">
            <h2 className="uppercase">Connection Lost :[</h2>
            <span className="underline uppercase"
                  onClick={makeWS}>Reconnect?</span>
          </div> : null
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
