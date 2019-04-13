import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createNewItemAndUpdate } from '../../store'

const createField = ({ fieldLabel, fieldName, value, handleChange }) => {
  return (
    <div key={fieldName} className="form-group">
      <label htmlFor={fieldName}>{fieldLabel}</label>
      <input
        type="text"
        className="form-control"
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  imageUrl: '',
  gpa: ''
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
    const { firstname, lastname, email, imageUrl, gpa } = this.state
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
      <form onSubmit={this.handleSubmit}>
        {arrayOfFields.map(field => createField(field))}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createNewStudentAndUpdate: campus =>
      dispatch(createNewItemAndUpdate('students', campus))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CreateCampusForm)
