package models

type Envelope struct {
  Type      string      `json:"type"`
  Timestamp int64       `json:"timestamp"`
  Data      interface{} `json:"data"`
}

type Client struct {
  Client string `json:"client"`
}

type Drop struct {
  Coords []float64 `json:"coords"`
}

type Frame struct {
  Bytes []byte `json:"bytes"`
}

type Scene struct {
  Name string `json:"name"`
}
