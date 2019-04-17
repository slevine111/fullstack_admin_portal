import React from 'react'
import { connect } from 'react-redux'
import { deleteStudentAndUpdate } from '../../store'

const StudentRow = ({ student, deleteStudentAndUpdate, campus, history }) => {
  const { id, firstname, lastname, email, gpa, campusName } = student
  console.log(campus)
  return (
    <tr>
      <td>
        {firstname}
        <i
          className="fas fa-external-link-alt"
          onClick={() => history.push(`/students/${id}`)}
        />
      </td>
      <td>{lastname}</td>
      <td>{email}</td>
      <td>{gpa}</td>
      {campus ? <td /> : <td>{campusName}</td>}

      <td>
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
