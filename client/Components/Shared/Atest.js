import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateItemAndChangeStore } from '../../store'
import CompleteAddressForm from '../Campus/CompleteAddressForm'
import CampusDropdown from './CampusDropdown'
import TextFieldInput from './TextFieldInput'

const AtestWrapper = (ComponentOne, ComponentTwo) => {
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
        console.log(target)
        console.log(this.state)
        this.setState({ [target.name]: target.value }, () =>
          console.log(this.state)
        )
      } else {
        this.setState({ field: target.value }, () => console.log(this.state))
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
      const eventMethods = (({
        convertFieldToForm,
        handleChange,
        handleSubmit,
        handleKeyPress
      }) => ({
        convertFieldToForm,
        handleChange,
        handleSubmit,
        handleKeyPress
      }))(this)

      return this.state.fieldIsInput ? (
        <div>
          <ComponentOne
            {...eventMethods}
            {...this.props}
            {...this.state}
            value={this.state.field}
          />
          <i className="fas fa-check fa-lg" onClick={this.handleSubmit} />
          <i
            className="fas fa-times fa-lg"
            onClick={() => this.setState({ fieldIsInput: false })}
          />
        </div>
      ) : (
        <ComponentTwo
          {...this.props}
          convertFieldToForm={this.convertFieldToForm}
        />
      )
    }
  }

  const mapStateToProps = (state, { model, databaseColumnName, id }) => {
    const data = state[model].find(item => item.id === id)
    return {
      data,
      value: data[databaseColumnName]
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      updateItemAndChangeStore: (model, studentId, changedStudent) =>
        dispatch(updateItemAndChangeStore(model, studentId, changedStudent))
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(DataAttribute)
}

export default AtestWrapper
