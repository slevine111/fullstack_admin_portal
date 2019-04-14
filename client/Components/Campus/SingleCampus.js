import React, { Component } from 'react'
import { connect } from 'react-redux'
import TableOfData from '../Shared/TableOfData'
import { deleteCampusAndUpdate } from '../../store'
import DataAttribute from '../Shared/DataAttribute'

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
    const { selectedCampus, studentsOfCampus } = this.props
    if (!selectedCampus.id) {
      return <div />
    }

    const addressSeparated = selectedCampus.address
      .split(',')
      .map(element => element.trim())
    const [streetAddress, city, stateAndZip] = addressSeparated
    const [state, zip] = stateAndZip.split(' ')
    const { id, name, address, imageUrl, description } = selectedCampus

    return (
      <div className="container">
        <img src={imageUrl} />
        <DataAttribute
          label="Name"
          databaseColumnName="name"
          value={name}
          id={id}
          data={selectedCampus}
          model="campuses"
        />
        <DataAttribute
          label="Address"
          databaseColumnName="address"
          value={address}
          id={id}
          address={streetAddress}
          city={city}
          state={state}
          zip={zip}
          data={selectedCampus}
          model="campuses"
        />

        <DataAttribute
          label="Description"
          databaseColumnName="description"
          value={description}
          id={id}
          data={selectedCampus}
          model="campuses"
          inputType="textarea"
        />
        <div>
          <button type="button" onClick={() => this.handleClick(id)}>
            Delete Campus and Their Students
          </button>
        </div>
        {studentsOfCampus[0] ? (
          <TableOfData
            data={studentsOfCampus}
            dataHeaders={[
              'Index',
              'First Name',
              'Last Name',
              'Email',
              'GPA',
              'Campus'
            ]}
          />
        ) : (
          <h5>This campus has no students</h5>
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
