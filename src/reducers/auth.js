import constants from '../constants'
import querystring from 'querystring'

const initialState = {
  data: null,
  isLoading: false,
  isAuthenticated: false,
  user: null,
  preferences: null,
  role: null
}

function fetch_preferences(user) {
  const username = user.username
  if (!username) {
    return null
  }

  const qs = querystring.stringify(user)

  const preferences_url = '/@' + username + '/preferences?' + qs
  return fetch(preferences_url)
    .then((response) => response.json())
}
  
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.auth.AUTH_INITIATED:
      return state
    case constants.auth.AUTH_SUCCESS:
      return { ...state, isAuthenticated: true, data: payload, user: payload, preferences: fetch_preferences(payload) }
    case constants.auth.ROLE_ASSIGNED:
      return { ...state, isAdministrator: true }
    case constants.auth.AUTH_FAIL:
      return initialState
    default:
      return state
  }
}