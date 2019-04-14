import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { updateItemAndChangeStore } from '../../store'
import { Link } from 'react-router-dom'
import CompleteAddressForm from '../Campus/CompleteAddressForm'
import CampusDropdown from './CampusDropdown'

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
    const {
      label,
      value,
      campusName,
      inputType,
      address,
      city,
      state,
      zip
    } = this.props
    const { field, fieldIsInput } = this.state

    if (label === 'Address' && fieldIsInput) {
      return (
        <Fragment>
          <CompleteAddressForm
            address={address}
            city={city}
            state={state}
            zip={zip}
            handleChange={handleChange}
          />
          <i className="fas fa-check fa-lg" onClick={handleSubmit} />
          <i
            className="fas fa-times fa-lg"
            onClick={() => this.setState({ fieldIsInput: false })}
          />
        </Fragment>
      )
    }

    if (label === 'Campus Name') {
      return (
        <div>
          {fieldIsInput ? (
            <Fragment>
              <CampusDropdown
                handleChange={handleChange}
                defaultValue={value}
              />
              <i className="fas fa-check fa-lg" onClick={handleSubmit} />
              <i
                className="fas fa-times fa-lg"
                onClick={() => this.setState({ fieldIsInput: false })}
              />
            </Fragment>
          ) : (
            <Fragment>
              <strong> Campus Name: </strong>{' '}
              <Link to={`/campuses/${value}`}>{campusName}</Link>
              <i
                className="far fa-edit fa-lg"
                onClick={() => convertFieldToForm(value)}
              />
            </Fragment>
          )}
        </div>
      )
    }

    return (
      <div>
        {fieldIsInput ? (
          <Fragment>
            <label htmlFor="field">
              <strong>{`${label}: `}</strong>
            </label>
            {inputType === 'textarea' ? (
              <textarea
                rows={5}
                cols={50}
                value={field}
                id="field"
                name="field"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            ) : (
              <input
                type="text"
                value={field}
                id="field"
                name="field"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            )}
            <i className="fas fa-check fa-lg" onClick={handleSubmit} />
            <i
              className="fas fa-times fa-lg"
              onClick={() => this.setState({ fieldIsInput: false })}
            />
          </Fragment>
        ) : (
          <Fragment>
            <strong>{`${label}: `}</strong>
            {value}
            <i
              className="far fa-edit fa-lg"
              onClick={() => convertFieldToForm(value)}
            />
          </Fragment>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => state

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
