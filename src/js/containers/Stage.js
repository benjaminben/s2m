import React, { Component } from 'react'
import { connect } from 'react-redux'

class Stage extends Component {
  constructor(props) {
    super(props)

    this.awaitUnity = this.awaitUnity.bind(this)
    this.awaitSceneChange = this.awaitSceneChange.bind(this)
  }

  componentWillReceiveProps(props, prevProps) {
    if (props.ws && !prevProps.ws) {
      props.ws.addEventListener("message", this.awaitUnity)
    }
  }

  awaitUnity(e) {
    let d = JSON.parse(e.data)
    console.log(d)
    if (d.type === 'client' && d.data === 'unity') {
      this.props.ws.removeEventListener("message", this.awaitUnity)
      this.props.setReady()

      this.props.ws.addEventListener("message", this.awaitSceneChange)
    }
  }

  awaitSceneChange(e) {
    let d = JSON.parse(e.data)
    if (d.type === 'scene') {
      console.log('new scene:', d.data)
      this.props.setScene(d.data)
    }
  }

  render() {
    const { props } = this

    return(
      <div id="Stage">
      {
        props.ready ?
          props.scene === 'Spawn' ?
          <h1>spawn</h1> :
          props.scene === 'Eden' ?
          <h1>eden</h1> : <h2>scene unknown</h2>
        : <h4>not ready...</h4>
      }

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("mapping...", state.scene)
  return {
    ready: state.game.ready,
    ws: state.network.ws,
    scene: state.scene,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setReady: () => {
      dispatch({type: 'game:ready'})
    },
    setScene: (name) => {
      dispatch({type: 'scene:change', scene: name})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage)
