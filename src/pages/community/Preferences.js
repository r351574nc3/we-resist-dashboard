import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button, { ButtonGroup } from '@atlaskit/button';
import ContentWrapper from '../../components/ContentWrapper'
import PageTitle from '../../components/PageTitle'
import SectionHeader from '../../components/SectionHeader'
import FieldRange from '@atlaskit/field-range';
import TextField from '@atlaskit/field-text';
import PageHeader from '@atlaskit/page-header';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import EmojiObjectsIcon from '@atlaskit/icon/glyph/emoji/objects';
import {
  Spotlight,
  SpotlightManager,
  SpotlightTarget,
} from '@atlaskit/onboarding';
import Tooltip from '@atlaskit/tooltip';
import selectors from './selectors'
import actions from './actions'

class Preferences extends Component {
  state = {
    onChangeResult: 'Check & Uncheck to trigger onChange',
    upvotePercent: 50,
    downvotePercent: 50,
    threshold: 50,
  };

  upvoteChange = (value) => {
    this.setState({
      upvotePercent: value,
    });
  };

  downvoteChange = (value) => {
    this.setState({
      downvotePercent: value,
    });
  };

  thresholdChange = (value) => {
    this.setState({
      threshold: value,
    });
  };

  headerButtons = (
    <ButtonGroup>
      <Button appearance="primary">Save Voting</Button>
    </ButtonGroup>
  );

  componentDidMount () {
    this.props.preferencesLoaded()
  }

  render () {
    
    return (
      <ContentWrapper>
        <PageTitle>Preferences</PageTitle>
        <hr />
        <PageHeader
          actions={this.headerButtons}
        >Voting (Set your upvote/downvote preferences)
        </PageHeader>
        <Grid layout="fixed">
          <GridColumn medium={8}>
            <div>
            <Grid>
              <GridColumn medium={5}>
                <b>Upvote Percent </b>
                <Tooltip content={this.state.upvotePercent} position='right'>
                  <FieldRange
                      value={this.state.upvotePercent}
                      min={0}
                      max={100}
                      step={1}
                      onChange={this.upvoteChange}
                  />
                </Tooltip>
              </GridColumn>
              <GridColumn medium={5}>
                <b>Upvote Percent</b>
                <Tooltip content={this.state.downvotePercent} position='right'>
                  <FieldRange
                      value={this.state.downvotePercent}
                      min={0}
                      max={100}
                      step={1}
                      onChange={this.downvoteChange}
                  />
                </Tooltip>
              </GridColumn>
              <GridColumn medium={5}>
                <b>Voting Threshold</b>
                <Tooltip content={this.state.threshold} position='right'>
                  <FieldRange
                      value={this.state.threshold}
                      min={0}
                      max={100}
                      step={1}
                      onChange={this.thresholdChange}
                  />            
                </Tooltip>
              </GridColumn>
            </Grid>
            </div>
          </GridColumn>
        </Grid>
        <hr/>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const preferences = selectors.community.selectPreferences(state)
  return { preferences }
}
const mapDispatchToProps = {
  preferencesLoaded: actions.community.preferencesLoaded,
  preferencesChanged: actions.community.preferencesChanged,
}
export default connect(mapStateToProps, mapDispatchToProps)(Preferences)