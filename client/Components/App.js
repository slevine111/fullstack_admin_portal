import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchAllCampuses, fetchAllStudents } from '../store'
import { HashRouter, Route, Link } from 'react-router-dom'
import AllCampusesView from './Campus/AllCampusesView'
import AllStudentsView from './Student/AllStudentsView'
import SingleCampus from './Campus/SingleCampus'
import SingleStudent from './Student/SingleStudent'
import Navbar from './Navbar'

class App extends Component {
  componentDidMount() {
    return Promise.all([
      this.props.fetchAllCampuses(),
      this.props.fetchAllStudents()
    ])
  }

  render() {
    return (
      <div className="container">
        <HashRouter>
          <Fragment>
            <Route component={Navbar} />
            <Route exact path="/" render={() => <div>Portal</div>} />
            <Route exact path="/campuses" component={AllCampusesView} />
            <Route exact path="/students" component={AllStudentsView} />
            <Route path="/campuses/:id" component={SingleCampus} />
            <Route path="/students/:id" component={SingleStudent} />
          </Fragment>
        </HashRouter>
      </div>
    )
  }
}

//const mapStateToProps = state => state

const mapDispatchToProps = dispatch => {
  return {
    fetchAllCampuses: () => dispatch(fetchAllCampuses()),
    fetchAllStudents: () => dispatch(fetchAllStudents())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
