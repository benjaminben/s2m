package models

import (
  "log"
  "net/http"
  "encoding/json"
  "github.com/julienschmidt/httprouter"
  "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}

type Room struct {
  ID        string                   `json:"id"`
  Clients   map[*websocket.Conn]bool `json:"-"`
  Broadcast chan Envelope            `json:"-"`
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
    var msg json.RawMessage
    env := Envelope{
      Data: &msg,
    }

    err = conn.ReadJSON(&env)
    if err != nil {
      log.Println("connection error: %v", err)
      break
    }

    switch env.Type {
    case "client":
      var c Client
      if err := json.Unmarshal(msg, &c); err != nil {
        log.Println("Error reading client:", err)
      }
    case "drop":
      var d Drop
      if err := json.Unmarshal(msg, &d); err != nil {
        log.Println("Error reading drop:", err)
      }
      var coords []float64 = d.Coords
      log.Println("hella coords:", coords)
    case "sdp":
      log.Println("handling sdp")
    case "ice":
      log.Println("handling ice")
    default:
      log.Println("Unknown message type: %q", env.Type)
      break
    }

    r.Broadcast <- env
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
