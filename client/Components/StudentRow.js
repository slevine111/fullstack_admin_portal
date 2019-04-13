import React from 'react'
import { Link } from 'react-router-dom'

const StudentRow = ({ student, index }) => {
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
    </tr>
  )
}

export default StudentRow
