const router = require('express').Router()
const controller = require('../controllers/auth')
router.post('/login', controller.login)

module.exports = router