const { address, image, internet, name, lorem } = require('faker')
const { dbInit, Campus, Student } = require('../server/db/index')

const createSeedInstances = (model, instances) => {
  return Promise.all(instances.map(i => model.create(i)))
}

const createFourCampuses = () => {
  let arrayOfCampus = []
  for (let i = 0; i <= 3; ++i) {
    let currentCampus = {
      name: address.city(),
      address: `${address.streetAddress()}, ${address.city()}, ${address.stateAbbr()} ${address.zipCode()}`,
      imageUrl: image.city(),
      description: lorem.paragraph()
    }
    arrayOfCampus.push(currentCampus)
  }
  return arrayOfCampus
}

const createFiftyStudents = idsOfCampuses => {
  let arrayOfStudents = []
  for (let i = 0; i <= 49; ++i) {
    let currentStudent = {
      firstname: name.firstName(),
      lastname: name.lastName(),
      email: internet.email(),
      imageUrl: image.people(),
      gpa: Number((Math.random() * 4).toFixed(2)),
      campusId: idsOfCampuses[Math.round(Math.random() * 3)]
    }
    arrayOfStudents.push(currentStudent)
  }
  return arrayOfStudents
}

const syncAndSeed = () => {
  return dbInit(true)
    .then(() => createSeedInstances(Campus, createFourCampuses()))
    .then(campuses => campuses.map(campus => campus.id))
    .then(idsOfCampuses =>
      createSeedInstances(Student, createFiftyStudents(idsOfCampuses))
    )
    .then(() => console.log('database successfully seeded!'))
    .catch(err => {
      console.log('below error occured in seeding:')
      console.log(err)
    })
}

module.exports = syncAndSeed
