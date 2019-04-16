import React from 'react'
import { connect } from 'react-redux'
import TableOfData from '../Shared/TableOfData'
import CreateStudentForm from './CreateStudentForm'

const AllStudentsView = ({ students, history }) => {
  return (
    <div>
      <CreateStudentForm />
      <TableOfData data={students} history={history} />
    </div>
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
    students
  }
}

export default connect(mapStateToProps)(AllStudentsView)
