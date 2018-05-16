import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button, { ButtonGroup } from '@atlaskit/button';
import ContentWrapper from '../../components/ContentWrapper'
import Cookie from 'js-cookie'
import PageTitle from '../../components/PageTitle'
import SectionHeader from '../../components/SectionHeader'
import FieldRange from '@atlaskit/field-range';
import TextField from '@atlaskit/field-text';
import PageHeader from '@atlaskit/page-header';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import Spinner from '@atlaskit/spinner';
import EmojiObjectsIcon from '@atlaskit/icon/glyph/emoji/objects';
import {
  Spotlight,
  SpotlightManager,
  SpotlightTarget,
} from '@atlaskit/onboarding';
import Tooltip from '@atlaskit/tooltip';
import selectors from '../../selectors'
import actions from '../../actions'
import querystring from 'querystring'

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

  isPreferencesSaved = () => {
    return this.props.prefs_saved 
  }

  createHeaderButtons = () => {
    if (this.props.prefs_saving) {
      return (
        <ButtonGroup>
          <Button appearance="primary"
              isDisabled
              iconAfter={<Spinner />}
          >Save Voting</Button>
        </ButtonGroup>
      );
  
    }

    return (
      <ButtonGroup>
        <Button appearance="primary" 
            onClick={() => {
                this.props.start_saving()
                this.save_preferences(this.props.preferences)
                  .then((results) => {
                    this.props.save_preferences(this.props.preferences)
                  })
              }
            }>Save Voting</Button>
      </ButtonGroup>
    );
  }

  fetch_preferences(user) {
    if (!user || !user.username) {
      return Promise.reject("Not logged in")
    }
    const username = user.username
    const qs = querystring.stringify(user)
  
    const preferences_url = '/@' + username + '/preferences?' + qs
    return fetch(preferences_url)
      .then((response) => response.json())
  }
  
  get_access_token() {
    return Cookie.get('sc2_token') ? JSON.parse(Cookie.get('sc2_token')).access_token : undefined
  }

  save_preferences(preferences) {
    const body = JSON.stringify({ ...preferences, access_token: this.get_access_token() })

    if (!preferences || !preferences.username) {
        return Promise.reject("Not logged in")
    }

    const username = preferences.username
    const preferences_url = '/@' + username + '/preferences'

    return fetch(preferences_url,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: body
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Response data ", data)
            return data
        })
  }

  componentDidMount () {
    const user = Cookie.get('sc2_token') ? JSON.parse(Cookie.get('sc2_token')) : undefined

    this.fetch_preferences(user)
      .then((results) => {
        this.props.load_preferences(results)
      })
      .catch((exception) => {
        // user isn't logged in
      })
  }

  render () {
    if (this.props.preferences) {
      return (
        <ContentWrapper>
          <PageTitle>Preferences</PageTitle>
          <hr />
          <PageHeader
            actions={this.createHeaderButtons()}
          >Voting (Set your upvote/downvote preferences)
          </PageHeader>
          <Grid layout="fixed">
            <GridColumn medium={8}>
              <div>
              <Grid>
                <GridColumn medium={5}>
                  <b>Upvote Percent </b>
                  <Tooltip content={this.props.preferences.upvotePercent} position='right'>
                    <FieldRange
                        value={this.props.preferences.upvotePercent}
                        min={0}
                        max={100}
                        step={1}
                        onChange={this.props.upvoteChanged}
                    />
                  </Tooltip>
                </GridColumn>
                <GridColumn medium={5}>
                  <b>Upvote Percent</b>
                  <Tooltip content={this.props.preferences.downvotePercent} position='right'>
                    <FieldRange
                        value={this.props.preferences.downvotePercent}
                        min={0}
                        max={100}
                        step={1}
                        onChange={this.props.downvoteChanged}
                    />
                  </Tooltip>
                </GridColumn>
                <GridColumn medium={5}>
                  <b>Voting Threshold</b>
                  <Tooltip content={this.props.preferences.threshold} position='right'>
                    <FieldRange
                        value={this.props.preferences.threshold}
                        min={0}
                        max={100}
                        step={1}
                        onChange={this.props.thresholdChanged}
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
    else {
      return (
        <ContentWrapper>
          <PageTitle>Preferences</PageTitle>
          <hr />
          <PageHeader
            actions={this.headerButtons}
          >Voting (Set your upvote/downvote preferences)
          </PageHeader>
          <p>
            <center>
            <Spinner size="large" />
            </center>
          </p>
        </ContentWrapper>
      )      
    }
  }
}

const mapStateToProps = (state) => {
  const preferences = selectors.community.selectPreferences(state)
  const prefs_saved = selectors.community.selectPrefsSaved(state)
  const prefs_saving = selectors.community.selectPrefsSaving(state)
  return { preferences, prefs_saved, prefs_saving }
}
const mapDispatchToProps = {
  start_saving: actions.community.start_saving,
  load_preferences: actions.community.load_preferences,
  save_preferences: actions.community.save_preferences,
  upvoteChanged: actions.community.change_upvote,
  downvoteChanged: actions.community.change_downvote,
  thresholdChanged: actions.community.change_threshold
}
export default connect(mapStateToProps, mapDispatchToProps)(Preferences)