import React, { Component } from 'react'
import Avatar from "@atlaskit/avatar";
import { connect } from 'react-redux'
import ContentWrapper from '../../components/ContentWrapper'
import PageTitle from '../../components/PageTitle'
import Button, { ButtonGroup } from '@atlaskit/button'
import TextField from '@atlaskit/field-text'
import PageHeader from '@atlaskit/page-header'
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
    this.props.assign_role('Administrator')
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
              this.props.isAdmin ? {
                key: 'isActive',
                content: 'Active?',
                shouldTruncate: true,
                isSortable: true
              } : {},
              this.props.isAdmin ? {
                key: 'threshold',
                content: 'Threshold',
                shouldTruncate: true,
                isSortable: false        
              } : {},
              this.props.isAdmin ? {
                key: 'downvote',
                content: 'DV Percentage',
                shouldTruncate: true,
                isSortable: false        
              } : {},
              this.props.isAdmin ? {
                key: 'upvote',
                content: 'UV Percentage',
                shouldTruncate: true,
                isSortable: false
              } : {},
              this.props.isAdmin ? { 
                key: 'actions', 
                content: (<Button onClick={() => this.props.remove_selected_members()}>Delete</Button>) 
              } : {}
            ]
          }
        })
      })
      .then((members) => {
          this.props.update_members(members)
      })
  }
    
  render () {
    if (this.props.isAdmin) {
      this.head.cells.push({
        key: 'isActive',
        content: 'Active?',
        shouldTruncate: true,
        isSortable: true
      })
      this.head.cells.push({
        key: 'threshold',
        content: 'Threshold',
        shouldTruncate: true,
        isSortable: false
      })
      this.head.cells.push({
        key: 'downvote',
        content: 'DV Percentage',
        shouldTruncate: true,
        isSortable: false
      })
      this.head.cells.push({
        key: 'upvote',
        content: 'UV Percentage',
        shouldTruncate: true,
        isSortable: false
      })
      this.head.cells.push({
        key: 'actions',
        content: 'Actions',
        shouldTruncate: true,
        isSortable: false
      })
    }

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
  const isAdmin = selectors.auth.selectAdmin(state)
  return { members, isAdmin }
}

const mapDispatchToProps = {
  update_members: actions.community.update_members,
  assign_role: actions.auth.assign_role
}

export default connect(mapStateToProps, mapDispatchToProps)(Members)