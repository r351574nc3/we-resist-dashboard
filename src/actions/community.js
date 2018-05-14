import * as constants from '../constants/community'

export const load_preferences = data => dispatch => {
    const action = {
        type: constants.PREFERENCES_LOADED,
        preferences: data
    }
    dispatch(action)
}

export const save_preferences = data => dispatch => {
    const action = {
        type: constants.PREFERENCES_SAVED,
        preferences: data
    }
    dispatch(action)
}


export const change_upvote = data => dispatch => {
    const action = {
        type: constants.UPVOTE_CHANGED,
        value: data
    }
    dispatch(action)    
}

export const change_downvote = data => dispatch => {
    const action = {
        type: constants.DOWNVOTE_CHANGED,
        value: data
    }
    dispatch(action)    
}

export const change_threshold = data => dispatch => {
    const action = {
        type: constants.THRESHOLD_CHANGED,
        value: data
    }
    dispatch(action)    
}