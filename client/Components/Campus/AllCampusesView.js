import React from 'react'
import { connect } from 'react-redux'
import CreateCampusForm from './CreateCampusForm'
import { deleteCampusAndUpdate } from '../../store'

const AllCampusesView = ({ campuses, history, deleteCampusAndUpdate }) => {
  return (
    <div>
      <CreateCampusForm />
      {campuses.map((campus, idx) => {
        const { id, name, imageUrl } = campus
        return (
          <div key={id}>
            <div className="campus-header-all">
              <span className="badge badge-primary">{idx}</span>
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
      })}
    </div>
  )
}

const mapStateToProps = ({ campuses }) => ({ campuses })

const mapDispatchToProps = dispatch => {
  return {
    deleteCampusAndUpdate: campusId => dispatch(deleteCampusAndUpdate(campusId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCampusesView)
