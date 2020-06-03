import mongodb from 'mongodb'

const url = 'mongodb://msec_db:27017'
const dbName = 'mongosecurity'

class PoolClient {
  constructor() {
    this.db = null
    this.client = null
  }

  connect() {
    return new Promise((resolve, reject) => {
      mongodb.MongoClient.connect(
        url,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (error, client) => {
          if (error) {
            reject(error)
            return
          }
          console.log('Connected to MongoDB')

          this.client = client
          this.db = client.db(dbName)
          resolve()
        },
      )
    })
  }
}

export default new PoolClient()
