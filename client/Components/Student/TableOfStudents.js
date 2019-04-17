import React from 'react'
import StudentRow from './StudentRow'
import { connect } from 'react-redux'

const TableOfStudents = ({ students, campus, history }) => {
  if (!students[0]) return <div />

  let tableHeaders = ['First Name', 'Last Name', 'Email', 'GPA']
  if (!campus) tableHeaders.push('Campus')

  return (
    <table className="table table-borderless">
      <thead>
        <tr>
          {tableHeaders.map((header, idx) => (
            <th key={idx} scope="col">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <StudentRow
            key={student.id}
            student={student}
            campus={campus}
            history={history}
          />
        ))}
      </tbody>
    </table>
  )
}

const mapStateToProps = ({ students, campuses }, { campus }) => {
  const campusMap = campuses.reduce((map, currentCampus) => {
    map[currentCampus.id] = currentCampus.name
    return map
  }, {})
  students = students
    .map(student => ({
      ...student,
      campusName: campusMap[student.campusId]
    }))
    .filter(
      student => student.campusName === (campus ? campus : student.campusName)
    )
  return {
    students
  }
}

export default connect(mapStateToProps)(TableOfStudents)
