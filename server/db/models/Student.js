const connection = require('../connection')
const Sequelize = require('sequelize')

const Student = connection.define('student', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'DefaultStudent.png'
  },
  gpa: {
    type: Sequelize.DECIMAL(3, 2),
    validate: {
      min: 0,
      max: 4
    }
  },
  fullname: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${this.getDataValue('firstname')} ${this.getDataValue(
        'lastname'
      )}`
    }
  }
})

module.exports = Student
