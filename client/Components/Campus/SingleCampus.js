import React from 'react'
import { connect } from 'react-redux'
import TableOfData from '../Shared/TableOfData'

const SingleCampus = ({ selectedCampus, studentsOfCampus }) => {
  const { name, address, imageUrl, description } = selectedCampus
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
    </div>
  )
}

const mapStateToProps = ({ campuses, students }, { match }) => {
  const campusId = match.params.id
  const selectedCampus = campuses.find(campus => campus.id === campusId)
  const studentsOfCampus = students
    .filter(student => student.campusId === campusId)
    .map(student => ({ ...student, campusName: selectedCampus.name }))
  return {
    selectedCampus,
    studentsOfCampus
  }
}

export default connect(mapStateToProps)(SingleCampus)
