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
    this.props.ctx.clearRect(0, 0, this.props.screenWidth, this.props.screenHeight)
    window.cancelAnimationFrame(this.anim)
  }

  handleQueryInput(e) {
    if (e.target.value.match(/[^\w]/g)) {return}
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
    var {ctx, touch, dims, screenWidth, screenHeight} = this.props

    if (this.props.controls.onB) {
      ctx.clearRect(0, 0, screenWidth, screenHeight)
    }

    if (this.props.touch) {
      ctx.fillStyle = 'rgba(40,40,40,1)'
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
      state.searchOpen ?
      <div className="babel-form absolute">
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
    controls: state.controls,
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
