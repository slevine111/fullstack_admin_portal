import React, { Component } from 'react'
import { connect } from 'react-redux'
import TableOfData from '../Shared/TableOfData'
import { deleteCampusAndUpdate } from '../../store'

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
    const { id, name, address, imageUrl, description } = selectedCampus
    if (!selectedCampus.id) {
      return <div />
    }

    return (
      <div className="container">
        <img src={imageUrl} />
        <div>
          <strong> Name: </strong> {name}
        </div>
        <div>
          <strong> Address: </strong> {address}
        </div>
        <div>
          <strong> Description: </strong> {description}
        </div>
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
