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
  name: '',
  address: '',
  imageUrl: '',
  description: ''
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
      .createNewCampusAndUpdate(this.state)
      .then(() => this.setState(initialState))
  }

  render() {
    const { name, address, imageUrl, description } = this.state
    let arrayOfFields = [
      {
        fieldLabel: 'Campus Name',
        fieldName: 'name',
        value: name
      },
      { fieldLabel: 'Address', fieldName: 'address', value: address },
      { fieldLabel: 'Image URL', fieldName: 'imageUrl', value: imageUrl },
      {
        fieldLabel: 'Description',
        fieldName: 'description',
        value: description
      }
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
    createNewCampusAndUpdate: campus =>
      dispatch(createNewItemAndUpdate('campuses', campus))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CreateCampusForm)
