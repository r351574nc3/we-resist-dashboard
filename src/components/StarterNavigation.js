import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import Navigation, {
  AkContainerTitle,
  AkCreateDrawer,
  AkCustomDrawer,
  AkNavigationItem
} from '@atlaskit/navigation'
import DashboardIcon from '@atlaskit/icon/glyph/dashboard'
import GearIcon from '@atlaskit/icon/glyph/settings'
import CreateIcon from '@atlaskit/icon/glyph/add'
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian'
import ArrowleftIcon from '@atlaskit/icon/glyph/arrow-left'
import ComponentIcon from '@atlaskit/icon/glyph/component'

import CreateDrawer from '../components/CreateDrawer'
import UserMenu from '../components/UserMenu'
import atlaskitLogo from '../images/atlaskit.png'
import PreferencesIcon from '@atlaskit/icon/glyph/preferences';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import NotificationIcon from '@atlaskit/icon/glyph/notification';
import UserAvatarCircleIcon from '@atlaskit/icon/glyph/user-avatar-circle';
import MenuIcon from '@atlaskit/icon/glyph/menu';

import SecondaryActions from '../components/SecondaryActions';

export default class StarterNavigation extends React.Component {
  state = {
    isOpen: true,
    menuLoading: true,
    openDrawer: null,
    navLinks: [
      ['/', 'Dashboard', DashboardIcon],
      ['/preferences', 'Preferences', PreferencesIcon],
      ['/community/members', 'Members', PeopleGroupIcon],
      ['/community/notifications', 'Notifications', NotificationIcon],
      ['/tools', 'Tools', ComponentIcon]
    ]
  }

  static contextTypes = {
    navOpenState: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    location: PropTypes.object
  }

  openDrawer = (openDrawer) => {
    this.setState({ openDrawer })
  }

  shouldComponentUpdate (nextProps, nextContext) {
    return true
  }

  timerMenu = () => {
    setTimeout(() => this.setState({ menuLoading: false }), 2000);
  };

  render () {
    const backIcon = <ArrowleftIcon label='Back icon' size='medium' />
    const globalPrimaryIcon = <AtlassianIcon label='Atlassian icon' size='xlarge' />
    const avatarIcon = <UserAvatarCircleIcon label='Avatar icon' size='xlarge' />
    const menuIcon = <MenuIcon label='Avatar icon' size='xlarge' />

    return (
      <Navigation
        isCollapsible={true}
        isOpen={this.context.navOpenState.isOpen}
        width={this.context.navOpenState.width}
        onResize={this.props.onNavResize}
        containerHeaderComponent={() => (
          <AkContainerTitle
            href='https://github.com/r351574nc3/we-resist-dashboard'
            icon={
              <img alt='atlaskit logo' src={atlaskitLogo} />
            }
            text='We Resist Dashboard '
          />
        )}
        globalPrimaryIcon={globalPrimaryIcon}
        globalPrimaryItemHref='/'
        hasBlanket
        drawers={[
          <AkCreateDrawer
            backIcon={backIcon}
            isOpen={this.state.openDrawer === 'create'}
            key='create'
            onBackButton={() => this.openDrawer(null)}
            primaryIcon={globalPrimaryIcon}
          >
            <CreateDrawer
              onItemClicked={() => this.openDrawer(null)}
            />
          </AkCreateDrawer>,
          <AkCustomDrawer
            backIcon={backIcon}
            isOpen={this.state.openDrawer === 'user'}
            key='user'
            onBackButton={() => this.openDrawer(null)}
            primaryIcon={menuIcon}
          >
            <UserMenu
              onItemClicked={() => this.openDrawer(null)}
            />
          </AkCustomDrawer>
      ]}
        globalCreateIcon={<CreateIcon label='Create icon' />}
        onCreateDrawerOpen={() => this.openDrawer('create')}
        globalSecondaryActions={
          <SecondaryActions />
        }
      >
        {
          this.state.navLinks.map(link => {
            const [url, title, Icon] = link
            return (
              <Link key={url} to={url}>
                <AkNavigationItem
                  icon={<Icon label={title} size='medium' />}
                  text={title}
                  isSelected={this.props.location.pathname === url}
                />
              </Link>
            )
          }, this)
        }
      </Navigation>
    )
  }
}
