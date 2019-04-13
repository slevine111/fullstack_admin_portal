const express = require('express')
const app = express()
const volleyball = require('volleyball')
const path = require('path')

module.exports = app

app.use(volleyball)
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, '..', 'public')))

app.use('/api/campuses', require('./api/campuses'))
app.use('/api/students', require('./api/students'))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
})
