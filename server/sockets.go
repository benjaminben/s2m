package server

import (
  "../models"

  "net/http"
  "log"
  "github.com/gorilla/websocket"
)

var Clients = make(map[*websocket.Conn]bool) // connected clients
var Broadcast = make(chan models.Message) // broadcast channel
var Upgrader = websocket.Upgrader{}

func HandleConnections(w http.ResponseWriter, r *http.Request) {
  // Upgrade initial GET to a websocket
  conn, err := Upgrader.Upgrade(w, r, nil)
  if err != nil {
    log.Fatal(err)
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

func HandleMessages() {
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
