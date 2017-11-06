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
  // err := http.ListenAndServe(":7000", router.Routes)
  // if err != nil {
  //   log.Fatal("ListenAndServe: ", err)
  //   return
  // }
}
