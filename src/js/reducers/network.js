export default (state={}, action) => {
  switch (action.type) {
    case 'ws:open':
      const ws = action.ws
      // ws.onmessage = e => console.log(e.data)
      return {...state, connection: ws}
    case 'ws:close':
      return {...state, connection: null}
    default:
      return state
  }
}
