import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import uiReducer from './ui'
import authReducer from './auth'
import communityReducerr from './community'

const rootReducer = combineReducers({
  auth: authReducer,
  community: communityReducer,
  router: routerReducer,
  ui: uiReducer
})

export default rootReducer