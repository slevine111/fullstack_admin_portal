import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { updateItemAndChangeStore } from '../../store'
import CompleteAddressForm from '../Campus/CompleteAddressForm'
import CampusDropdown from './CampusDropdown'
import TextFieldInput from './TextFieldInput'

class DataAttribute extends Component {
  constructor() {
    super()
    this.state = {
      field: '',
      fieldIsInput: false
    }
    this.convertFieldToForm = this.convertFieldToForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress({ which }) {
    if (which === 13) this.handleSubmit()
  }

  handleChange({ target }) {
    if (this.props.address) {
      this.setState({ [target.name]: target.value })
    } else {
      this.setState({ field: target.value })
    }
  }

  handleSubmit() {
    const {
      updateItemAndChangeStore,
      id,
      data,
      databaseColumnName,
      model
    } = this.props
    const { address, city, state, zip } = this.state
    let updatedField = this.props.address
      ? `${address}, ${city}, ${state} ${zip}`
      : this.state.field
    const updatedItem = {
      ...data,
      [databaseColumnName]: updatedField
    }

    return updateItemAndChangeStore(model, id, updatedItem).then(() => {
      this.setState({ fieldIsInput: false })
    })
  }

  convertFieldToForm(value) {
    if (this.props.address) {
      this.setState({
        address: this.props.address,
        city: this.props.city,
        state: this.props.state,
        zip: this.props.zip,
        fieldIsInput: true
      })
    } else {
      this.setState({ field: value, fieldIsInput: true })
    }
  }

  render() {
    const {
      convertFieldToForm,
      handleChange,
      handleSubmit,
      handleKeyPress
    } = this
    const { label, value, campusName, inputType, history } = this.props
    const { field, fieldIsInput, address, city, state, zip } = this.state

    const labelComponentMap = [
      {
        label: 'Address',
        component: (
          <CompleteAddressForm
            address={address}
            city={city}
            state={state}
            zip={zip}
            handleChange={handleChange}
          />
        )
      },
      {
        label: 'Campus Name',
        component: (
          <CampusDropdown handleChange={handleChange} currentCampusId={value} />
        )
      },
      {
        label: 'Description',
        component: (
          <div className="form-group">
            <label htmlFor="field">
              <strong>{`${label}: `}</strong>
            </label>
            <textarea
              rows={5}
              cols={50}
              value={field}
              id="field"
              name="field"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        )
      },
      {
        label: 'Other',
        component: (
          <TextFieldInput
            handleChange={handleChange}
            handleKeyPress={handleKeyPress}
            value={field}
            fieldName="field"
            fieldLabel={label}
          />
        )
      }
    ]

    if (fieldIsInput) {
      return (
        <Fragment>
          {
            labelComponentMap.find(
              element =>
                element.label === (inputType === 'text' ? 'Other' : label)
            ).component
          }
          <i className="fas fa-check fa-lg" onClick={handleSubmit} />
          <i
            className="fas fa-times fa-lg"
            onClick={() => this.setState({ fieldIsInput: false })}
          />
        </Fragment>
      )
    }

    return (
      <div className="row">
        <div className="col-sm-4">
          {' '}
          <strong>{label}</strong>
        </div>
        <div className="col-sm-4">
          {label === 'Campus Name' ? (
            <Fragment>
              {campusName}
              <i
                className="fas fa-external-link-alt"
                onClick={() => history.push(`/campuses/${value}`)}
              />
            </Fragment>
          ) : (
            value
          )}
        </div>
        <div className="col-sm-2">
          <i
            className="far fa-edit fa-lg"
            onClick={() => convertFieldToForm(value)}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, { model, databaseColumnName, id }) => {
  return {
    value: state[model].find(item => item.id === id)[databaseColumnName]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateItemAndChangeStore: (model, studentId, changedStudent) =>
      dispatch(updateItemAndChangeStore(model, studentId, changedStudent))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataAttribute)
