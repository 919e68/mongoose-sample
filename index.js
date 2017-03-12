import config from './config/config'
import mongoose from 'mongoose'

import User from './models/User'
import UserType from './models/UserType'

mongoose.connect(config.mongo, (err) => {
  if (err) {
    console.log('database err: database is closed')
  }
})

// let user = new User({ username: 'arielle' })
// user.save((err) => {
//   if (err) {
//     console.log(err)
//   }
// })

let type = new UserType({ name: 'admin' })
type.save((err) => {
  if (err) {
    console.log(err)
  }
})

