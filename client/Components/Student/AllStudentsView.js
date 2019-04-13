import React, { Component } from 'react'
import { connect } from 'react-redux'
import TableOfData from '../Shared/TableOfData'
import CreateStudentForm from './CreateStudentForm'

class AllStudentsView extends Component {
  constructor() {
    super()
    this.state = { formShowed: false }
  }

  render() {
    const { students, dataHeaders } = this.props
    const { formShowed } = this.state
    return (
      <div>
        <button
          type="button"
          onClick={() =>
            this.setState(curState => ({ formShowed: !curState.formShowed }))
          }
        >
          {formShowed ? '-' : '+'}
        </button>

        {formShowed && <CreateStudentForm />}

        <TableOfData data={students} dataHeaders={dataHeaders} />
      </div>
    )
  }
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
