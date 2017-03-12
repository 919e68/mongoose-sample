import mongoose, { Schema } from 'mongoose'
import validator  from 'mongoose-validators'
mongoose.plugin(require('mongoose-exists'))

const User = new Schema({
  username: {
    type: String,
    required: [
      true,
      'username is required'
    ],
    validate: [
      validator.isLength({ message: 'username must be atleast 6 characters' }, 6, 50)
    ]
  },
  email: {
    type: String,
  },
  password: {
    type: String
  },
  firstname: {
    type: String
  },
  lastName: {
    type: String 
  },
  typeId: {
    type: Schema.Types.ObjectId,
    ref: 'UserType',
    exists: true,
    required: [
      true,
      'type is required'
    ]
  }
})

export default mongoose.model('User', User)