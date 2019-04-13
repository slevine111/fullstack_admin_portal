import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const SingleStudent = ({ selectedStudent }) => {
  const {
    firstname,
    lastname,
    email,
    gpa,
    imageUrl,
    campusName,
    campusId
  } = selectedStudent
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
    </div>
  )
}

const mapStateToProps = ({ campuses, students }, { match }) => {
  const studentId = match.params.id
  const selectedStudent = students.find(student => student.id === studentId)
  const campusName = campuses.find(
    campus => campus.id === selectedStudent.campusId
  ).name
  return {
    selectedStudent: { ...selectedStudent, campusName }
  }
}

export default connect(mapStateToProps)(SingleStudent)