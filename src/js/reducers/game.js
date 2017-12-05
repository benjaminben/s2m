const init = {
  ready: false,
  screenWidth: 0,
  screenHeight: 0,
}

export default (state=init, action) => {
  switch (action.type) {
    case 'game:ready':
      return {...state, ready: true}
    case 'game:resize':
      return {
        ...state,
        screenWidth: action.screenWidth,
        screenHeight: action.screenHeight
      }
    default:
      return state
  }
}
