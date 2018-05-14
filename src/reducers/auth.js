import constants from '../constants'
import querystring from 'querystring'

const initialState = {
  data: null,
  isLoading: false,
  isAuthenticated: false,
  user: null,
  preferences: null
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
      return { 
        data: payload, 
        isLoading: false, 
        isAuthenticated: true, 
        user: payload,
        preferences: fetch_preferences(payload)
      }
    case constants.auth.AUTH_FAIL:
      return initialState
    default:
      return state
  }
}