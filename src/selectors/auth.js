export default {
    selectAuthenticated: state => state.auth.isAuthenticated,
    selectUser: state => state.auth.user
}