import React, { Component } from 'react'
import { connect } from 'react-redux'
import TableOfData from '../Shared/TableOfData'
import CreateCampusForm from './CreateCampusForm'

class AllCampusesView extends Component {
  constructor() {
    super()
    this.state = { formShowed: false }
  }

  render() {
    const { campuses, dataHeaders } = this.props
    const { formShowed } = this.state
    return (
      <div>
        <button
          type="button"
          onClick={() =>
            this.setState(curState => ({ formShowed: !curState.formShowed }))
          }
        >
          {formShowed ? '-' : '+'}
        </button>

        {formShowed && <CreateCampusForm />}

        <TableOfData data={campuses} dataHeaders={dataHeaders} />
      </div>
    )
  }
}

const mapStateToProps = ({ campuses }) => ({
  campuses,
  dataHeaders: ['Index', 'Campus Name', 'Address']
})

export default connect(mapStateToProps)(AllCampusesView)
