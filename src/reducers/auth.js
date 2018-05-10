import constants from '../constants'

const initialState = {
  data: null,
  isLoading: false,
  isAuthenticated: false,
  user: null
}

export default function userUpdate(state = initialState, { type, payload }) {
  switch (type) {
    case constants.auth.AUTH_SUCCESS:
      console.log("Payload ", payload)
      return { data: payload, isLoading: false, isAuthenticated: true, user: payload }
    case constants.auth.AUTH_FAIL:
      console.log("Logout")
      return initialState
    default:
      console.log("Passthru ", state)
      return state
  }
}