import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { createNewItemAndUpdate } from '../../store'
import CampusDropdown from '../Shared/CampusDropdown'
import TextFieldInput from '../Shared/TextFieldInput'

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  imageUrl: '',
  gpa: '',
  campusId: 'c21e1f88-1b61-42f2-b45e-91a5a84d2c77',
  formShowed: false
}

class CreateCampusForm extends Component {
  constructor() {
    super()
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target }) {
    this.setState(
      {
        [target.name]: target.value
      },
      () => console.log(this.state)
    )
  }

  handleSubmit(event) {
    event.preventDefault()
    return this.props
      .createNewStudentAndUpdate(this.state)
      .then(() => this.setState(initialState))
  }

  render() {
    const { firstname, lastname, email, imageUrl, gpa, formShowed } = this.state
    let arrayOfFields = [
      {
        fieldLabel: 'First Name',
        fieldName: 'firstname',
        value: firstname
      },
      { fieldLabel: 'Last Name', fieldName: 'lastname', value: lastname },
      { fieldLabel: 'Email', fieldName: 'email', value: email },
      { fieldLabel: 'Image URL', fieldName: 'imageUrl', value: imageUrl },
      { fieldLabel: 'GPA', fieldName: 'gpa', value: gpa }
    ].map(field => ({ ...field, handleChange: this.handleChange }))
    return (
      <Fragment>
        <i
          className={`fa-2x fa${formShowed ? 's' : ''} fa-${
            formShowed ? 'minus' : 'plus'
          }-square`}
          onClick={() =>
            this.setState(curState => ({ formShowed: !curState.formShowed }))
          }
        />
        {formShowed && (
          <form onSubmit={this.handleSubmit}>
            {arrayOfFields.map(fieldInput => (
              <TextFieldInput key={fieldInput.fieldLabel} {...fieldInput} />
            ))}
            <CampusDropdown handleChange={this.handleChange} />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = ({ campuses }) => {
  return {
    campuses: campuses.map(campus => ({ id: campus.id, name: campus.name }))
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createNewStudentAndUpdate: campus =>
      dispatch(createNewItemAndUpdate('students', campus))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCampusForm)
