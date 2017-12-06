package router

import(
  "log"
  "../keys"
  "io/ioutil"
  "net/http"
  "github.com/julienschmidt/httprouter"
)

func Images(res http.ResponseWriter, req *http.Request, _ httprouter.Params) {
  log.Println("o ya gonna get some pics")

  searchUrl := "https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=cats"

  client := &http.Client{}
  imgReq, _ := http.NewRequest("GET", searchUrl, nil)
  imgReq.Header.Set("Ocp-Apim-Subscription-Key", keys.BingImgKey1)
  imgRes, err := client.Do(imgReq)
  if err != nil {
    log.Println("whoops on image get")
  }
  defer imgRes.Body.Close()

  bodyBytes, err := ioutil.ReadAll(imgRes.Body)
  if err != nil {
      panic(err)
  }

  bodyString := string(bodyBytes)
  log.Println(bodyString)
}
