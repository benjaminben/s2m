package models

type Message struct {
  Type      string    `json:"type"`
  Timestamp string    `json:"timestamp"`
  Coords    []float64 `json:"coords"`
}
