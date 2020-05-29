const router = require('express').Router()
const controller = require('../controllers/giveaway')
const authMiddleware = require('../middlewares/auth')

router.get('/', controller.getGiveaways)
router.get('/:id/registrations', controller.getRegistrationsOfGiveaway)
router.post('/', authMiddleware.isAuthorized, controller.addGiveaway)
router.patch('/:id', authMiddleware.isAuthorized, controller.updateWinnerInfo)
router.patch('/:id/start', authMiddleware.isAuthorized, controller.startGiveaway)
router.delete('/:id', authMiddleware.isAuthorized, controller.removeGiveaway)

module.exports = router