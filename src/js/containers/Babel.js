import React, { Component } from 'react'
import { connect } from 'react-redux'

class Babel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: 'cats',
      searchOpen: true,
    }
    this.run = this.run.bind(this)
    this.handleQueryInput = this.handleQueryInput.bind(this)
    this.submitQuery = this.submitQuery.bind(this)
  }

  componentWillMount() {
    this.props.setControls({
      A: {
        BABEL: {
          q: this.state.query
        }
      }
    })
  }

  componentDidMount() {
    this.anim = window.requestAnimationFrame(this.run)
  }

  componentWillUnmount() {
    this.props.ctx.clearRect(0,0,this.props.canvas.width,this.props.canvas.height)
    window.cancelAnimationFrame(this.anim)
  }

  handleQueryInput(e) {
    this.props.setControls({
      A: {
        BABEL: {
          q: e.target.value
        }
      }
    })
    this.setState({query: e.target.value})
  }

  run() {
    if (this.props.touch) {
      var {ctx, touch, dims} = this.props
      ctx.fillStyle = 'rgba(40,40,40,1)'
      ctx.fillRect(
        touch.clientX - dims.x,
        touch.clientY - dims.y,
        4, 4
      )
    }

    this.anim = window.requestAnimationFrame(this.run)
  }

  submitQuery() {
    console.log("help")
    // this.props.connection.send(JSON.stringify({
    //   type: 'input',
    //   timestamp: Date.now(),
    //   data: {on: true, keyCode: 'A'}
    // }))
  }

  render() {
    const { props, state } = this
    return (
      state.searchOpen ?
      <div className="babel-form" style={{position: 'absolute', top: 0}}>
        <input onChange={this.handleQueryInput}
               value={state.query} />
        <span>A TO SUBMIT</span>
      </div> : null
    )
  }
}

const mapStateToProps = (state) => {
  return {
    screenWidth: state.game.screenWidth,
    screenHeight: state.game.screenHeight,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setControls: (controller) => {
      dispatch({type: 'controls:set', ctrl:controller})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Babel)
