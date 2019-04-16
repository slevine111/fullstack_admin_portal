import React from 'react'

const StaticFieldInline = ({
  label,
  value,
  convertFieldToForm,
  history,
  campusName
}) => {
  return (
    <div className="row">
      <div className="col-sm-3">
        {' '}
        <strong>{label} </strong>{' '}
      </div>
      <div className="col-sm-4">
        {' '}
        {campusName || value}
        {label === 'Campus Name' ? (
          <i
            className="fas fa-external-link-alt"
            onClick={() => history.push(`/campuses/${value}`)}
          />
        ) : (
          ''
        )}
      </div>
      <i
        className="far fa-edit fa-lg col-sm-3"
        onClick={() => convertFieldToForm(value)}
      />
    </div>
  )
}

const StaticFIeldBlock = ({ className, label, value, convertFieldToForm }) => {
  return (
    <div className={className}>
      <div>
        <strong>{label}</strong>
        <i
          className="far fa-edit fa-lg"
          onClick={() => convertFieldToForm(value)}
        />
      </div>
      <div>{value}</div>
    </div>
  )
}

const SingleItemHeader = ({ value, convertFieldToForm, addedClass, label }) => {
  return (
    <div className={addedClass}>
      <h4 className="inline">{value}</h4>
      {label === 'First Name' ? (
        ' '
      ) : (
        <i
          className="far fa-edit fa-lg"
          onClick={() => convertFieldToForm(value)}
        />
      )}
    </div>
  )
}

export { StaticFieldInline, StaticFIeldBlock, SingleItemHeader }
