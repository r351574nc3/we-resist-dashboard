import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentWrapper from '../../components/ContentWrapper'
import PageTitle from '../../components/PageTitle'
import TextField from '@atlaskit/field-text'
import PageHeader from '@atlaskit/page-header'


const actionsContent = (
  <TextField autoFocus label="filter" />
);


class Bots extends Component {
  render () {
    return (
      <ContentWrapper>
        <PageTitle>Bots</PageTitle>
        <PageHeader
          actions={actionsContent}
        >Activity</PageHeader>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => {

  return {}
}

export default connect(mapStateToProps)(Bots)