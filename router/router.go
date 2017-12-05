package router

import (
  "log"
  "net/http"
  "encoding/json"
  "html/template"
  "github.com/julienschmidt/httprouter"
  "github.com/gorilla/websocket"

  "../models"
)

var Rooms = make(map[string]*models.Room)

func Make() *httprouter.Router {
  Router := httprouter.New()

  Router.GET("/ws", SocketHandler) // GENERAL / DEBUG

  Router.GET("/", indexHandler)
  Router.GET("/room/:id", webHandler)
  Router.GET("/room/:id/ws", roomSocketHandler)

  Router.GET("/game/:id", gameHandler)

  Router.ServeFiles("/static/*filepath", http.Dir("static/"))
  Router.ServeFiles("/dist/*filepath", http.Dir("dist/"))
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

func gameHandler(res http.ResponseWriter, req *http.Request, ps httprouter.Params) {
  log.Println("unity calling...", ps.ByName("id"))
  room := findOrCreateRoom(ps.ByName("id"))

  // Send the room ID as a thumbs up
  js, err := json.Marshal(room)
  if err != nil {
    http.Error(res, err.Error(), http.StatusInternalServerError)
    return
  }

  res.Header().Set("Content-Type", "application/json")
  res.Write(js)
}

func findOrCreateRoom(id string) (*models.Room) {
  room, found := Rooms[id]
  if !found {
    log.Println("no room found")
    room = &models.Room{
      ID: id,
      Clients: make(map[*websocket.Conn]bool),
      UClients: make(map[*websocket.Conn]bool),
      Broadcast: make(chan models.Envelope),
    }
    Rooms[room.ID] = room
    // Start listening for incoming messages
    go room.RunSocket()
    log.Println("Rooms length now", len(Rooms))
  }
  return room
}

func roomSocketHandler(res http.ResponseWriter, req *http.Request, ps httprouter.Params) {
  log.Println("hello client")
  if room, found := Rooms[ps.ByName("id")]; found {
    room.SocketHandler(res, req, ps)
  } else {
    log.Println("no room found at", ps.ByName("id"))
  }
}
