const router = require('express').Router()
const controller = require('../controllers/user')
const authMiddleware = require('../middlewares/auth')
router.post('/', controller.registerUser)
router.get('/:id', authMiddleware.isAuthorized, controller.getUserById)
router.get('/:id/giveaways', authMiddleware.isAuthorized, controller.getGiveawaysOfUser)

module.exports = router