package main

import (
  "net/http"
  "log"
  "github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool) // connected clients
var broadcast = make(chan Message) // broadcast channel
var upgrader = websocket.Upgrader{}

func main() {
  fs := http.FileServer(http.Dir("../public"))
  http.Handle("/", fs)

  http.HandleFunc("/ws", handleConnections)

  // Start listening for incoming messages
  go handleMessages()

  log.Println("Party on :7000...")
  err := http.ListenAndServe(":7000", nil)
  if err != nil {
    log.Fatal("ListenAndServe: ", err)
  }
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
  // Upgrade initial GET to a websocket
  conn, err := upgrader.Upgrade(w, r, nil)
  if err != nil {
    log.Fatal(err)
    return
  }

  clients[conn] = true

  for {
    var msg Message

    err = conn.ReadJSON(&msg)
    if err != nil {
      log.Printf("connection error: %v", err)
      break
    }

    broadcast <- msg
  }

  // Close connection when function returns
  defer conn.Close()
}

func handleMessages() {
  for {
    // Grab next message from broadcast channel and...
    msg := <- broadcast
    log.Printf("received: %s", msg)
    // ...send it to every connected client
    for client := range clients {
      err := client.WriteJSON(msg)
      if err != nil {
        log.Printf("broadcast error: %v", err)
        client.Close()
        delete(clients, client)
      }
    }
  }
}

type Message struct {
  Type      string `json:"type"`
  Timestamp string `json:"timestamp"`
}
