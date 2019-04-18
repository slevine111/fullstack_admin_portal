import React from 'react'

const TextFieldInput = ({
  fieldLabel,
  fieldName,
  value,
  addedClass,
  handleChange,
  handleKeyPress
}) => {
  return (
    <div
      className={`${
        handleKeyPress && !['Address', 'Full Name'].includes(fieldLabel)
          ? 'inline'
          : 'form-group'
      }`}
    >
      <label htmlFor={fieldName}>
        {handleKeyPress ? <strong>{fieldLabel}</strong> : fieldLabel}
      </label>
      <input
        type="text"
        className={`${
          handleKeyPress && !['Address', 'Full Name'].includes(fieldLabel)
            ? ''
            : 'form-control'
        } ${addedClass ? addedClass : ''}`}
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
