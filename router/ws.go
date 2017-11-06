package router

import (
  "../models"

  "net/http"
  "log"
  "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}
var Clients = make(map[*websocket.Conn]bool) // connected clients
var Broadcast = make(chan models.Message) // broadcast channel

func PrintBloobs() {
  log.Println("bloobs")
}

func SocketHandler(w http.ResponseWriter, r *http.Request) {
  // Upgrade initial GET to a websocket
  conn, err := upgrader.Upgrade(w, r, nil)
    log.Fatal(err)
  if err != nil {
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
