import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createNewItemAndUpdate } from '../../store'
import statesAndAbbreviations from '../../../bin/StateAndAbbreviations'

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
    const { name, address, imageUrl, description, city, zip } = this.state
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
      },
      { fieldLabel: 'Address', fieldName: 'address', value: address }
    ].map(field => ({ ...field, handleChange: this.handleChange }))

    return (
      <form onSubmit={this.handleSubmit}>
        {arrayOfFields.map(field => createField(field))}
        <div className="form-row">
          <div className="form-group col-md-6">
            {createField({
              fieldLabel: 'City',
              fieldName: 'city',
              value: city,
              handleChange: this.handleChange
            })}
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="state">State</label>
            <select
              className="form-control"
              id="state"
              name="state"
              onChange={this.handleChange}
            >
              {statesAndAbbreviations.map((state, idx) => (
                <option key={idx} value={state.abbreviation}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-2">
            {createField({
              fieldLabel: 'Zip Code',
              fieldName: 'zip',
              value: zip,
              handleChange: this.handleChange
            })}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
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
