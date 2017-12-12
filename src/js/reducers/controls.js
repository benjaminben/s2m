const init = {}
export default (state=init, action) => {
  switch(action.type) {
    case "controls:set":
      return {...state, ...action.ctrl}
    case "controls:toggle":
      return {...state, ...action.button}
    default:
      return state
  }
}
