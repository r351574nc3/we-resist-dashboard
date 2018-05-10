import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentWrapper from '../../components/ContentWrapper'
import PageTitle from '../../components/PageTitle'

class Bots extends Component {
  render () {
    return (
      <ContentWrapper>
        <PageTitle>Bots</PageTitle>
        <p>
          Not yet implemented
        </p>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => {

  return {}
}

export default connect(mapStateToProps)(Bots)