import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { updateItemAndChangeStore } from '../../store'
import { Link } from 'react-router-dom'

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
  }

  handleChange({ target }) {
    this.setState({ field: target.value })
  }

  handleSubmit() {
    const {
      updateItemAndChangeStore,
      id,
      data,
      databaseColumnName
    } = this.props
    return updateItemAndChangeStore(id, {
      ...data,
      [databaseColumnName]: this.state.field
    }).then(() => {
      this.setState({ fieldIsInput: false })
    })
  }

  convertFieldToForm(value) {
    this.setState({ field: value, fieldIsInput: true })
  }

  render() {
    const { convertFieldToForm, handleChange, handleSubmit } = this
    const { label, value, campusName, campuses } = this.props
    const { field, fieldIsInput } = this.state

    if (label === 'Campus Name') {
      return (
        <div>
          {fieldIsInput ? (
            <Fragment>
              <label htmlFor="campuses">Campuses</label>
              <select
                className="form-control"
                id="campuses"
                name="campusId"
                onChange={this.handleChange}
                defaultValue={value}
              >
                {campuses.map(campus => {
                  const { id, name } = campus
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  )
                })}
              </select>
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
            <input
              type="text"
              value={field}
              id="field"
              name="field"
              onChange={handleChange}
              onKeyPress={event => {
                if (event.which === 13) handleSubmit()
              }}
            />
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
    updateItemAndChangeStore: (studentId, changedStudent) =>
      dispatch(updateItemAndChangeStore('students', studentId, changedStudent))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataAttribute)
