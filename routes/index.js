const auth = require('./auth')
const user = require('./user')
const category = require('./category')
const giveaway = require('./giveaway')
const registration = require('./registration')
module.exports = (app) =>  {
    const prefix = '/api/v1'
    app.use(`${prefix}/auth`, auth)
    app.use(`${prefix}/users`, user)
    app.use(`${prefix}/categories`, category)
    app.use(`${prefix}/giveaways`, giveaway)
    app.use(`${prefix}/registrations`, registration)
}