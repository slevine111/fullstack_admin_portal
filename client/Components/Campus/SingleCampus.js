import React, { Component } from 'react'
import { connect } from 'react-redux'
import TableOfData from '../Shared/TableOfData'
import { deleteCampusAndUpdate } from '../../store'
import Atest from '../Shared/Atest'
import TextFieldInput from '../Shared/TextFieldInput'
import CompleteAddressForm from './CompleteAddressForm'
import { StaticComponentBlock, campusHeader } from '../Shared/UtilityComponents'

const TextAreaInput = ({ label, value, handleChange, handleKeyPress }) => {
  return (
    <div className="form-group campus-description">
      <label htmlFor="field">
        <strong>{`${label}: `}</strong>
      </label>
      <div>
        <textarea
          rows={5}
          cols={70}
          value={value}
          id="field"
          name="field"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  )
}

class SingleCampus extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(id) {
    return this.props.deleteCampusAndUpdate(id).then(() => {
      this.props.history.push('/campuses')
    })
  }

  render() {
    const { selectedCampus, studentsOfCampus, history } = this.props
    if (!selectedCampus.id) {
      return <div />
    }

    const addressSeparated = selectedCampus.address
      .split(',')
      .map(element => element.trim())
    const [streetAddress, city, stateAndZip] = addressSeparated
    const [state, zip] = stateAndZip.split(' ')
    const { id, imageUrl } = selectedCampus

    const H4Field = Atest(TextFieldInput, campusHeader)
    const TextAreaField = Atest(TextAreaInput, StaticComponentBlock)
    const AddressForm = Atest(CompleteAddressForm, StaticComponentBlock)

    return (
      <div>
        <H4Field
          label="Name"
          databaseColumnName="name"
          id={id}
          model="campuses"
        />
        <img src={imageUrl} className="single-campus-image" />

        <AddressForm
          label="Address"
          databaseColumnName="address"
          id={id}
          address={streetAddress}
          city={city}
          state={state}
          zip={zip}
          model="campuses"
        />
        <TextAreaField
          label="Description"
          databaseColumnName="description"
          id={id}
          model="campuses"
          className="campus-description"
        />

        <div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.handleClick(id)}
          >
            Remove Campus and Students
          </button>
        </div>
        {studentsOfCampus[0] ? (
          <TableOfData
            data={studentsOfCampus}
            history={history}
            campus={selectedCampus.name}
          />
        ) : (
          <h6 className="alert alert-warning">
            This campus has no students :(. Find some students before it shuts
            down
          </h6>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ campuses, students }, { match }) => {
  if (!campuses[0]) {
    return { selectedCampus: {} }
  }
  const campusId = match.params.id
  const selectedCampus = campuses.find(campus => campus.id === campusId)
  if (!selectedCampus) {
    return { selectedCampus: {} }
  }
  const studentsOfCampus = students
    .filter(student => student.campusId === campusId)
    .map(student => ({ ...student, campusName: selectedCampus.name }))
  return {
    selectedCampus,
    studentsOfCampus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteCampusAndUpdate: campusId => dispatch(deleteCampusAndUpdate(campusId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCampus)
