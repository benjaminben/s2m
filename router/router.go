package router

import (
  "log"
  "net/http"
  "html/template"
  "github.com/julienschmidt/httprouter"
  "github.com/gorilla/websocket"

  "../models"
)

var Rooms = make(map[string]*models.Room)

func Make() *httprouter.Router {
  Router := httprouter.New()

  Router.GET("/ws", SocketHandler)
  // Router.GET("/ws", CreateNamespace)
  Router.GET("/", indexHandler)
  Router.GET("/room/:id", webHandler)
  Router.GET("/room/:id/ws", roomSocketHandler)

  return Router
}

func indexHandler(res http.ResponseWriter, req *http.Request, _ httprouter.Params) {
  t := template.Must(template.ParseFiles("tmpl/index.html"))
  err := t.ExecuteTemplate(res, "index", nil)
  if err != nil {
    panic(err)
  }
}

func webHandler(res http.ResponseWriter, req *http.Request, ps httprouter.Params) {
  room := findOrCreateRoom(ps.ByName("id"))

  t := template.Must(template.ParseFiles("tmpl/web.html"))
  err := t.ExecuteTemplate(res, "web", room)
  if err != nil {
    panic(err)
  }
}

func findOrCreateRoom(id string) *models.Room {
  room, found := Rooms[id]
  if !found {
    log.Println("no room found")
    room = &models.Room{
      ID: id,
      Clients: make(map[*websocket.Conn]bool),
      Broadcast: make(chan models.Message),
    }
    Rooms[room.ID] = room
    // Start listening for incoming messages
    go room.RunSocket()
    log.Println("Rooms length now", len(Rooms))
  }
  return room
}

func roomSocketHandler(res http.ResponseWriter, req *http.Request, ps httprouter.Params) {
  if room, found := Rooms[ps.ByName("id")]; found {
    room.SocketHandler(res, req, ps)
  } else {
    log.Println("no room found at", ps.ByName("id"))
  }
}

