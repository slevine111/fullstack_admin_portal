import React from 'react'
import { connect } from 'react-redux'

const CampusDropdown = ({ campuses, handleChange, currentCampusId }) => {
  return (
    <div className="form-group">
      <label htmlFor="campuses">Campuses</label>
      <select
        className="form-control"
        id="campuses"
        name="campusId"
        onChange={handleChange}
        defaultValue={currentCampusId}
      >
        {campuses.map(campus => {
          const { id, name } = campus
          return (
            <option key={id} value={id}>
              {name}
            </option>
          )
        })}
      </select>
    </div>
  )
}

const mapStateToProps = ({ campuses }) => ({ campuses })

export default connect(mapStateToProps)(CampusDropdown)
