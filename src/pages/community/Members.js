import React, { Component } from 'react'
import Avatar from "@atlaskit/avatar";
import { connect } from 'react-redux'
import ContentWrapper from '../../components/ContentWrapper'
import PageTitle from '../../components/PageTitle'
import DynamicTable from '@atlaskit/dynamic-table'
import styled from 'styled-components';
import selectors from '../../selectors'
import actions from '../../actions'
import querystring from 'querystring'

const NameWrapper = styled.span`
  display: flex;
  align-items: center;
`;
const AvatarWrapper = styled.div`
  margin-right: 8px;
`;

class Members extends Component {

  caption = 'List of Members';
  head = {
      cells: [
        {
          key: 'name',
          content: 'Name',
          isSortable: true
        },
        {
          key: 'joined',
          content: 'Joined On',
          shouldTruncate: true,
          isSortable: true
        },
        {
          key: 'updated',
          content: 'Last Updated',
          shouldTruncate: true,
          isSortable: true
        },
      ],
  }

  componentDidMount () {
    const members_url = '/api/community/member_list'
    fetch(members_url)
      .then((response) => response.json())
      .then((members) => {
        return members.map((member) => {
          const cells = []
          return {
            cells: [
              {
                key: 'name',
                content: (
                  <NameWrapper>
                    <AvatarWrapper>
                      <Avatar
                        name={member.username}
                        size="medium"
                        src={`https://steemitimages.com/u/${member.username}/avatar`} />
                    </AvatarWrapper>
                    <a href="`https://steemit.com/@${member.username}`">{member.username}</a>                  
                  </NameWrapper>
                ),
                isSortable: true
              },
              {
                key: 'joined',
                content: member.createdAt,
                shouldTruncate: true,
                isSortable: true
              },
              {
                key: 'updated',
                content: member.updatedAt,
                shouldTruncate: true,
                isSortable: true
              },
            ],
          }
        })
      })
      .then((members) => {
          this.props.update_members(members)
      })
  }
    
  render () {
    return (
      <ContentWrapper>
        <PageTitle>Members</PageTitle>
        <DynamicTable
          caption={this.caption}
          head={this.head}
          rows={this.props.members}
          rowsPerPage={20}
          defaultPage={1}
          loadingSpinnerSize="large"
          isLoading={false}
          isFixedSize
          defaultSortKey="name"
          defaultSortOrder="ASC"
          onSort={() => console.log('onSort')}
          onSetPage={() => console.log('onSetPage')}
        />        
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const members = selectors.community.selectMembers(state)
  return { members }
}

const mapDispatchToProps = {
  update_members: actions.community.update_members
}

export default connect(mapStateToProps, mapDispatchToProps)(Members)