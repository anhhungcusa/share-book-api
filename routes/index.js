const auth = require('./auth')
const user = require('./user')
const category = require('./category')
const giveaway = require('./giveaway')
const registration = require('./registration')
module.exports = (app) =>  {
    app.use('auth', auth)
    app.use('users', user)
    app.use('categories', category)
    app.use('giveaways', giveaway)
    app.use('registrations', registration)

}