import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

//action types
const GOT_CAMPUSES = Symbol('GOT_CAMPUSES')
const GOT_STUDENTS = Symbol('GOT_STUDENTS')
const CREATED_CAMPUS = Symbol('CREATED_CAMPUS')
const CREATED_STUDENT = Symbol('CREATED_STUDENT')
const DELETED_CAMPUS = Symbol('DELETED_CAMPUS')
const DELETED_STUDENT = Symbol('DELETED_STUDENT')
const UPDATED_CAMPUS = Symbol('UPDATED_CAMPUS')
const UPDATED_STUDENT = Symbol('UPDATED_STUDENT')

//action creators
const gotCampuses = campuses => ({ type: GOT_CAMPUSES, campuses })
const gotStudents = students => ({ type: GOT_STUDENTS, students })
const createdCampus = newCampus => ({ type: CREATED_CAMPUS, newCampus })
const createdStudent = newStudent => ({ type: CREATED_STUDENT, newStudent })
const deletedCampus = deletedCampusId => ({
  type: DELETED_CAMPUS,
  deletedCampusId
})
const deletedStudent = deletedStudentId => ({
  type: DELETED_STUDENT,
  deletedStudentId
})
const updatedCampus = (id, changedCampus) => ({
  type: UPDATED_CAMPUS,
  id,
  changedCampus
})
const updatedStudent = (id, changedStudent) => ({
  type: UPDATED_STUDENT,
  id,
  changedStudent
})

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

export const createNewItemAndUpdate = (model, itemData) => {
  const actionToDispatch = model === 'campuses' ? createdCampus : createdStudent
  return dispatch => {
    return axios
      .post(`/api/${model}`, itemData)
      .then(({ data }) => dispatch(actionToDispatch(data)))
  }
}

export const deleteCampusAndUpdate = itemId => {
  return dispatch => {
    return axios
      .delete(`/api/campuses/${itemId}`)
      .then(() => dispatch(deletedCampus(itemId)))
      .then(() => dispatch(fetchAllStudents()))
  }
}

export const deleteStudentAndUpdate = studentId => {
  return dispatch => {
    return axios
      .delete(`/api/students/${studentId}`)
      .then(() => dispatch(deletedStudent(studentId)))
  }
}

export const updateItemAndChangeStore = (model, id, itemData) => {
  const actionToDispatch = model === 'campuses' ? updatedCampus : updatedStudent
  return dispatch => {
    return axios
      .put(`/api/${model}/${id}`, itemData)
      .then(({ data }) => dispatch(actionToDispatch(id, data)))
  }
}

//reudcers
const campusesReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_CAMPUSES:
      return action.campuses
    case CREATED_CAMPUS:
      return [...state, action.newCampus]
    case DELETED_CAMPUS:
      return state.filter(campus => campus.id !== action.deletedCampusId)
    case UPDATED_CAMPUS:
      return state.map(campus =>
        campus.id === action.id ? action.changedCampus : campus
      )
    default:
      return state
  }
}

const studentsReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_STUDENTS:
      return action.students
    case CREATED_STUDENT:
      return [...state, action.newStudent]
    case DELETED_STUDENT:
      return state.filter(student => student.id !== action.deletedStudentId)
    case UPDATED_STUDENT:
      return state.map(student =>
        student.id === action.id ? action.changedStudent : student
      )
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
