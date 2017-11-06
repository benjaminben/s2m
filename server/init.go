package server

import (
  "net/http"
  "log"

  "../router"
)

func Init() {
  r := router.Make()
  // Start listening for incoming messages
  go router.RunSockets()

  log.Println("Party on :7000...")
  log.Fatal(http.ListenAndServe(":7000", r))
}
