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
  gpa: '',
  campusId: ''
}

class CreateCampusForm extends Component {
  constructor() {
    super()
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const firstCampusName = document.querySelector('option').textContent
    this.setState({
      campusId: this.props.campuses.find(c => c.name === firstCampusName).id
    })
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
        <div className="form-group">
          <label htmlFor="campuses">Campuses</label>
          <select
            className="form-control"
            id="campuses"
            name="campusId"
            onChange={this.handleChange}
          >
            {this.props.campuses.map(campus => {
              const { id, name } = campus
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              )
            })}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
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
