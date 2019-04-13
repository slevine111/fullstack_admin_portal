const Sequelize = require('sequelize')

const connection = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/fullstack_admin_portal'
)

module.exports = connection
