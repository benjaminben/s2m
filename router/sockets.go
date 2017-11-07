package router

import (
  "../models"

  "log"
  "fmt"
  "net/http"
  "encoding/json"
  "github.com/julienschmidt/httprouter"
  "github.com/gorilla/websocket"
)

var Upgrader = websocket.Upgrader{}
var Clients = make(map[*websocket.Conn]bool) // connected clients
var Broadcast = make(chan models.Envelope) // broadcast channel


func CreateNamespace(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
  fmt.Printf("Broadcast: (%v, %T)\n", Broadcast, Broadcast)
  return
}

func SocketHandler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
  // Upgrade initial GET to a websocket
  conn, err := Upgrader.Upgrade(w, r, nil)
  if err != nil {
    log.Fatal("whoops", err)
    return
  }

  Clients[conn] = true
  log.Println("clients", len(Clients))

  for {
    var msg json.RawMessage
    env := models.Envelope{
      Data: &msg,
    }

    // if err := json.Unmarshal([]byte(input), &env); err != nil {
    //   log.Fatal(err)
    //   break
    // }

    err = conn.ReadJSON(&env)
    if err != nil {
      log.Printf("connection error: %v", err)
      break
    }

    Broadcast <- env
  }

  // Close connection when function returns
  defer conn.Close()
}

func RunSockets() {
  for {
    // Grab next message from broadcast channel and...
    env := <- Broadcast
    log.Printf("received: %s", env)
    // ...send it to every connected client
    for client := range Clients {
      err := client.WriteJSON(env)
      if err != nil {
        log.Printf("broadcast error: %v", err)
        client.Close()
        delete(Clients, client)
      }
    }
  }
}
