package main

import (
  "net/http"
  "log"
  "fmt"
  "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}

func main() {
  http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "index.html")
  })

  http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
      log.Println(err)
      return
    }

    for {
      _, p, err := conn.ReadMessage()
      if err != nil {
        return
      }

      msg := string(p)

      fmt.Printf("received: %s\n", msg)
    }
  })

  http.ListenAndServe(":7000", nil)
}
