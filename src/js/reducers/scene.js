export default (state={}, action) => {
  switch (action.type) {
    case 'scene:change':
      return action.scene
    default:
      return state
  }
}
