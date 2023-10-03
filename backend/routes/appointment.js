const express = require('express')
const router = express.Router()

const controllers = require('../controllers/index')
const middlewares = require('../middlewares/index')


router.route('/create').post(controllers.appointment.create)
router.route('/cancel').post(controllers.appointment.cancel)
router.route('/update').post(controllers.appointment.update)
router.route('/list').post(controllers.appointment.list)
// router.route('/:doctorID').get(controllers.doctor.DoctorsList)


module.exports = router