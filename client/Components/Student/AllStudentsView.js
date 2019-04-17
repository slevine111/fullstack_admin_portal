import React from 'react'
import TableOfStudents from './TableOfStudents'
import CreateStudentForm from './CreateStudentForm'

const AllStudentsView = ({ history }) => {
  return (
    <div>
      <CreateStudentForm />
      <TableOfStudents history={history} />
    </div>
  )
}

export default AllStudentsView
