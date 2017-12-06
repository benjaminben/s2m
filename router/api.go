package router

import(
  "log"
  "../keys"
  "net/http"
  "io/ioutil"
  "encoding/json"
  "github.com/julienschmidt/httprouter"
  "strings"
  "github.com/jmoiron/jsonq"
)

func Images(res http.ResponseWriter, req *http.Request, _ httprouter.Params) {
  log.Println("o ya gonna get some pics")
  query := req.URL.Query().Get("q")
  searchUrl := "https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=" + query
  client := &http.Client{}
  imgReq, _ := http.NewRequest("GET", searchUrl, nil)
  imgReq.Header.Set("Ocp-Apim-Subscription-Key", keys.BingImgKey1)
  imgRes, err := client.Do(imgReq)
  if err != nil {
    log.Println("whoops on image get: ", err)
  }
  defer imgRes.Body.Close()

  bodyBytes, err := ioutil.ReadAll(imgRes.Body)
  if err != nil {
    log.Println("IMAGE ERROR: ", err)
  }

  bodyString := string(bodyBytes)
  data := map[string]interface{}{}
  dec := json.NewDecoder(strings.NewReader(bodyString))
  dec.Decode(&data)
  jq := jsonq.NewQuery(data)
  arr, _ := jq.Array("value")

  var imgUrls []string

  for v := range arr {
    jq := jsonq.NewQuery(arr[v])
    str, _ := jq.String("contentUrl")
    imgUrls = append(imgUrls, str)
  }

  js, err := json.Marshal(imgUrls)
  if err != nil {
    http.Error(res, err.Error(), http.StatusInternalServerError)
    return
  }
  res.Write(js)
}
