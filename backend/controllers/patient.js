const { StatusCodes } = require('http-status-codes')

const Models = require('../models/index')
const Errors = require('../errors/index')


const createPatient = async (req, res) => {

    const patient = await Models.Patient.create({ ...req.body })
    const token = patient.createJWT()

    delete patient.password

    console.log(patient)

    return res.status(StatusCodes.CREATED).json({

        patient,
        isValid: true,
        token
        
    })
}


const patientsList = async (req, res) => {

    let result = Models.Patient.find({});

    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 10;
    // const skip = (page - 1) * limit;

    // result = result.skip(skip).limit(limit);

    const patientsList = await result;

    return res.status(StatusCodes.OK).json({

        patientsList, 
        nbHits: patientsList.length,
        isValid: true 
    
    });

}



const patient = async (req, res) => {

    const { mongoID, email, password } = req.body

    
    if(mongoID)
    {
        const patient = await Models.Patient.findOne({ _id: mongoID })
        
        delete patient.password
        
        return res.status(StatusCodes.OK).json({
            
            patient,
            isValid: true,
            token: req.body.token
        })
        
    }
    
    
    const patient = await Models.Patient.findOne({ email })
    console.log(patient)
    
    if (!patient) {

      throw new Errors.UnauthenticatedError('Email not found')
    
    }
    
    const isPasswordCorrect = await patient.comparePassword(password)


    if (!isPasswordCorrect) {
        
        throw new Errors.UnauthenticatedError('Password is incorrect')

    }

    
    const token = patient.createJWT()
    delete patient.password


    return res.status(StatusCodes.OK).json({

        patient,
        isValid: true,
        token
        
    })

}


const patientDetail = async (req, res) => {

    const { patientID } = req.params

    const patient = await Models.Patient.findOne({ _id: patientID })

    delete patient.password

    return res.status(StatusCodes.OK).json({

        patient,
        isValid: true,
    })

}


module.exports = {
    
    createPatient,
    patientsList,
    patient,
    patientDetail
}