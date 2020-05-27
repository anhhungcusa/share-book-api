const router = require('express').Router()
const controller = require('../controllers/category')
const authMiddleware = require('../middlewares/auth')

router.get('/', controller.getAllCategories)
router.post('/', authMiddleware.isAuthorized, controller.addCategory)

module.exports = router