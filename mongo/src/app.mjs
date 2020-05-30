import express from 'express'
import awaitjs from '@awaitjs/express'
import mongodb from 'mongodb'
import assert from 'assert'

const url = 'mongodb://msec_db:27017';
const dbName = 'mongosecurity';

const app = awaitjs.addAsync(express());
const port = 5555

// Use connect method to connect to the server
let db
mongodb.MongoClient.connect(url, function(err, client) {
  assert.equal(null, err)
  console.log('Connected to MongoDB')
 
  db = client.db(dbName)
})

app.post('/doc', (req, res) => {
  const col = db.collection('documents')
  
  col.insert({ epoch: Date.now() }, function (error, result) {
    if (error) { throw error }
    res.status(200).send({})
  })
})

app.get('/doc', (req, res) => {
  const col = db.collection('documents')

  col.find({}).toArray(function (error, docs) {
    if (error) {
      throw error
    }

    res.status(200).send({ docs })
  })
})

app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`App listening at http://localhost:${port}`))