import React from 'react'
import StudentRow from '../Student/StudentRow'

const TableOfData = ({ data, campus, history }) => {
  if (!data[0]) return <div />

  let dataHeaders = ['First Name', 'Last Name', 'Email', 'GPA']
  if (!campus) dataHeaders.push('Campus')

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
        {data.map((student, idx) => (
          <StudentRow key={student.id} student={student} campus={campus} history={history} />
        ))}
      </tbody>
    </table>
  )
}

export default TableOfData
