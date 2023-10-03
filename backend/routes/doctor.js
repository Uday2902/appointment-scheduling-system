const express = require('express')
const router = express.Router()

const controllers = require('../controllers/index')
const middlewares = require('../middlewares/index')


router.route('/registration').post(controllers.doctor.createDoctor)
router.route('/login').post(middlewares.auth, controllers.doctor.doctor)
router.route('/list').get(controllers.doctor.doctorsList)
router.route('/:doctorID').get(controllers.doctor.doctorDetail)


module.exports = router