const router = require('express').Router()
const controller = require('../controllers/giveaway')

router.post('/', controller.registerReceiveGiveaway)

module.exports = router