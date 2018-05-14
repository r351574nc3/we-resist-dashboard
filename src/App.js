import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import Cookie from 'js-cookie';
import Flag, { FlagGroup } from '@atlaskit/flag'
import Modal from '@atlaskit/modal-dialog'
import Page from '@atlaskit/page'
import Home from './pages/Home'
import Reports from './pages/tools/Reports'
import Bots from './pages/community/Bots'
import Curation from './pages/community/Curation'
import Members from './pages/community/Members'
import Preferences from './pages/community/Preferences'
import Logout from './pages/profile/Logout'
import Account from './pages/profile/Preferences'
import Activity from './pages/Activity'
import Settings from './pages/Settings'
import Space from './pages/Space'
import Navigation from './components/Navigation'
import selectors from './selectors'
import actions from './actions'
import '@atlaskit/css-reset'
import constants from './constants'
import querystring from "querystring"
import { user, wif, sc2_secret } from './config'


class App extends Component {
  static contextTypes = {
    navOpenState: PropTypes.object,
    children: PropTypes.node
  }

  static propTypes = {
    navOpenState: PropTypes.object,
    location: PropTypes.object,
    onNavResize: PropTypes.func,
    showModal: PropTypes.func,
    isModalOpen: PropTypes.bool,
    flags: PropTypes.array,
    deleteFlag: PropTypes.func
  }

  hideModal = () => {
    this.props.showModal(false)
  }

  onFlagDismissed = (dismissedFlagId) => {
    this.props.deleteFlag(dismissedFlagId)
  }

  componentDidMount () {
    // this is a good place to fill the Redux store with some data needed by the whole application
    const qs = this.props.location.search && this.props.location.search.startsWith("?") ? this.props.location.search.substring(1) : this.props.location.search
    const query = querystring.parse(qs)
    const expires_in = parseInt(query.expires_in)

    const sc2_token = Cookie.get("sc2_token") ? JSON.parse(Cookie.get("sc2_token")) : undefined
    if (sc2_token) {
      this.props.login(sc2_token)
    }
    else if (query.access_token) {
      const token = {
        access_token: query.access_token,
        username: query.username,
        expires_in: query.expires_in
      }
      Cookie.set('sc2_token', token, { expires: 1000 * expires_in, path: '' });
      this.props.login(token)
    }
    else if (query.code) {
      this.props.initiateAuth()
      const steemconnect_body = new FormData()
      steemconnect_body.append('json', 
        JSON.stringify({
          response_type: "refresh",
          code: query.code,
          client_id: "sylveon",
          client_secret: sc2_secret,
          scope: "vote,comment,offline"
        })
      )
      fetch("https://steemconnect.com/api/oauth2/token",
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({
            response_type: "refresh",
            code: query.code,
            client_id: "sylveon",
            client_secret: sc2_secret,
            scope: "vote,comment,offline"
          })
        })
        .then((response) => response.json())
        .then((token) => {
          if (!token || !token.error) {
            Cookie.set('sc2_token', token, { expires: 1000 * token.expires_in, path: '' });
            this.props.login(token)
          }
        })
        .catch((error) => {
          console.log("Error ", error)
        })
    }
  }

  render () {
    return (
      <div>
        <Page
          navigationWidth={this.context.navOpenState.width}
          navigation={<Navigation location={this.props.location} />}
        >
          <Route exact path='/' component={Home} />
          <Route path='/tools/reports' component={Reports} />
          <Route path='/community/bots' component={Bots} />
          <Route path='/community/curation' component={Curation} />
          <Route path='/community/members' component={Members} />
          <Route path='/community/preferences' component={Preferences} />
          <Route path='/profile/preferences' component={Account} />
          <Route path='/Logout' component={Logout} />
          <Route path='/Settings' component={Settings} />
          <Route path='/Activity' component={Activity} />
          <Route path='/Work' component={Space} />
        </Page>
        <div>
          <FlagGroup onDismissed={this.onFlagDismissed}>
            {
              this.props.flags.map(flag => (
                <Flag
                  id={flag.id}
                  key={flag.id}
                  title={flag.title}
                  description={flag.description}
                />
              ))
            }
          </FlagGroup>
          {
            this.props.isModalOpen && (
              <Modal
                heading='Candy bar'
                actions={[{ text: 'Exit candy bar', onClick: this.hideModal }]}
                onClose={this.hideModal}
              >
                <p style={{ textAlign: 'center' }}>
                  <img src='http://i.giphy.com/yidUztgRB2w2gtDwL6.gif' alt='Moar cupcakes' />
                </p>
              </Modal>
            )
          }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  showModal: actions.uiOperations.showModal,
  deleteFlag: actions.uiOperations.deleteFlag,
  initiateAuth: actions.auth.initiate,
  login: actions.auth.login,
  logout: actions.auth.logout
}

const mapStateToProps = (state) => {
  const isModalOpen = selectors.ui.selectIsModalOpen(state)
  const flags = selectors.ui.selectFlags(state)
  return { isModalOpen, flags }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
