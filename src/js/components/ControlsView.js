import React, { Component } from 'react'

export default (props) => {
  return (
    <div id="Controls">
      <svg id="d-pad" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98.85 98.7">
        <g id="up" data-keycode={0}
                   className={`btn ${props['on0'] ? 'on' : ''}`}
                   onTouchStart={props.handleBtnOn}
                   onTouchEnd={props.handleBtnOff} >
          <rect className="base" x="35.98" width="26.9" height="26.82" />
          <polyline className="icon" points="40.73 16.83 49.81 7.77 58.95 16.78" />
        </g>
        <g id="right" data-keycode={1}
                      className={`btn ${props['on1'] ? 'on' : ''}`}
                      onTouchStart={props.handleBtnOn}
                      onTouchEnd={props.handleBtnOff} >
          <rect className="base" x="71.95" y="35.9" width="26.9" height="26.82" />
          <polyline className="icon" points="82.53 40.74 91.6 49.82 82.58 58.96" />
        </g>
        <g id="down" data-keycode={2}
                     className={`btn ${props['on2'] ? 'on' : ''}`}
                     onTouchStart={props.handleBtnOn}
                     onTouchEnd={props.handleBtnOff} >
          <rect className="base" x="36.02" y="71.88" width="26.9" height="26.82" />
          <polyline className="icon" points="58.95 81.57 49.86 90.64 40.73 81.62" />
        </g>
        <g id="left" data-keycode={3}
                     className={`btn ${props['on3'] ? 'on' : ''}`}
                     onTouchStart={props.handleBtnOn}
                     onTouchEnd={props.handleBtnOff} >
          <rect className="base" y="35.91" width="26.9" height="26.82" />
          <polyline className="icon" points="16.37 58.41 7.3 49.33 16.32 40.19" />
        </g>
      </svg>

      <svg id="ab" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53.65 53.65">
        <g id="A" data-keycode={4}
                  className={`btn ${props['on4'] ? 'on' : ''}`}
                  onTouchStart={props.handleBtnOn}
                  onTouchEnd={props.handleBtnOff} >
          <circle className="base" cx="40.32" cy="13.32" r="13.32" />
          <path className="icon" d="M42,9a1.05,1.05,0,0,1,.76.31,1,1,0,0,1,.32.77v7.08H41.46V13.69H39.81v3.46H38.2V10.07a1,1,0,0,1,.32-.77A1.05,1.05,0,0,1,39.28,9Zm-.53,3.19V10.86a.32.32,0,0,0-.37-.36h-.93a.32.32,0,0,0-.37.36v1.32Z" fill="#474749"/>
        </g>
        <g id="B" data-keycode={5}
                  className={`btn ${props['on5'] ? 'on' : ''}`}
                  onTouchStart={props.handleBtnOn}
                  onTouchEnd={props.handleBtnOff} >
          <circle className="base" cx="13.32" cy="40.32" r="13.32" />
          <path className="icon" d="M11.13,36.1h3.8A1.09,1.09,0,0,1,16,37.18v6a1.09,1.09,0,0,1-1.09,1.08H11.13ZM14.41,38a.32.32,0,0,0-.37-.36h-.93a.32.32,0,0,0-.37.36v1.45H14q.38,0,.38-.36Zm0,3.32a.32.32,0,0,0-.37-.36h-1.3v1.45a.32.32,0,0,0,.37.36H14a.32.32,0,0,0,.37-.36Z" fill="#474749"/>
        </g>
      </svg>
    </div>
  )
}
