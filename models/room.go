package models

import (
  "log"
  "net/http"
  "github.com/julienschmidt/httprouter"
  "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}

type Room struct {
  ID        string                   `json:"id"`
  Clients   map[*websocket.Conn]bool
  Broadcast chan Message
}

func (r *Room) PollClients() {
  log.Println("Le Room:", r.ID)
}

func (r *Room) SocketHandler(res http.ResponseWriter, req *http.Request, _ httprouter.Params) {
  // Upgrade initial GET to a websocket
  conn, err := upgrader.Upgrade(res, req, nil)
  if err != nil {
    log.Fatal("whoops", err)
    return
  }

  r.Clients[conn] = true
  log.Println(r.ID, "connected clients now", len(r.Clients))

  for {
    var msg Message

    err = conn.ReadJSON(&msg)
    if err != nil {
      log.Printf("connection error: %v", err)
      break
    }

    r.Broadcast <- msg
  }

  // Close connection when function returns
  defer conn.Close()
}

func (r *Room) RunSocket() {
  for {
    // Grab next message from broadcast channel and...
    msg := <- r.Broadcast
    log.Printf("received: %s", msg)
    // ...send it to every connected client
    for client := range r.Clients {
      err := client.WriteJSON(msg)
      if err != nil {
        log.Printf("broadcast error: %v", err)
        client.Close()
        delete(r.Clients, client)
      }
    }
  }
}
