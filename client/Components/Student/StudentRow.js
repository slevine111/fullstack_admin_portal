import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteStudentAndUpdate } from '../../store'

const StudentRow = ({ student, index, deleteStudentAndUpdate }) => {
  const { id, firstname, lastname, email, gpa, campusName } = student
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>
        <Link to={`/students/${id}`}>{firstname}</Link>
      </td>
      <td>{lastname}</td>
      <td>{email}</td>
      <td>{gpa}</td>
      <td>{campusName}</td>
      <td>
        {' '}
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteStudentAndUpdate(id)}
        >
          X
        </button>
      </td>
    </tr>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    deleteStudentAndUpdate: studentId =>
      dispatch(deleteStudentAndUpdate(studentId))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(StudentRow)
