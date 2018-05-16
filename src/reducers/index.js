import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import uiReducer from './ui'
import communityReducer from './community'
import authReducer from './auth'

const rootReducer = combineReducers({
  community: communityReducer,
  auth: authReducer,
  router: routerReducer,
  ui: uiReducer,
})

export default rootReducer