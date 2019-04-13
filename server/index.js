const app = require('./app')
const { dbInit } = require('./db/index')

const PORT = process.env.PORT || 3000

dbInit()
  .then(() => {
    app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))
  })
  .catch(err => {
    console.log('syncing of database failed for following reason:')
    console.log(err)
  })
