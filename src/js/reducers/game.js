export default (state={ready: false}, action) => {
  switch (action.type) {
    case 'game:ready':
      return {...state, ready: true}
    default:
      return state
  }
}
