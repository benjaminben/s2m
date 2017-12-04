import React, { Component } from 'react'

export default class Screen extends Component {
  render() {
    const { props, state } = this
    return (
      <div className="screen absolute">
      {
        props.scene === 'Spawn' ?
        <h1>spawn</h1> :
        props.scene === 'Eden' ?
        <h1>eden</h1> : <h2>scene unknown</h2>
      }
      </div>
    )
  }
}
