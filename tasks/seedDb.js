import config from '../config/config'
import User from '../models/User'
import UserType from '../models/UserType'

import mongoose from 'mongoose'
mongoose.connect(config.mongo)

const userTypes = [
  {
    name: 'user'
  },
  {
    name: 'admin'
  },
  {
    name: 'manager'
  }
]

const users = [
  {
    username: 'wilson',
    email: 'konekred@gmail.com',
    password: 'ABC12abc',
    firstName: 'Wilson',
    lastName: 'Anciro'
  }
]

let insertTypes = userTypes.map((type) => {
  return new Promise((resolve, reject) => {
    let userType = new UserType(type)
    userType.save((err) => {
      let errors = []
      if (err) {
        for (let field in err.errors) {
          errors.push({ key: field, msg: err.errors[field].message })
        }
      }

      resolve({ ok: err? false : true, data: userType, errors: errors })
    })
  })
})

Promise.all(insertTypes).then((res) => { 
  console.log('UserTypes', JSON.stringify(res, null, 2))

  UserType.find((err, types) => {
    let insertUsers = users.map((user) => {
      

      return new Promise((resolve, reject) => {
        let typeId = types[Math.floor(Math.random() * types.length)]._id
        let newUser = new User(user)
        newUser.typeId = typeId

        newUser.save((err) => {
          let errors = []
          if (err) {
            for (let field in err.errors) {
              errors.push({ key: field, msg: err.errors[field].message })
            }
          }

          resolve({ ok: err? false : true, data: newUser, errors: errors })
        })
      })
    })

    Promise.all(insertUsers).then((res) => {
      console.log('Users', JSON.stringify(res, null, 2))
    })
  })
})
