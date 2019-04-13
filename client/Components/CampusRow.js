import React from 'react'
import { Link } from 'react-router-dom'

const CampusRow = ({ campus, index }) => {
  const { id, name, address } = campus
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>
        {' '}
        <Link to={`/campuses/${id}`}> {name}</Link>{' '}
      </td>
      <td>{address}</td>
    </tr>
  )
}

export default CampusRow
