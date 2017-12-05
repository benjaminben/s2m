package models

type Envelope struct {
  Type      string      `json:"type"`
  Timestamp int64       `json:"timestamp"`
  Data      interface{} `json:"data"`
}

type Client struct {
  Type   string `json:"type"`
  Open   bool   `json:"open"`
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

type Input struct {
  On      bool   `json:on`
  KeyCode string `json:"KeyCode"`
}
