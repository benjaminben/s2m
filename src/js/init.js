import store from './reducers'

var ssl = window.location.protocol.match('https')
var wsProtocol = ssl ? "wss" : "ws"

function makeWS() {
  var roomID = document.querySelector("main").getAttribute("data-room")
  var ws     = new WebSocket(wsProtocol + "://" + window.location.host + "/room/" + roomID + "/ws")
  ws.onopen = (e) => { // RACE CONDITION?
    store.dispatch({type: 'ws:open', ws: e.target})
    ws.send(JSON.stringify({type: "client", timestamp: Date.now(), data: {type: "web"}}))
  }
  ws.onclose = (e) => {
    store.dispatch({type: 'ws:close'})
  }
}

makeWS()
window.swapScene = (name) => store.dispatch({type: 'scene:change', scene: name})

export {
  makeWS
}

// var caller = document.getElementById("caller")
// var logger = document.getElementById("logger")
// var map    = document.getElementById("map")
//
// caller.addEventListener("click", function(e) {
//   ws.send(JSON.stringify(new Dispatch(
//     "client",
//     {client: "web"}
//   )))
// })
//
// map.addEventListener("click", function(e) {
//   var mapDims = map.getBoundingClientRect()
//   var x = e.clientX
//   var y = e.clientY
//   var mapX = (x - mapDims.x) / mapDims.width
//   var mapY = (y - mapDims.y) / mapDims.height
//
//   var msg = new Dispatch(
//     "drop",
//     {coords: [mapX, mapY]}
//   )
//   ws.send(JSON.stringify(msg))
// })
//
// ws.addEventListener("message", function(e) {
//   var data = JSON.parse(e.data)
//   logger.innerHTML = data.type + " " + data.timestamp
//   console.log(data)
// })
//
// function Dispatch(type, data) {
//   this.type = type
//   this.timestamp = Date.now()
//   this.data = data
// }







// window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
// window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate
// window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription
//
// var starter = document.getElementById("startRTC")
// var peerConnectionConfig = {'iceServers': [{'url': 'stun:stun.services.mozilla.com'}, {'url': 'stun:stun.l.google.com:19302'}]}
// var peerConnection
// var sendChannel
// var receiveChannel
//
// starter.addEventListener("click", startRTC)
// function startRTC() {
//   starter.removeEventListener("click", startRTC)
//   peerConnection = new RTCPeerConnection(peerConnectionConfig)
//   sendChannel = peerConnection.createDataChannel("sendChannel")
//   console.log(peerConnection, sendChannel)
//   peerConnection.onicecandidate = handleIceCandidate
//   peerConnection.ondatachannel = handleDataChannel
// }
//
// function handleDescription(desc) {
//   console.log("handling sdp")
//   peerConnection.setLocalDescription(
//     desc,
//     function() {
//       ws.send(JSON.stringify(new Dispatch('sdp', desc)))
//     },
//     function(err) {
//       console.log('set description error:', err)
//     }
//   )
// }
//
// function handleIceCandidate(e) {
//   console.log("handling ice")
//   if (e.candidate != null) {
//     ws.send(JSON.stringify(new Dispatch('ice', e.candidate)))
//   }
// }
//
// function handleDataChannel(e) {
//   receiveChannel = e.channel
//   receiveChannel.onmessage = handleRTCData
//   receiveChannel.onopen = function() { console.log("receive open") }
//   receiveChannel.onclose = function() { console.log("receive close") }
// }
//
// function handleRTCData(d) {
//   console.log("got derta:", d)
// }
//
// function createAnswerError(err) {
//   console.error("create answer error:", err)
// }
//
// ws.addEventListener("message", function(e) {
//   var signal = JSON.parse(e.data)
//   switch (signal.type) {
//     case "sdp":
//       console.log("got sdp")
//       peerConnection.setRemoteDescription(new RTCSessionDescription(signal.data), function() {
//         if (signal.data.type == 'offer') {
//           peerConnection.createAnswer(handleDescription, createAnswerError)
//         }
//       })
//       break
//     case "ice":
//       console.log("got ice")
//       peerConnection.addIceCandidate(new RTCIceCandidate(signal.data))
//       break
//   }
// })
