import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteStudentAndUpdate } from '../../store'

class SingleStudent extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(id) {
    return this.props.deleteStudentAndUpdate(id).then(() => {
      this.props.history.push('/students')
    })
  }

  render() {
    const { selectedStudent } = this.props
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
        <div>
          <strong> First Name: </strong> {firstname}
        </div>
        <div>
          <strong> Last Name: </strong> {lastname}
        </div>
        <div>
          <strong> Email: </strong> {email}
        </div>
        <div>
          <strong> GPA: </strong> {gpa}
        </div>
        <div>
          <strong> Campus Name: </strong>{' '}
          <Link to={`/campuses/${campusId}`}>{campusName}</Link>
        </div>
        <div>
          <button type="button" onClick={() => this.handleClick(id)}>
            Delete Student
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ campuses, students }, { match }) => {
  if (!students[0]) {
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
