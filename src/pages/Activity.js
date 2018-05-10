import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button, { ButtonGroup } from '@atlaskit/button'
import MainSection from '../components/MainSection'
import ContentWrapper from '../components/ContentWrapper'
import PageTitle from '../components/PageTitle'
import Page from '@atlaskit/page'
import Banner from '@atlaskit/banner'
import ErrorIcon from '@atlaskit/icon/glyph/error'

class Activity extends Component {
  static contextTypes = {
    showModal: PropTypes.func,
    addFlag: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func
  }

  render () {
    return (
      <ContentWrapper>
        <PageTitle>Activity</PageTitle>
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

export default connect(mapStateToProps)(Activity)