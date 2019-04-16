import React from 'react'
//import { connect } from 'react-redux'
import statesAndAbbreviations from '../../../bin/StateAndAbbreviations'
import TextFieldInput from '../Shared/TextFieldInput'

const CompleteAddressForm = ({
  address,
  city,
  state,
  zip,
  handleChange,
  handleKeyPress
}) => {
  const arrayOfTextInputs = [
    { fieldLabel: 'Address', fieldName: 'address', value: address },
    {
      fieldLabel: 'City',
      fieldName: 'city',
      value: city
    },
    {
      fieldLabel: 'Zip Code',
      fieldName: 'zip',
      value: zip
    }
  ].map(input => ({ ...input, handleChange }))

  return (
    <div>
      <TextFieldInput
        {...arrayOfTextInputs[0]}
        handleKeyPress={handleKeyPress}
      />
      <div className="form-row">
        <div className="form-group col-md-6">
          <TextFieldInput {...arrayOfTextInputs[1]} />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="state">State</label>
          <select
            className="form-control"
            id="state"
            name="state"
            onChange={handleChange}
            defaultValue={
              state
                ? statesAndAbbreviations.find(s => s.abbreviation === state)
                    .abbreviation
                : 'AL'
            }
          >
            {statesAndAbbreviations.map((state, idx) => (
              <option key={idx} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group col-md-2">
          <TextFieldInput {...arrayOfTextInputs[2]} />
        </div>
      </div>
    </div>
  )
}

/*const mapStateToProps = ({ campuses }, { id }) => {
  if (id) return campuses.find(campus => campus.id === id)
  return {}
}*/

//export default connect(mapStateToProps)(CompleteAddressForm)
export default CompleteAddressForm
