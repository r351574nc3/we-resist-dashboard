import * as constants from '../constants/auth'


export const login = data => dispatch => {
    const action = {
        type: constants.AUTH_SUCCESS,
        payload: data 
    }
    dispatch(action)
}

export const logout = data => dispatch => {
    const action = {
        type: constants.AUTH_FAIL,
        payload: data
    }
    dispatch(action)
}