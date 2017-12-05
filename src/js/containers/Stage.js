import React, { Component } from 'react'
import { connect } from 'react-redux'
import Console from './Console'

class Stage extends Component {
  constructor(props) {
    super(props)

    this.awaitUnity = this.awaitUnity.bind(this)
    this.awaitSceneChange = this.awaitSceneChange.bind(this)
  }

  componentWillReceiveProps(props, prevProps) {
    if (props.connection && !prevProps.connection) {
      props.connection.addEventListener("message", this.awaitUnity)
    }
  }

  awaitUnity(e) {
    let d = JSON.parse(e.data)
    console.log(d)
    if (d.type === 'client' && d.data === 'unity') {
      this.props.connection.removeEventListener("message", this.awaitUnity)
      this.props.setReady()

      this.props.connection.addEventListener("message", this.awaitSceneChange)
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
        <Console />
      }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("mapping...", state.scene)
  return {
    scene: state.scene,
    scene: "Spawn",
    ready: state.game.ready,
    connection: state.network.connection,
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
