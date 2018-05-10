import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from '@atlaskit/avatar'
//import ContentWrapper from '../components/ContentWrapper'
import PageTitle from '../../components/PageTitle'
import Button from '@atlaskit/button'
import Page, { Grid, GridColumn } from '@atlaskit/page'
import styled from 'styled-components'

const ComponentTitle = styled.h2`
  margin-bottom: 1em;
  border-bottom: 1px solid lightgrey;
`

class Reports extends Component {
  render () {
    return (
      <ContentWrapper>
        <Page>
          <PageTitle>Reports</PageTitle>
          <ComponentTitle>Available</ComponentTitle>
        </Page>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => {

  return {}
}

export default connect(mapStateToProps)(Reports)