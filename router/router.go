package router

import (
  "net/http"
  "html/template"
  "github.com/julienschmidt/httprouter"

  "../models"
)

func Make() *httprouter.Router {
  Router := httprouter.New()

  Router.GET("/ws", SocketHandler)
  Router.GET("/", indexHandler)
  Router.GET("/room/:id", webHandler)

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
  room := models.Room{RoomID: ps.ByName("id")}
  t := template.Must(template.ParseFiles("tmpl/web.html"))
  err := t.ExecuteTemplate(res, "web", room)
  if err != nil {
    panic(err)
  }
}

