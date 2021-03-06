import React, { Component } from 'react'
import { connect } from 'react-redux'
import ControlsView from '../components/ControlsView'

class Controls extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleBtnOn = this.handleBtnOn.bind(this)
    this.handleBtnOff = this.handleBtnOff.bind(this)
  }

  handleBtnOn(e) {
    const state = {}
    const key = e.currentTarget.getAttribute('data-keycode')
    state[`on${key}`] = true
    this.setState(state)
    this.props.toggleButtonState(key, true)
    this.props.connection.send(JSON.stringify({
      type: 'input',
      timestamp: Date.now(),
      data: {on: true, keyCode: key, data: this.props.controls[key] || null}
    }))
  }

  handleBtnOff(e) {
    const state = {}
    const key = e.currentTarget.getAttribute('data-keycode')
    state[`on${key}`] = false
    this.setState(state)
    this.props.toggleButtonState(key, false)
    this.props.connection.send(JSON.stringify({
      type: 'input',
      timestamp: Date.now(),
      data: {on: false, keyCode: key, data: this.props.controls[key] || null}
    }))
  }

  render() {
    const { props, state } = this
    return (
      <ControlsView {...props} {...state}
                    handleBtnOn={this.handleBtnOn}
                    handleBtnOff={this.handleBtnOff} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    connection: state.network.connection,
    controls: state.controls,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleButtonState: (key, on) => {
      var button = {}
      button[`on${key}`] = on
      dispatch({
        type: "controls:toggle",
        button: button
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
