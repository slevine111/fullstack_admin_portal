import React from 'react'

const TextFieldInput = ({
  fieldLabel,
  fieldName,
  value,
  handleChange,
  handleKeyPress
}) => {
  console.log(value)
  return (
    <div
      className={`${
        handleKeyPress && fieldLabel !== 'Address' ? 'inline' : 'form-group'
      }`}
    >
      <label htmlFor={fieldName}>
        {handleKeyPress ? <strong>{fieldLabel}</strong> : fieldLabel}
      </label>
      <input
        type="text"
        className={`${
          handleKeyPress && fieldLabel !== 'Address' ? '' : 'form-control'
        } `}
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress ? handleKeyPress : () => {}}
      />
    </div>
  )
}

export default TextFieldInput
