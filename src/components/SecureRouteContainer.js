import React from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from 'react-router-redux'
import sc2 from 'sc2-sdk';

const api = sc2.Initialize({
    app: 'sylveon',
    callbackURL: 'http://localhost:1234/',
    accessToken: '',
    scope: ['vote', 'comment', 'offline']
  });

class SecureRouteContainer extends React.Component {
    render() {
      const {
        isAuthenticated,
        component: Component,
        ...props
      } = this.props
  
      return (
        <Route
          {...props}
          render={props =>
            isAuthenticated
              ? <Component {...props} />
              : (
              <Redirect to={api.getLoginURL()} />
            )
          }
        />
      )
    }
  }
  
export default connect(state => ({
    isAuthenticated: state.authReducer.isAuthenticated
  }))(PrivateRouteContainer)