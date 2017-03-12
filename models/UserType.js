import mongoose, { Schema } from 'mongoose'
import validator  from 'mongoose-validators'

const UserType = new Schema({
  name: {
    type: String,
    required: [
      true,
      'user type name is required'
    ],
    validate: [
      validator.isLength({ message: 'type must be atleast 3 characters' }, 3, 50),
      {
        validator: function(name, callback) {
          let query = { name: name }
          if (this._id) 
            query._id = { '$ne': this._id }

          mongoose.models['UserType'].findOne(query, (err, userType) => {
            if (userType) {
              callback(false)
            } else {
              callback(true)
            }
          })
        },
        message: 'type already exists'
      }
    ]
  }
})

export default mongoose.model('UserType', UserType)