import app from './app.js'

app
  .start()
  .then(() => console.log('Server listening'))
  .catch(error => {
    console.error('Error starting the server')
    console.error(error)
    process.exit(1)
  })
