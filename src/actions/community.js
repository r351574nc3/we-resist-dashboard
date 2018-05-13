import * as constants from '../constants/community'

export const load_preferences = data => dispatch => {
    const action = {
        type: constants.PREFERENCES_LOAD,
        payload: data
    }
    dispatch(action)
}

export const save_preferences = data => dispatch => {
    const action = {
        type: constants.PREFERENCES_SAVED,
        payload: data
    }
    dispatch(action)
}