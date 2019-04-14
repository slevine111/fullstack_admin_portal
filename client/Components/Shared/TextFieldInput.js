import React from 'react'

const TextFieldInput = ({
  id,
  fieldLabel,
  fieldName,
  value,
  handleChange,
  handleKeyPress
}) => {
  return (
    <div className={`${id ? '' : 'form-group'}`}>
      <label htmlFor={fieldName}>{fieldLabel}</label>
      <input
        type="text"
        className={`${id ? '' : 'form-control'}`}
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={handleChange}
        onKeyPress={id ? handleKeyPress : () => {}}
      />
    </div>
  )
}

/*;<input
  type="text"
  value={field}
  id="field"
  name="field"
  onChange={handleChange}
  onKeyPress={handleKeyPress}
/>*/

export default TextFieldInput
