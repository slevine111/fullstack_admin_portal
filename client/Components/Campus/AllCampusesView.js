import React from 'react'
import { connect } from 'react-redux'
import CreateCampusForm from './CreateCampusForm'
import CampusRow from './CampusRow'

const AllCampusesView = ({ campuses, history }) => {
  return (
    <div>
      <CreateCampusForm />
      {campuses.map((campus, idx) => (
        <CampusRow
          key={campus.id}
          index={idx + 1}
          history={history}
          campus={campus}
        />
      ))}
    </div>
  )
}

const mapStateToProps = ({ campuses }) => ({ campuses })

export default connect(mapStateToProps)(AllCampusesView)
