import React, { Component } from 'react';
import AddIcon from '@atlaskit/icon/glyph/add';
import AddonIcon from '@atlaskit/icon/glyph/addon';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian'
import Button from '@atlaskit/button';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import CalendarIcon from '@atlaskit/icon/glyph/calendar';
import CodeIcon from '@atlaskit/icon/glyph/code';
import ConfluenceIcon from '@atlaskit/icon/glyph/confluence';
import { ConfluenceWordmark } from '@atlaskit/logo';
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


export default class Navigation extends Component {
  state = {
    isOpen: true,
    menuLoading: true,
    openDrawer: null,
    stack: [
      [
        <AkNavigationItem
          text="Home"
          icon={<HomeFilledIcon label="Home icon" size="medium" />}
          isSelected={this.props.location.pathname === "/"}
          href="/"
        />,
        <AkNavigationItem
          text="Activity"
          icon={<DiscoverIcon label="Activity icon" size="medium" />}
          isSelected={this.props.location.pathname === "/Activity"}
          href="/Activity"
        />,
        <AkNavigationItem
          text="Your work"
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
          onClick={() => this.addOnsNestedNav()}
          icon={<AddonIcon label="Tools icon" size="medium" />}
        />,
        <AkNavigationItem
          text="Settings"
          icon={<SettingsIcon label="Settings icon" size="medium" />}
          isSelected={this.props.location.pathname === "/Settings"}
          href="/Settings"
        />,
        <AkNavigationItemGroup title="Other">
          <AkNavigationItem
            icon={<EditorFeedbackIcon label="Feedback icon" size="medium" />}
            text="Give feedback"
            href="https://discord.gg/JU8zasD"
          />
          <AkNavigationItem
            icon={<WorldIcon label="World icon" size="medium" />}
            text="Atlaskit"
            href="https://github.com/r351574nc3/we-resist-bot"
          />
        </AkNavigationItemGroup>,
      ],
    ],
    width: this.props.width,
  };

  getCreateDrawer = () => (
    <AkCreateDrawer
      backIcon={BackIcon}
      isOpen={this.state.openDrawer === 'create'}
      key="create"
      onBackButton={this.closeDrawer}
      primaryIcon={<AtlassianIcon label='Atlassian icon' size='large' />}
    >
      <AkNavigationItem text="Item outside a group" />
      <AkNavigationItemGroup title="Create item group">
        <AkNavigationItem
          icon={<ConfluenceIcon label="Confluence icon" />}
          text="Item with an icon"
        />
        <AkNavigationItem
          icon={<JiraLabsIcon label="Jira icon" />}
          text="A really, really, quite long, actually super long container name"
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
          icon={<PeopleIcon label="People icon" size="medium" />}
          isSelected={this.props.location.pathname === "/community/members"}
          href="/community/members"
          />,
          <AkNavigationItem
          text="Curation"
          icon={<TrayIcon label="Tray icon" size="medium" />}
          isSelected={this.props.location.pathname === "/community/curation"}
          href="/community/curation"
          />,
          <AkNavigationItem
          text="Bots"
          icon={<CodeIcon label="Code icon" size="medium" />}
          isSelected={this.props.location.pathname === "/community/bots"}
          href="/community/bots"
          />,
          <AkNavigationItem
          text="Preferences"
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
      >
        <AkContainerNavigationNested stack={this.state.stack} />
      </NavigationBase>
    );
  }
}