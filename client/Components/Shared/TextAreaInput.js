import React from 'react'

const TextAreaInput = ({ label, value, handleChange, handleKeyPress }) => {
  return (
    <div className="form-group campus-description">
      <label htmlFor="field">
        <strong>{`${label}: `}</strong>
      </label>
      <div>
        <textarea
          rows={5}
          cols={70}
          value={value}
          id="field"
          name="field"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  )
}

export default TextAreaInput
