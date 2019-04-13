import React from 'react'
import { connect } from 'react-redux'

const generateRow = (data, columnsToGet) => {
  return data.map((row, idx) => {
    return (
      <tr key={idx}>
        <th scope="row">{idx + 1}</th>
        {columnsToGet.map((column, idx) => (
          <td key={idx}>{row[column]}</td>
        ))}
      </tr>
    )
  })
}

const TableOfData = ({ data, dataHeaders }) => {
  if (!dataHeaders) return <div />

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
          ? generateRow(data, [
              'firstname',
              'lastname',
              'email',
              'gpa',
              'campusName'
            ])
          : generateRow(data, ['name', 'address'])}
      </tbody>
    </table>
  )
}

const mapStateToProps = (state, ownProps) => {
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

export default connect(mapStateToProps)(TableOfData)
