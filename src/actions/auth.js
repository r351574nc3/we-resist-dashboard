import * as constants from '../constants/auth'

export const initiate = data => dispatch => {
    const action = {
        type: constants.AUTH_INITIATED,
        payload: data
    }
    dispatch(action)
}

export const login = data => dispatch => {
    console.log("Logging in ", data)
    const action = {
        type: constants.AUTH_SUCCESS,
        payload: data 
    }
    dispatch(action)
}

export const logout = data => dispatch => {
    console.log("Data ", data)
    const action = {
        type: constants.AUTH_FAIL,
        payload: data
    }
    dispatch(action)
}