import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { deleteStudentAndUpdate } from '../../store'
import TextFieldInput from '../Shared/TextFieldInput'
import CampusDropdown from '../Shared/CampusDropdown'
import {
  StaticFieldInline,
  SingleItemHeader
} from '../Shared/UtilityComponents'
import FieldToggleBetweenStaticAndInput from '../Shared/FieldToggleBetweenStaticAndInput'

const FullStudentNameInput = props => {
  return (
    <Fragment>
      <TextFieldInput
        {...props}
        value={props.firstname}
        addedClass="first-name-change"
        fieldName="firstname"
      />
      <TextFieldInput {...props} value={props.lastname} fieldName="lastname" />
    </Fragment>
  )
}

const StudentName = FieldToggleBetweenStaticAndInput(
  FullStudentNameInput,
  SingleItemHeader
)
const StudentEmailOrGPA = FieldToggleBetweenStaticAndInput(
  TextFieldInput,
  StaticFieldInline
)
const StudentCampus = FieldToggleBetweenStaticAndInput(
  CampusDropdown,
  StaticFieldInline
)

class SingleStudent extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(id) {
    return this.props.deleteStudentAndUpdate(id).then(() => {
      this.props.history.push('/students')
    })
  }

  render() {
    const { selectedStudent, history } = this.props
    const { handleClick } = this
    const { id, imageUrl, campusName } = selectedStudent

    if (!selectedStudent.id) {
      return <div />
    }

    return (
      <Fragment>
        <StudentName
          label="Student Full Name"
          databaseColumnName="fullname"
          id={id}
          model="students"
          addedClass="inline"
        />

        <div className="row student-image-and-info">
          <div className="col-sm-4">
            <img src={imageUrl} className="single-student-image" />
          </div>
          <div className="col-sm-8 align-self-center">
            <StudentEmailOrGPA
              label="Email"
              databaseColumnName="email"
              id={id}
              model="students"
            />
            <StudentEmailOrGPA
              label="GPA"
              databaseColumnName="gpa"
              id={id}
              model="students"
            />
            <StudentCampus
              label="Campus Name"
              databaseColumnName="campusId"
              campusName={campusName}
              history={history}
              id={id}
              model="students"
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleClick(id)}
          >
            Delete Student
          </button>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ campuses, students }, { match }) => {
  if (!students[0] || !campuses[0]) {
    return { selectedStudent: {} }
  }

  const studentId = match.params.id
  const selectedStudent = students.find(student => student.id === studentId)
  if (!selectedStudent) {
    return { selectedStudent: {} }
  }
  const campusName = campuses.find(c => c.id === selectedStudent.campusId).name
  return {
    selectedStudent: { ...selectedStudent, campusName }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteStudentAndUpdate: studentId =>
      dispatch(deleteStudentAndUpdate(studentId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleStudent)

/*        <StudentName
          label="Last Name"
          databaseColumnName="lastname"
          id={id}
          model="students"
          addedClass="inline"
        />*/
