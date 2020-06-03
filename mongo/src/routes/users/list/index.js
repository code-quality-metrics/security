import mongodb from '../../../lib/mongodb.js'

export default async function usersList(request, response) {
  const { age } = request.body

  const col = mongodb.db.collection('users')
  const users = await col.find({ age }).toArray()

  console.log(users)

  response.status(200).send({})
}
