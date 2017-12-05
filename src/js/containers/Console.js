import React, { Component } from 'react'
import { connect } from 'react-redux'
import ConsoleView from '../components/ConsoleView'

class Console extends Component {
  render() {
    const { props, state } = this
    return(
      <ConsoleView {...props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    connection: state.network.connection
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Console)
