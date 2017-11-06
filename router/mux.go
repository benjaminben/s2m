package router

import (
  "log"
  "net/http"
  "html/template"
  "github.com/julienschmidt/httprouter"

  "../models"
)

func Make() *httprouter.Router {
  Router := httprouter.New()

  // Router.Get("/", )
  // Router.GET("/ws", SocketHandler)
  // Router.GetFunc("/", http.HandlerFunc(defaultHandler))
  Router.GET("/", defaultHandler)

  return Router
}

func defaultHandler(res http.ResponseWriter, req *http.Request, _ httprouter.Params) {
  room := models.Room{RoomID: "BLuuboobs"}
  t := template.Must(template.ParseFiles("tmpl/web.html"))
  err := t.ExecuteTemplate(res, "web", room)
  if err != nil {
    panic(err)
  }
}

