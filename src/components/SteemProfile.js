import React, { Component } from 'react';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import Avatar from "@atlaskit/avatar";
import Button from '@atlaskit/button';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import { connect } from 'react-redux'
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import DiscoverIcon from '@atlaskit/icon/glyph/discover';
import EditorAlignLeftIcon from '@atlaskit/icon/glyph/editor/align-left';
import EditorFeedbackIcon from '@atlaskit/icon/glyph/editor/feedback';
import FolderIcon from '@atlaskit/icon/glyph/folder';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import PeopleIcon from '@atlaskit/icon/glyph/people';
import PreferencesIcon from '@atlaskit/icon/glyph/preferences';
import Tooltip from '@atlaskit/tooltip';
import SignInIcon from '@atlaskit/icon/glyph/sign-in';
import SignOutIcon from '@atlaskit/icon/glyph/sign-out';
import NavigationBase, {
    AkContainerNavigationNested,
    AkNavigationItemGroup,
    AkNavigationItem,
    presetThemes,
  } from '@atlaskit/navigation';
  
import sc2 from 'sc2-sdk';
import selectors from '../selectors'
import actions from '../actions'

const api = sc2.Initialize({
    app: 'sylveon',
    callbackURL: 'http://localhost:1234/',
    accessToken: '',
    scope: ['vote', 'comment', 'offline']
  });

class SteemProfile extends Component {

    render() {
        this.parent = this.props.navigation
        const avatar_src = 'https://steemitimages.com/u/' + this.props.user + '/avatar'

        if (this.props.isAuthenticated) {
            return (
                <AkNavigationItem
                    icon={<Avatar name="medium" size="small" src={avatar_src} />}
                    text="Profile"
                    action={
                        <Button
                            appearance="subtle"
                            spacing="none"
                        />
                    }
                    onClick={() => this.profileNestedNav()}
                />
            )
        }
        return (
            <AkNavigationItem
                icon={<SignInIcon name="medium" size="medium" />}
                text="Login"
                href={api.getLoginURL()}
            />
        )
    }

    profileNestedNav = () => {
        this.parent.setState({
            stack: [
                ...this.parent.state.stack,
            [
                <AkNavigationItem
                    text="Preferences"
                    icon={<PreferencesIcon label="Preferences icon" size="medium" />}
                    isSelected={this.parent.props.location.pathname === "/profile/preferences"}
                    href="/profile/preferences"
                />,
                <AkNavigationItem
                    text="Logout"
                    icon={<SignOutIcon label="SignOut icon" size="medium" />}
                    href="/Logout"
                />,
            ]
        ]})
    };
}

const mapDispatchToProps = {
    logout: actions.auth.logout()
}
  
const mapStateToProps = (state) => {
    const isAuthenticated = selectors.auth.selectAuthenticated(state)
    const user = selectors.auth.selectUser(state)
    return { user, isAuthenticated }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SteemProfile)