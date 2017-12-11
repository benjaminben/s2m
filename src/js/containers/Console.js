import React, { Component } from 'react'
import { connect } from 'react-redux'
import ConsoleView from '../components/ConsoleView'

const requestFullScreen = document.body.webkitRequestFullScreen ||
                          document.body.mozRequestFullScreen ?
  (el) => {
    if (el.webkitRequestFullScreen) {
      return el.webkitRequestFullScreen()
    } else if (el.mozRequestFullScreen) {
      return el.mozRequestFullScreen()
    }
  } : null

class Stage extends Component {
  constructor(props) {
    super(props)

    this.awaitUnityConnection = this.awaitUnityConnection.bind(this)
    this.awaitSceneChange = this.awaitSceneChange.bind(this)
  }

  componentWillReceiveProps(props, prevProps) {
    if (props.connection && !prevProps.connection) {
      props.connection.addEventListener("message", this.awaitUnityConnection)
    }
  }

  awaitUnityConnection(e) {
    let d = JSON.parse(e.data)
    if (d.type === 'client' && d.data.type === 'unity' && d.data.open) {
      this.props.connection.removeEventListener("message", this.awaitUnityConnection)
      this.props.setReady(true)

      this.props.connection.addEventListener("message", this.awaitSceneChange)
    }
  }

  awaitUnityDisconnection(e) {
    let d = JSON.parse(e.data)
    if (d.type === 'client' && d.data.type === 'unity' && !d.data.open) {
      this.props.connection.removeEventListener("message", this.awaitUnityDisconnection)
      this.props.setReady(false)
    }
  }

  awaitSceneChange(e) {
    let d = JSON.parse(e.data)
    if (d.type === 'scene') {
      console.log('new scene:', d.data.name)
      this.props.setScene(d.data.name)
    }
  }

  render() {
    const { props, state } = this

    return(
      <ConsoleView {...props} {...state}
                   fullScreen={
                     requestFullScreen ? (el) => requestFullScreen(el) : null
                   } />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    scene: state.scene,
    ready: state.game.ready,
    scene: "Babel",
    ready: true, // for dev purposes...
    connection: state.network.connection,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setReady: (f) => {
      dispatch({type: 'game:ready', payload: f})
    },
    setScene: (name) => {
      dispatch({type: 'scene:change', scene: name})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage)
