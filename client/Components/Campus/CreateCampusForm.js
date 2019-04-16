import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { createNewItemAndUpdate } from '../../store'
import CompleteAddressForm from './CompleteAddressForm'
import TextFieldInput from '../Shared/TextFieldInput'

const initialState = {
  name: '',
  address: '',
  city: '',
  state: 'AL',
  zip: '',
  imageUrl: '',
  description: '',
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
    const { name, imageUrl, description, formShowed } = this.state
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
            <CompleteAddressForm
              {...this.state}
              handleChange={this.handleChange}
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        )}
      </Fragment>
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
