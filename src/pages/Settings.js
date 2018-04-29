import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentWrapper from '../components/ContentWrapper'
import PageTitle from '../components/PageTitle'
import SectionHeader from '../components/SectionHeader'

class Settings extends Component {
  render () {
    return (
      <ContentWrapper>
        <PageTitle>Settings</PageTitle>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(Settings)