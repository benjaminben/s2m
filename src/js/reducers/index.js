import { createStore, combineReducers } from 'redux'
import gameReducer from './game'
import sceneReducer from './scene'
import networkReducer from './network'

const master = combineReducers({
  game: gameReducer,
  scene: sceneReducer,
  network: networkReducer,
})

export default createStore(master, {})
