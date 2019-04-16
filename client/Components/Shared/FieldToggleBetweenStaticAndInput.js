import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateItemAndChangeStore } from '../../store'

const FieldToggleBetweenStaticAndInput = (InputComponent, StaticComponent) => {
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
      if (this.props.address || this.props.label === 'Student Full Name') {
        this.setState({ [target.name]: target.value }, () =>
          console.log(this.state)
        )
      } else {
        this.setState({ field: target.value }, () => console.log(this.state))
      }
    }

    handleSubmit() {
      console.log('this.state', this.state)
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

      let updatedItem
      if (this.state.firstname) {
        const { firstname, lastname } = this.state
        updatedItem = { ...data, firstname, lastname }
      } else {
        updatedItem = { ...data, [databaseColumnName]: updatedField }
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
      } else if (this.props.label === 'Student Full Name') {
        this.setState({
          firstname: this.props.firstname,
          lastname: this.props.lastname,
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
          <InputComponent
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
        <StaticComponent
          {...this.props}
          convertFieldToForm={this.convertFieldToForm}
        />
      )
    }
  }

  const mapStateToProps = (state, { model, databaseColumnName, id }) => {
    const data = state[model].find(item => item.id === id)
    let obj = {
      data,
      value: data[databaseColumnName]
    }
    if (databaseColumnName === 'fullname') {
      const [firstname, lastname] = obj.value.split(' ')
      obj = { ...obj, firstname, lastname }
    }
    return obj
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

export default FieldToggleBetweenStaticAndInput
