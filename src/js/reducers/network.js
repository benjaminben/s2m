export default (state={}, action) => {
  switch (action.type) {
    case 'ws:open':
      const ws = action.ws
      // ws.onmessage = e => console.log(e.data)
      return {...state, ws: ws}
    case 'ws:close':
      return {...state, ws: null}
    default:
      return state
  }
}
