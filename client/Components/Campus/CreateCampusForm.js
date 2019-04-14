import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createNewItemAndUpdate } from '../../store'
import CompleteAddressForm from './CompleteAddressForm'

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
  city: '',
  state: 'AL',
  zip: '',
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
    const {
      name,
      address,
      city,
      state,
      zip,
      imageUrl,
      description
    } = this.state
    return this.props
      .createNewCampusAndUpdate({
        name,
        imageUrl,
        description,
        address: `${address}, ${city}, ${state} ${zip}`
      })
      .then(() => this.setState(initialState))
  }

  render() {
    const { name, imageUrl, description } = this.state
    let arrayOfFields = [
      {
        fieldLabel: 'Campus Name',
        fieldName: 'name',
        value: name
      },
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
        <CompleteAddressForm {...this.state} handleChange={this.handleChange} />
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
