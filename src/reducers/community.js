import * as constants from '../constants/community'
import querystring from 'querystring'
import Cookie from 'js-cookie'

const INITIAL_STATE = {
  preferences: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case constants.MEMBERS_UPDATED:
            return { ...state, members: action.members }
        case constants.PREFERENCES_LOADED:
            return { 
                ...state, 
                preferences: {
                    upvotePercent: parseFloat(action.preferences.upvoteWeight),
                    downvotePercent: parseFloat(action.preferences.downvoteWeight),
                    threshold: parseFloat(action.preferences.threshold),
                    username: action.preferences.username,
                    refresh_token: action.preferences.refreshToken
                }
            }
        case constants.PREFERENCES_SAVING:
            return { ...state, prefs_saving: true, prefs_saved: false }
        case constants.PREFERENCES_SAVED:
            return { ...state, prefs_saving: false, prefs_saved: true, preferences: action.preferences }
        case constants.UPVOTE_CHANGED:
            return { ...state, 
                preferences: {
                    ...state.preferences,
                    upvotePercent: action.value
                } 
            }
        case constants.DOWNVOTE_CHANGED:
            return { ...state, 
                preferences: {
                    ...state.preferences,
                    downvotePercent: action.value
                } 
            }
        case constants.THRESHOLD_CHANGED:
            return { ...state, 
                preferences: {
                    ...state.preferences,
                    threshold: action.value
                } 
            }
        default:
            return state
  }
}