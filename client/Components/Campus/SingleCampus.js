import React, { Component } from 'react'
import { connect } from 'react-redux'
import TableOfStudents from '../Student/TableOfStudents'
import { deleteCampusAndUpdate } from '../../store'
import FieldToggleBetweenStaticAndInput from '../Shared/FieldToggleBetweenStaticAndInput'
import TextFieldInput from '../Shared/TextFieldInput'
import TextAreaInput from '../Shared/TextAreaInput'
import CompleteAddressForm from './CompleteAddressForm'
import { StaticFIeldBlock, SingleItemHeader } from '../Shared/UtilityComponents'

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

    const CampusName = FieldToggleBetweenStaticAndInput(
      TextFieldInput,
      SingleItemHeader
    )
    const CampusDescription = FieldToggleBetweenStaticAndInput(
      TextAreaInput,
      StaticFIeldBlock
    )
    const CampusAddress = FieldToggleBetweenStaticAndInput(
      CompleteAddressForm,
      StaticFIeldBlock
    )

    return (
      <div>
        <CampusName
          label="Name"
          databaseColumnName="name"
          id={id}
          model="campuses"
        />
        <img src={imageUrl} className="single-campus-image" />

        <CampusAddress
          label="Address"
          databaseColumnName="address"
          id={id}
          address={streetAddress}
          city={city}
          state={state}
          zip={zip}
          model="campuses"
        />
        <CampusDescription
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
          <TableOfStudents history={history} campus={selectedCampus.name} />
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
