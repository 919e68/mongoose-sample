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
      validator.isLength({ message: 'username must be atleast 6 characters' }, 6, 50),
      {
        validator: function(username, callback) {
          let query = { username: username }
          if (this._id) 
            query._id = { '$ne': this._id }

          mongoose.models['User'].findOne(query, (err, user) => {
            if (user) {
              callback(false)
            } else {
              callback(true)
            }
          })
        },
        message: 'username already exists'
      }
    ]
  },
  email: {
    type: String,
    required: [
      true,
      'email is required'
    ],
    validate: [
      validator.isEmail({ message: 'invalid email' }),
      {
        validator: function(email, callback) {
          let query = { email: email }
          if (this._id) 
            query._id = { '$ne': this._id }

          mongoose.models['User'].findOne(query, (err, user) => {
            if (user) {
              callback(false)
            } else {
              callback(true)
            }
          })
        },
        message: 'email already exists'
      }
    ]
  },
  password: {
    type: String,
    required: [
      true,
      'password is required'
    ],
    validate: [
      validator.isLength({ message: 'password must be atleast 8 characters' }, 8)
    ]
  },
  firstName: {
    type: String,
    required: [
      true,
      'first name is required'
    ]
  },
  lastName: {
    type: String,
    required: [
      true,
      'last name is required'
    ]
  },
  typeId: {
    type: Schema.Types.ObjectId,
    ref: 'UserType',
    exists: true,
    required: [
      true,
      'type id is required'
    ]
  }
})

export default mongoose.model('User', User)