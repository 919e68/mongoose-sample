import config from './config/config'
import mongoose from 'mongoose'

import User from './models/User'
import UserType from './models/UserType'

mongoose.connect(config.mongo, (err) => {
  if (err) {
    console.log('database err: database is closed')
  }
})

UserType.findOne((err, type) => {
  if (type) {
    console.log(err, type)

    let user = new User({
      username: 'arielle',
      email: 'elleira@gmail.com',
      password: 'ABC12abc',
      firstName: 'Arielle Marie',
      lastName: 'Andrade',
      typeId: type._id
    })

    user.save((err, user) => {
      
      console.log(err, user)
    })
  }
})






