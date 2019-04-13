const router = require('express').Router()
const { Student } = require('../db/index')

module.exports = router

router.get('/', (req, res, next) => {
  Student.findAll()
    .then(students => res.json(students))
    .catch(next)
})
