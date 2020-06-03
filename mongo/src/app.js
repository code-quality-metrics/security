import express from 'express'
import awaitjs from '@awaitjs/express'
import bodyParser from 'body-parser'
import mongodb from './lib/mongodb.js'
import config from './config/index.js'
import routes from './routes/index.js'

const app = awaitjs.addAsync(express())

app.use(bodyParser.json())

app.use(routes)

app.get('/ping', (req, res) => res.send('pong'))

app.start = () =>
  new Promise((resolve, reject) => {
    console.log('App is connecting')
    mongodb
      .connect()
      .then(() => {
        console.log('Connected to DB')
        app.listen.call(app, config.port, '0.0.0.0', () => {
          console.log(`App listening on 0.0.0.0`)
          resolve(app)
        }
        )
      })
      .catch(error => reject(error))
  })

export default app
