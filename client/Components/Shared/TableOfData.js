import React from 'react'
import CampusRow from '../Campus/CampusRow'
import StudentRow from '../Student/StudentRow'

const TableOfData = ({ data, dataHeaders }) => {
  if (!data[0]) return <div />

  return (
    <table className="table table-borderless">
      <thead>
        <tr>
          {dataHeaders.map((header, idx) => (
            <th key={idx} scope="col">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data[0].campusId
          ? data.map((student, idx) => (
              <StudentRow key={student.id} student={student} index={idx + 1} />
            ))
          : data.map((campus, idx) => (
              <CampusRow key={campus.id} campus={campus} index={idx + 1} />
            ))}
      </tbody>
    </table>
  )
}

export default TableOfData

/*const mapStateToProps = (state, ownProps) => {
  const typeOfData = ownProps.path.slice(1)
  let data = state[typeOfData]
  const dataHeaders = data[0]
    ? data[0].campusId
      ? ['Index', 'First Name', 'Last Name', 'Email', 'GPA', 'Campus']
      : ['Index', 'Campus Name', 'Address']
    : false

  const campusMap = state.campuses.reduce((map, campus) => {
    map[campus.id] = campus.name
    return map
  }, {})

  if (dataHeaders && dataHeaders[1] === 'First Name') {
    data = data.map(student => ({
      ...student,
      campusName: campusMap[student.campusId]
    }))
  }
  return {
    data,
    dataHeaders
  }
}

export default connect(mapStateToProps)(TableOfData)*/
