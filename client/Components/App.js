import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchAllCampuses, fetchAllStudents } from '../store'
import { HashRouter, Route, Link } from 'react-router-dom'
import TableOfData from './TableOfData'

class App extends Component {
  componentDidMount() {
    return Promise.all([
      this.props.fetchAllCampuses(),
      this.props.fetchAllStudents()
    ])
  }

  render() {
    return (
      <HashRouter>
        <Fragment>
          <Route path="/" render={() => <Link to="/students">students</Link>} />
          <Route path="/" render={() => <Link to="/campuses">campuses</Link>} />

          <Route
            path="/campuses"
            render={({ location }) => <TableOfData path={location.pathname} />}
          />
          <Route
            path="/students"
            render={({ location }) => <TableOfData path={location.pathname} />}
          />
        </Fragment>
      </HashRouter>
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
