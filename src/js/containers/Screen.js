import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spawn from './Spawn'
import Eden from './Eden'
import Scene from './Scene'

class Screen extends Component {
  constructor(props) {
    super(props)
    this.resizeScreen = this.resizeScreen.bind(this)
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

  render() {
    const { props, state } = this
    return (
      <div id="Screen" ref={el => this.el = el} className="absolute">
        <canvas width={props.screenWidth}
                height={props.screenHeight}
                ref={(el) => this.canvas = el}
                className="relative scene" />
        {
          props.ready ?
            props.scene === 'Spawn' ?
            <Spawn ctx={this.ctx} /> :
            props.scene === 'Eden' ?
            <Eden ctx={this.ctx} /> : <h2>scene unknown</h2>
          : <h1>no unity</h1>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen)
