import React from 'react'
import { connect } from 'react-redux'
import TableOfData from '../Shared/TableOfData'

const AllStudentsView = ({ students, dataHeaders, selectedColumns }) => {
  return (
    <TableOfData
      data={students}
      dataHeaders={dataHeaders}
      selectedColumns={selectedColumns}
    />
  )
}

const mapStateToProps = ({ students, campuses }) => {
  const campusMap = campuses.reduce((map, campus) => {
    map[campus.id] = campus.name
    return map
  }, {})
  students = students.map(student => ({
    ...student,
    campusName: campusMap[student.campusId]
  }))
  return {
    students,
    dataHeaders: ['Index', 'First Name', 'Last Name', 'Email', 'GPA', 'Campus']
  }
}

export default connect(mapStateToProps)(AllStudentsView)
