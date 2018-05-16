import * as constants from '../constants/community'

export const update_members = data => dispatch => {
    const action = {
        type: constants.MEMBERS_UPDATED,
        members: data
    }
    dispatch(action)
}

export const load_preferences = data => dispatch => {
    const action = {
        type: constants.PREFERENCES_LOADED,
        preferences: data
    }
    dispatch(action)
}

export const start_saving = data => dispatch => {
    const action = {
        type: constants.PREFERENCES_SAVING
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