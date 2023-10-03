const express = require('express')
const router = express.Router()

const controllers = require('../controllers/index')
const middlewares = require('../middlewares/index')

router.route('/registration').post(controllers.patient.createPatient)
router.route('/login').post(middlewares.auth, controllers.patient.patient)
router.route('/list').get(controllers.patient.patientsList)
router.route('/:patientID').get(controllers.patient.patientDetail)

module.exports = router