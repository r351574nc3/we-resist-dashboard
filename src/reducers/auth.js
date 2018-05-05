import constants from '../constants'

const initialState = {
  data: null,
  isLoading: false,
  isAuthenticated: false
}

export default function userUpdate(state = initialState, { type, payload }) {
  switch (type) {
    case constants.auth.AUTH_SUCCESS:
      return { data: payload, isLoading: false, isAuthenticated: true }
    case constants.auth.AUTH_FAIL:
      return initialState
    default:
      return state
  }
}