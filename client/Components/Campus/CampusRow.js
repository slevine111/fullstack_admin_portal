import React from 'react'
import { deleteCampusAndUpdate } from '../../store'
import { connect } from 'react-redux'

const CampusRow = ({ campus, index, history, deleteCampusAndUpdate }) => {
  const { id, name, imageUrl } = campus
  return (
    <div key={id}>
      <div className="campus-header-all">
        <span className="badge badge-primary">{index}</span>
        <h3 className="campus-name-all">{name}</h3>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <img src={imageUrl} className="campus-image" />
        </div>
        <div className="col-sm-5 align-self-center campus-button-set">
          <button
            type="button"
            className="campus-button-all btn btn-light btn-lg"
            onClick={() => history.push(`/campuses/${id}`)}
          >
            View Campus
          </button>
          <button
            type="button"
            className="campus-button-all btn btn-danger btn-lg"
            onClick={() => deleteCampusAndUpdate(id)}
          >
            Remove Campus
          </button>
        </div>
      </div>
      <hr />
    </div>
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
