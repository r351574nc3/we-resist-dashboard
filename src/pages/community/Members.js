import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentWrapper from '../../components/ContentWrapper'
import PageTitle from '../../components/PageTitle'
import DynamicTable from '@atlaskit/dynamic-table'

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

  rows = [
    {
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
  ]

  render () {
    return (
      <ContentWrapper>
        <PageTitle>Members</PageTitle>
        <DynamicTable
          caption={this.caption}
          head={this.head}
          rows={this.rows}
          rowsPerPage={10}
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

  return {}
}

export default connect(mapStateToProps)(Members)