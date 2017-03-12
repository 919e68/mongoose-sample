import User from '../models/User'
import UserType from '../models/UserType'

describe('User Model', () => {
  it('it should validate username if min characters pass', (done) => {
    let user = new User({
      username: 'abc'
    })

    user.save((err, user) => {
      expect(err.errors.username.message).toBe('username must be atleast 6 characters')
      done()
    })
  })

  it('it should validate username if already exists', (done) => {

    let newUser = new User({
      username: 'wilson',
      email: 'example@mail.com'
      password: 'ABC12abc',
      firstName: 'Wilson',
      lastName: 'Anciro'
    })

    let typeId = (callback) => {
      UserType.findOne({ name: 'admin' }, (err, userType) => {
        let newType = new UserType({
          name: 'admin'
        })

        newType.save((err) => {
          if (!err) {
            newUser.typeId = userType._id
            newUser.save((err) => {
              if (!err) {
                callback(newType._id)
              }
            })
          }
        })
      })
    }

    User.findOne({ username: newUser.username }, (err, user) => {

    })

    let user = new User({
      username: 'abc'
    })

    user.save((err, user) => {
      expect(err.errors.username.message).toBe('username must be atleast 6 characters')
      done()
    })
  })
})
