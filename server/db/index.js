const Student = require('./models/Student')
const Campus = require('./models/Campus')
const connection = require('./connection')

const setAssociations = () => {
  return Promise.all([
    Student.belongsTo(Campus, { onDelete: 'CASCADE' }),
    Campus.hasMany(Student)
  ])
}

function dbInit(force = false) {
  return connection
    .authenticate()
    .then(() => setAssociations())
    .then(() => connection.sync({ force }))
}

module.exports = { dbInit, Student, Campus }
