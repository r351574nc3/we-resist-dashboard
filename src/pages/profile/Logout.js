import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cookie from 'js-cookie';
import ContentWrapper from '../../components/ContentWrapper'
import PageTitle from '../../components/PageTitle'
import SectionHeader from '../../components/SectionHeader'
import actions from "../../actions";
import selectors from "../../selectors";
import querystring from 'querystring';

class Logout extends Component {
  render () {
    return (
      <ContentWrapper>
        <PageTitle>Logged Out Successful</PageTitle>
      </ContentWrapper>
    )
  }

  componentDidMount () {
    Cookie.remove('sc2_token')
    this.props.logout()
  }
}

const mapDispatchToProps = {
  logout: actions.auth.logout
}

const mapStateToProps = (state) => {
  const isAuthenticated = selectors.auth.selectAuthenticated(state)
  return { isAuthenticated }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout)