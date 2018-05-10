import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { AkNavigationItemGroup, AkNavigationItem } from '@atlaskit/navigation'

import BitbucketBranchesIcon from '@atlaskit/icon/glyph/bitbucket/branches'
import PageIcon from '@atlaskit/icon/glyph/page'
import CalendarIcon from '@atlaskit/icon/glyph/calendar'
import EmojiObjectsIcon from '@atlaskit/icon/glyph/emoji/objects'
import EmojiNatureIcon from '@atlaskit/icon/glyph/emoji/nature'
import EmojiTravelIcon from '@atlaskit/icon/glyph/emoji/travel'
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled';
import MenuIcon from '@atlaskit/icon/glyph/menu';


export default class UserMenu extends Component {
  static propTypes = {
    onItemClicked: PropTypes.func
  }

  render() {
    return (
      <div>
        <AkNavigationItemGroup key="Users" title="Users">
            <AkNavigationItem
                    key={url}
                    href={url}
                    icon={<Icon label={label} />}
                    text={text.valueOf()}
                    onClick={this.props.onItemClicked}
            />
        </AkNavigationItemGroup>
      </div>
    )
  }
}
