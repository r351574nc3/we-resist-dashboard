import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentWrapper from '../../components/ContentWrapper'
import PageTitle from '../../components/PageTitle'
import SectionHeader from '../../components/SectionHeader'

class Preferences extends Component {
  render () {
    return (
      <ContentWrapper>
        <PageTitle>Preferences</PageTitle>
        <SectionHeader>Voting</SectionHeader>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(Preferences)