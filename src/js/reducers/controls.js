const init = {}
export default (state=init, action) => {
  switch(action.type) {
    case "controls:set":
      return {...state, ...action.ctrl}
    default:
      return state
  }
}
