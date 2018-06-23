export default {
    selectAuthenticated: state => state.auth.isAuthenticated,
    selectAdmin: state => state.auth.isAdministrator,
    selectUser: state => state.auth.user
}