import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

//action types
const GOT_CAMPUSES = Symbol('GOT_CAMPUSES')
const GOT_STUDENTS = Symbol('GOT_STUDENTS')

//action creators
const gotCampuses = campuses => ({ type: GOT_CAMPUSES, campuses })
const gotStudents = students => ({ type: GOT_STUDENTS, students })

//thunks
export const fetchAllCampuses = () => {
  return dispatch => {
    return axios
      .get('/api/campuses')
      .then(({ data }) => dispatch(gotCampuses(data)))
  }
}

export const fetchAllStudents = () => {
  return dispatch => {
    return axios
      .get('/api/students')
      .then(({ data }) => dispatch(gotStudents(data)))
  }
}

//reudcers
const campusesReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_CAMPUSES:
      return action.campuses
    default:
      return state
  }
}

const studentsReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_STUDENTS:
      console.log(state)
      return action.students
    default:
      return state
  }
}

//store
const store = createStore(
  combineReducers({ campuses: campusesReducer, students: studentsReducer }),
  applyMiddleware(thunk)
)

export default store
