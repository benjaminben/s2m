package router

import (
  "../models"

  "net/http"
  "log"
  "github.com/julienschmidt/httprouter"
  "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}
var Clients = make(map[*websocket.Conn]bool) // connected clients
var Broadcast = make(chan models.Message) // broadcast channel

func SocketHandler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
  // Upgrade initial GET to a websocket
  conn, err := upgrader.Upgrade(w, r, nil)
  if err != nil {
    log.Fatal("whoops", err)
    return
  }

  Clients[conn] = true

  for {
    var msg models.Message

    err = conn.ReadJSON(&msg)
    if err != nil {
      log.Printf("connection error: %v", err)
      break
    }

    Broadcast <- msg
  }

  // Close connection when function returns
  defer conn.Close()
}

func RunSockets() {
  for {
    // Grab next message from broadcast channel and...
    msg := <- Broadcast
    log.Printf("received: %s", msg)
    // ...send it to every connected client
    for client := range Clients {
      err := client.WriteJSON(msg)
      if err != nil {
        log.Printf("broadcast error: %v", err)
        client.Close()
        delete(Clients, client)
      }
    }
  }
}
