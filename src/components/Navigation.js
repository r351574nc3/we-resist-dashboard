import React, { Component } from 'react';
import AddIcon from '@atlaskit/icon/glyph/add';
import AddonIcon from '@atlaskit/icon/glyph/addon';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian'
import Avatar from "@atlaskit/avatar";
import Button, { ButtonGroup } from '@atlaskit/button';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import CodeIcon from '@atlaskit/icon/glyph/code';
import ConfluenceIcon from '@atlaskit/icon/glyph/confluence';
import { ConfluenceWordmark } from '@atlaskit/logo';
import { connect } from 'react-redux'
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import DiscoverIcon from '@atlaskit/icon/glyph/discover';
import EditorAlignLeftIcon from '@atlaskit/icon/glyph/editor/align-left';
import EditorFeedbackIcon from '@atlaskit/icon/glyph/editor/feedback';
import FolderIcon from '@atlaskit/icon/glyph/folder';
import JiraLabsIcon from '@atlaskit/icon/glyph/jira/labs';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import PeopleIcon from '@atlaskit/icon/glyph/people';
import PreferencesIcon from '@atlaskit/icon/glyph/preferences';
import SearchIcon from '@atlaskit/icon/glyph/search';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import Tooltip from '@atlaskit/tooltip';
import TrayIcon from '@atlaskit/icon/glyph/tray';
import WorldIcon from '@atlaskit/icon/glyph/world';
import QuestionIcon from '@atlaskit/icon/glyph/question';
import { AkSearch } from '@atlaskit/quick-search';
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled';
import SteemProfile from '../components/SteemProfile'
import sc2 from 'sc2-sdk';
import selectors from '../selectors'


import SecondaryActions from '../components/SecondaryActions';
import NavigationBase, {
  AkContainerLogo,
  AkContainerTitle,
  AkContainerNavigationNested,
  AkCreateDrawer,
  AkNavigationItemGroup,
  AkNavigationItem,
  AkSearchDrawer,
  presetThemes,
} from '@atlaskit/navigation';
import atlaskitLogo from '../images/atlaskit.png'

const api = sc2.Initialize({
  app: 'sylveon',
  callbackURL: 'http://localhost:1234/',
  accessToken: '',
  scope: ['vote', 'comment', 'offline']
});

const BackIcon = (
  <Tooltip position="right" content="Back">
    <ArrowLeftIcon label="Back icon" size="medium" />
  </Tooltip>
);

const ContainerHeaderComponent = ({
  stackLength,
  goBackHome,
}) => (
  <div>
      <AkContainerTitle
              href='https://github.com/r351574nc3/we-resist-dashboard'
              icon={
                <img alt='atlaskit logo' src={atlaskitLogo} />
              }
              text='We Resist Dashboard '
            />
    {stackLength > 1 ? (
      <AkNavigationItem
        icon={<ArrowLeftIcon label="Back icon" />}
        onClick={() => goBackHome()}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            goBackHome();
          }
        }}
        text="Back"
      />
    ) : null}
  </div>
);

const GlobalCreateIcon = ({ openDrawer }) => (
  <Tooltip position="right" content="Create">
    <AddIcon
      label="Create icon"
      secondaryColor="inherit"
      size="medium"
      onClick={() => openDrawer('create')}
    />
  </Tooltip>
);

const GlobalSearchIcon = ({ openDrawer }) => (
  <Tooltip position="right" content="Search">
    <SearchIcon
      label="Search icon"
      secondaryColor="inherit"
      size="medium"
      onClick={() => openDrawer('search')}
    />
  </Tooltip>
);

class Navigation extends Component {

  secured_stack =  [ [
    <AkNavigationItem
      text="Home"
      key="Home"
      icon={<HomeFilledIcon label="Home icon" size="medium" />}
      isSelected={this.props.location.pathname === "/"}
      href="/"
    />,
    <AkNavigationItem
      text="Activity"
      key="Activity"
      icon={<DiscoverIcon label="Activity icon" size="medium" />}
      isSelected={this.props.location.pathname === "/Activity"}
      href="/Activity"
    />,
    <AkNavigationItem
      text="Your work"
      key="Your Work"
      icon={<TrayIcon label="Your work icon" size="medium" />}
      isSelected={this.props.location.pathname === "/Work"}
      href="/Work"
    />,
    <AkNavigationItem
      action={
        <Button
          appearance="subtle"
          iconBefore={<ChevronRightIcon label="add" size="medium" />}
          spacing="none"
        />
      }
      text="Community"
      key="Community"
      onClick={() => this.communityNestedNav()}
      icon={<PeopleGroupIcon label="Community icon" size="medium" />}
    />,
    <AkNavigationItem
      action={
        <Button
          appearance="subtle"
          iconBefore={<ChevronRightIcon label="add" size="medium" />}
          spacing="none"
        />
      }
      text="Tools"
      key="Tools"
      onClick={() => this.addOnsNestedNav()}
      icon={<AddonIcon label="Tools icon" size="medium" />}
    />,
  ], ]
  
  state = {
    isOpen: true,
    menuLoading: true,
    openDrawer: null,
    stack: this.secured_stack,
    width: this.props.width,
  };

  secured_keys = [ 'Activity', 'Your Work', 'Tools', 'Settings', 'Community', 'Account' ]

  renderStack = () => {
    if (!this.props.isAuthenticated) {
      return this.state.stack.map((stack) => {
        return stack.filter((item) => {
          return item.key && !this.secured_keys.includes(item.key)
        })
      })
    }
    return this.state.stack
  }

  getCreateDrawer = () => (
    <AkCreateDrawer
      backIcon={BackIcon}
      isOpen={this.state.openDrawer === 'create'}
      key="create"
      onBackButton={this.closeDrawer}
      primaryIcon={<AtlassianIcon label='Atlassian icon' size='large' />}
    >
      <AkNavigationItem text="Stuff in here isn't implemented yet" />
      <AkNavigationItemGroup title="Automation">
        <AkNavigationItem
          icon={<CodeIcon label="New Bot" />}
          text="New Bot"
        />
        <AkNavigationItem
          icon={<CodeIcon label="Mine Data" />}
          text="Mine Data"
        />
      </AkNavigationItemGroup>
    </AkCreateDrawer>
  );

  getSearchDrawer = () => (
    <AkSearchDrawer
      backIcon={BackIcon}
      isOpen={this.state.openDrawer === 'search'}
      key="seach"
      onBackButton={this.closeDrawer}
      primaryIcon={<JiraLabsIcon label='Atlassian icon' size='large' />}
    >
      <AkSearch placeholder="Search..." onKeyDown={() => {}}>
        <AkNavigationItemGroup title="Saved Searches">
          <AkNavigationItem
            icon={<EditorAlignLeftIcon label="Editor icon" />}
            text="Not yet Implemented"
          />
        </AkNavigationItemGroup>
        <AkNavigationItemGroup title="Saved Reports">
          <AkNavigationItem
            icon={<EditorAlignLeftIcon label="Editor icon" />}
            text="Not yet Implemented"
          />
        </AkNavigationItemGroup>
      </AkSearch>
    </AkSearchDrawer>
  );

  addOnsNestedNav = () => {
    this.setState({
      stack: [
        ...this.state.stack,
        [
          <AkNavigationItem
            key="Relationships"
            icon={<PeopleIcon label="Relationships" />}
            text="Relationships"
          />,
          <AkNavigationItem
            key="Friend Graph"
            icon={<PeopleIcon label="Friend Graph" />}
            text="Friend Graph"
          />,
          <AkNavigationItem
            key="Questions"
            icon={<QuestionIcon label="Question" />}
            text="Questions"
          />,
        ],
      ],
    });
  };

  communityNestedNav = () => {
    this.setState({
      stack: [
        ...this.state.stack,
        [
          <AkNavigationItem
          text="Members"
          key="Members"
          icon={<PeopleIcon label="People icon" size="medium" />}
          isSelected={this.props.location.pathname === "/community/members"}
          href="/community/members"
          />,
          <AkNavigationItem
          text="Curation"
          key="Curation"
          icon={<TrayIcon label="Tray icon" size="medium" />}
          isSelected={this.props.location.pathname === "/community/curation"}
          href="/community/curation"
          />,
          <AkNavigationItem
          text="Bots"
          key="Bots"
          icon={<CodeIcon label="Code icon" size="medium" />}
          isSelected={this.props.location.pathname === "/community/bots"}
          href="/community/bots"
          />,
          <AkNavigationItem
          text="Preferences"
          key="Preferences"
          icon={<PreferencesIcon label="Preferences icon" size="medium" />}
          isSelected={this.props.location.pathname === "/community/preferences"}
          href="/community/preferences"
          />,
        ],
      ],
    });
  };
  
  openDrawer = (name) => {
    console.log(`on ${name} drawer open called`);

    this.setState({
      openDrawer: name,
    });
  };

  closeDrawer = () => {
    this.setState({
      openDrawer: null,
    });
  };

  resize = (resizeState) => {
    console.log('onResize called');
    this.setState({
      isOpen: resizeState.isOpen,
      width: resizeState.width,
    });
  };

  goBackHome = () => {
    if (this.state.stack.length <= 1) {
      return false;
    }

    const stack = this.state.stack.slice(0, this.state.stack.length - 1);
    return this.setState({ stack });
  };

  timerMenu = () => {
    setTimeout(() => this.setState({ menuLoading: false }), 2000);
  };

  render() {
    return (
      <NavigationBase
        drawers={[this.getSearchDrawer(), this.getCreateDrawer()]}
        containerTheme={presetThemes.global}
        containerHeaderComponent={() => (
          <ContainerHeaderComponent
            stackLength={this.state.stack.length}
            goBackHome={this.goBackHome}
          />
        )}
        globalCreateIcon={<GlobalCreateIcon openDrawer={this.openDrawer} />}
        globalPrimaryIcon={<JiraLabsIcon label='Atlassian icon' size='large' />}
        globalPrimaryItemHref="//github.com/r351574nc3/we-resist-bot"
        globalSearchIcon={<GlobalSearchIcon openDrawer={this.openDrawer} />}
        isOpen={this.state.isOpen}
        onResize={this.resize}
        onResizeStart={e => console.log('resizeStart', e)}
        width={this.state.width}
        hasScrollHintTop
        globalSecondaryActions={[
          <AkNavigationItem
          key="Feedback"
          tooltip="Give Feedback"
          icon={<EditorFeedbackIcon label="Feedback icon" size="medium" />}
          text="Give feedback"
          href="https://discord.gg/JU8zasD"
        />,
        <AkNavigationItem
          key="Atlaskit"
          icon={<WorldIcon label="World icon" size="medium" />}
          text="Atlaskit"
          href="https://github.com/r351574nc3/we-resist-bot"
        />,<SteemProfile navigation={this}/>,  
        <AkNavigationItem
          text="Settings"
          key="Settings"
          icon={<SettingsIcon label="Settings icon" size="medium" />}
          href="/Settings"
        />
    ]}
      >
        <AkContainerNavigationNested stack={this.renderStack()} />
      </NavigationBase> 
    );
  }
}


const mapStateToProps = (state) => {
  const isAuthenticated = selectors.auth.selectAuthenticated(state)
  const user = selectors.auth.selectUser(state)

  return { user, isAuthenticated }
}

export default connect(mapStateToProps)(Navigation)
