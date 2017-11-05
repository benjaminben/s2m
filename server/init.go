package server

import (
  "net/http"
  "log"
)

func Init() {
  fs := http.FileServer(http.Dir("./static"))
  http.Handle("/", fs)

  http.HandleFunc("/ws", HandleConnections)

  // Start listening for incoming messages
  go HandleMessages()

  log.Println("Party on :7000...")
  err := http.ListenAndServe(":7000", nil)
  if err != nil {
    log.Fatal("ListenAndServe: ", err)
  }
}
