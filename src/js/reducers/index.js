import { createStore, combineReducers } from 'redux'
import gameReducer from './game'
import sceneReducer from './scene'
import networkReducer from './network'
import controlsReducer from './controls'

const master = combineReducers({
  game: gameReducer,
  scene: sceneReducer,
  network: networkReducer,
  controls: controlsReducer,
})

export default createStore(master, {})
