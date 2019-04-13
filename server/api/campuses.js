const router = require('express').Router()
const { Campus, Student } = require('../db/index')

module.exports = router

router.get('/', (req, res, next) => {
  Campus.findAll()
    .then(campuses => res.json(campuses))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Campus.create(req.body)
    .then(campus => res.json(campus))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Student.destroy({ where: { campusId: req.params.id } })
    .then(() => Campus.destroy({ where: { id: req.params.id } }))
    .then(() => res.sendStatus(204))
    .catch(next)
})
