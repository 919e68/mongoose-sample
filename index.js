import config from './config/config'
import mongoose from 'mongoose'

import User from './models/User'
import UserType from './models/UserType'

mongoose.connect(config.mongo, (err) => {
  if (err) {
    console.log('database err: database is closed')
  }
})







