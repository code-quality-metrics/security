import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app.js'
import { usersInDb } from './db-mocks/users.js'
import mongodb from '../src/lib/mongodb.js'

const should = chai.should()
chai.use(chaiHttp)

describe('Users', function () {
  before(async function () {
    await app.start().then(() => console.log('App listening'))
  })

  beforeEach(async function () {
    try {
      await mongodb.db.dropCollection('users')
    } catch (error) {}
  })

  it('should ping', async function () {
    const res = await chai.request(app).get('/ping')
    res.should.have.status(200)
    res.text.should.be.equal('pong')
  })

  it('should list users', async function () {
    await usersInDb()
    const res = await chai.request(app).post('/users/list').send({ age: 30 })

    res.should.have.status(200)
  })
})
