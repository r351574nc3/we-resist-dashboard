import constants from '../constants/community'
import querystring from 'querystring'

const initialState = {
  preferences: null
}

export default function preferencesChanged(state = initialState, action) {
  switch (action.type) {
    case constants.PREFERENCES_LOADED:
        return { ...state, preferences: action.preferences }
    case constants.PREFERENCES_SAVED:
        return { ...state, preferences: action.preferences }
    default:
      return state
  }
}