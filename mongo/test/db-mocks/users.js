import mongodb from '../../src/lib/mongodb.js'

export function usersInDb() {
  const col = mongodb.db.collection('users')
  return col.insertMany([
    {
      name: 'ruben',
      age: 30,
    },
    {
      name: 'albert',
      age: 31,
    },
    {
      name: 'alex',
      age: 32,
    },
    {
      name: 'katie',
      age: 33,
    },
  ])
}
