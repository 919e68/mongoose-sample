import mongoose from 'mongoose'
import config from '../config/config'
import User from '../models/User'
import UserType from '../models/UserType'

mongoose.connect(config.mongo)

describe('User Model', () => {

  it('it should require username', (done) => {
    let user = new User()
    user.save((err, user) => {
      expect(err.errors.username.message).toBe('username is required')
      done()
    })
  })

  it('it should validate username length', (done) => {
    let user = new User({
      username: 'abc'
    })
    user.save((err, user) => {
      expect(err.errors.username.message).toBe('username must be atleast 6 characters')
      done()
    })
  })


  it('it should validate username if already exists', (done) => {
    let user = new User({
      username: 'wilson'
    })
    user.save((err, user) => {
      expect(err.errors.username.message).toBe('username already exists')
      done()
    })
  })

  it('it should require email', (done) => {
    let user = new User()
    user.save((err, user) => {
      expect(err.errors.email.message).toBe('email is required')
      done()
    })
  })

  it('it should validate email if already exists', (done) => {
    let user = new User({
      email: 'konekred@gmail.com'
    })
    user.save((err, user) => {
      expect(err.errors.email.message).toBe('email already exists')
      done()
    })
  })

  it('it should require password', (done) => {
    let user = new User()
    user.save((err, user) => {
      expect(err.errors.password.message).toBe('password is required')
      done()
    })
  })

  it('it should validate password length', (done) => {
    let user = new User({
      password: 'ABCabc'
    })
    user.save((err, user) => {
      expect(err.errors.password.message).toBe('password must be atleast 8 characters')
      done()
    })
  })

  it('it should require first name', (done) => {
    let user = new User()
    user.save((err, user) => {
      expect(err.errors.firstName.message).toBe('first name is required')
      done()
    })
  })

  it('it should require last name', (done) => {
    let user = new User()
    user.save((err, user) => {
      expect(err.errors.lastName.message).toBe('last name is required')
      done()
    })
  })

  it('it should require type id', (done) => {
    let user = new User()
    user.save((err, user) => {
      expect(err.errors.typeId.message).toBe('type id is required')
      done()
    })
  })

  it('it should validate type id format', (done) => {
    let user = new User({
      typeId: 'abc'
    })
    user.save((err, user) => {
      expect(err.errors.typeId.name).toBe('CastError')
      done()
    })
  })

  it('it should validate type id existence', (done) => {
    let user = new User({
      typeId: '58c56d11e4510c2dcc196515'
    })
    user.save((err, user) => {
      let result = err.errors.typeId.message.indexOf('does not exists') != -1
      expect(result).toBe(true)
      done()
    })
  })

  it('it should save', (done) => {
    UserType.findOne((err, type) => {
      if (type) {
        User.remove({ username: 'arielle' }, (err, rem) => {
          let user = new User({
            username: 'arielle',
            email: 'elleira@gmail.com',
            password: 'ABC12abc',
            firstName: 'Arielle Marie',
            lastName: 'Andrade',
            typeId: type._id
          })

          user.save((err, user) => {
            expect(err).toBe(null)
            if (user) {
              user.remove()  
            }
            done()
          })
        })
      }
    })
  })
})
