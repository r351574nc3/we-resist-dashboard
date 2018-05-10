import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import uiReducer from './ui'
import authReducer from './auth'

const rootReducer = combineReducers({
  auth: authReducer,
  router: routerReducer,
  ui: uiReducer
})

export default rootReducer