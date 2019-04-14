import React from 'react'
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

const CompleteAddressForm = ({ address, city, state, zip, handleChange }) => {
  return (
    <div>
      {createField({
        fieldLabel: 'Address',
        fieldName: 'address',
        value: address,
        handleChange
      })}
      <div className="form-row">
        <div className="form-group col-md-6">
          {createField({
            fieldLabel: 'City',
            fieldName: 'city',
            value: city,
            handleChange
          })}
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
          {createField({
            fieldLabel: 'Zip Code',
            fieldName: 'zip',
            value: zip,
            handleChange
          })}
        </div>
      </div>
    </div>
  )
}

export default CompleteAddressForm
