import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { createNewItemAndUpdate } from '../../store'
import CampusDropdown from '../Shared/CampusDropdown'
import TextFieldInput from '../Shared/TextFieldInput'
import { image } from 'faker'

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  imageUrl: '',
  gpa: '',
  campusId: '',
  formShowed: false
}

class CreateCampusForm extends Component {
  constructor() {
    super()
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentCampusId !== this.props.currentCampusId) {
      this.setState({ campusId: this.props.currentCampusId })
    }
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    return this.props
      .createNewStudentAndUpdate({
        ...this.state,
        imageUrl: this.state.imageUrl || image.people()
      })
      .then(() => this.setState(initialState))
  }

  handleClick() {
    const { formShowed, campusId } = this.state
    const newValue = formShowed ? false : campusId !== ''
    this.setState({ formShowed: newValue })
  }

  render() {
    const {
      firstname,
      lastname,
      email,
      imageUrl,
      gpa,
      campusId,
      formShowed
    } = this.state
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
            <CampusDropdown
              handleChange={this.handleChange}
              currentCampusId={campusId}
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

const mapStateToProps = ({ campuses }) => {
  return {
    campuses: campuses.map(campus => ({ id: campus.id, name: campus.name })),
    currentCampusId: campuses[0] ? campuses[0].id : ''
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
