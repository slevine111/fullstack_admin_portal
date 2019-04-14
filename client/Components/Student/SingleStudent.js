import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteStudentAndUpdate } from '../../store'
import DataAttribute from '../Shared/DataAttribute'

class SingleStudent extends Component {
  constructor() {
    super()
    this.state = {
      firstname: '',
      firstnameIsInput: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(id) {
    return this.props.deleteStudentAndUpdate(id).then(() => {
      this.props.history.push('/students')
    })
  }

  render() {
    const { selectedStudent } = this.props
    const { handleClick } = this
    const {
      id,
      firstname,
      lastname,
      email,
      gpa,
      imageUrl,
      campusName,
      campusId
    } = selectedStudent

    if (!selectedStudent.id) {
      return <div />
    }

    return (
      <div className="container">
        <img src={imageUrl} />
        <DataAttribute
          label="First Name"
          databaseColumnName="firstname"
          value={firstname}
          id={id}
          data={selectedStudent}
        />
        <DataAttribute
          label="Last Name"
          databaseColumnName="lastname"
          value={lastname}
          id={id}
          data={selectedStudent}
        />
        <DataAttribute
          label="Email"
          databaseColumnName="email"
          value={email}
          id={id}
          data={selectedStudent}
        />
        <DataAttribute
          label="GPA"
          databaseColumnName="gpa"
          value={gpa}
          id={id}
          data={selectedStudent}
        />
        <DataAttribute
          label="Campus Name"
          databaseColumnName="campusId"
          value={campusId}
          campusName={campusName}
          id={id}
          data={selectedStudent}
        />
        <div>
          <button type="button" onClick={() => handleClick(id)}>
            Delete Student
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ campuses, students }, { match }) => {
  if (!students[0] || !campuses[0]) {
    return { selectedStudent: {} }
  }

  const studentId = match.params.id
  const selectedStudent = students.find(student => student.id === studentId)
  if (!selectedStudent) {
    return { selectedStudent: {} }
  }
  const campusName = campuses.find(c => c.id === selectedStudent.campusId).name
  return {
    selectedStudent: { ...selectedStudent, campusName }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteStudentAndUpdate: studentId =>
      dispatch(deleteStudentAndUpdate(studentId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleStudent)
