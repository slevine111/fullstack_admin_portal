import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteCampusAndUpdate } from '../../store'

const CampusRow = ({ campus, index, deleteCampusAndUpdate }) => {
  const { id, name, address } = campus
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>
        {' '}
        <Link to={`/campuses/${id}`}> {name}</Link>{' '}
      </td>
      <td>{address}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteCampusAndUpdate(id)}
        >
          X
        </button>
      </td>
    </tr>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    deleteCampusAndUpdate: campusId => dispatch(deleteCampusAndUpdate(campusId))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CampusRow)
