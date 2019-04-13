import React from 'react'
import { connect } from 'react-redux'
import TableOfData from './Shared/TableOfData'

const AllCampusesView = ({ campuses, dataHeaders, selectedColumns }) => {
  return (
    <TableOfData
      data={campuses}
      dataHeaders={dataHeaders}
      selectedColumns={selectedColumns}
    />
  )
}

const mapStateToProps = ({ campuses }) => ({
  campuses,
  dataHeaders: ['Index', 'Campus Name', 'Address']
})

export default connect(mapStateToProps)(AllCampusesView)
