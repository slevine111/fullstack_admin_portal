const connection = require('../connection')
const Sequelize = require('sequelize')

const Campus = connection.define('campus', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://wustl.edu/wp-content/uploads/2014/09/danforth-aerial.jpg'
  },
  description: Sequelize.TEXT
})

module.exports = Campus
