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

const createItems = [
  {
    title: null,
    items: [
      ['/#home', 'Home', 'Home', HomeFilledIcon]
    ]
  },
  {
    title: 'About',
    items: [
      ['https://github.com/r351574nc3/we-resist-dashboard', <span>we-resist on <strong>GitHub</strong></span>, 'r351574nc3 GitHub Repository', BitbucketBranchesIcon]
    ]
  }]

export default class CreateDrawer extends Component {
  static propTypes = {
    onItemClicked: PropTypes.func
  }

  render () {
    return (
      <div>
        {
          createItems.map(itemGroup => {
            return (
              <AkNavigationItemGroup key={itemGroup.title} title={itemGroup.title}>
                {
                  itemGroup.items.map(item => {
                    const [url, text, label, Icon] = item
                    return (
                      <AkNavigationItem
                        key={url}
                        href={url}
                        icon={<Icon label={label} />}
                        text={text.valueOf()}
                        onClick={this.props.onItemClicked}
                      />
                    )
                  })
                }
              </AkNavigationItemGroup>
            )
          })
        }
      </div>
    )
  }
}
