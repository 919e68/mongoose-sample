import mongoose, { Schema } from 'mongoose'

const User = new Schema({
  username: {
    type: String,
    required: [
      true,
      'username is required'
    ]
  },
  email: {
    type: String,
    match: [

    ]
  },
  password: {
    type: String,
    required: [
      true,
      'password is required'
    ]
  },
  firstname: {
    type: String,
    required: [
      true,
      'first name is required'
    ]
  }
})

export default mongoose.model('User', User)