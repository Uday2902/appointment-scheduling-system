const { StatusCodes } = require('http-status-codes')

const Models = require('../models/index')
const Errors = require('../errors/index')


const createDoctor = async (req, res) => {

    const doctor = await Models.Doctor.create({ ...req.body })
    const token = doctor.createJWT()

    delete doctor.password

    return res.status(StatusCodes.CREATED).json({

        doctor,
        isValid: true,
        token
        
    })
}


const doctorsList = async (req, res) => {

    let result = Models.Doctor.find({});

    
    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 10;
    // const skip = (page - 1) * limit;
    
    // result = result.skip(skip).limit(limit);
    
    const doctorsList = await result;
    
    return res.status(StatusCodes.OK).json({

        doctorsList, 
        nbHits: doctorsList.length,
        isValid: true 
    
    });

}



const doctor = async (req, res) => {

    const { mongoID, email, password } = req.body

    if(mongoID)
    {
        const doctor = await Models.Doctor.findOne({ _id: mongoID })

        delete doctor.password

        return res.status(StatusCodes.OK).json({

            doctor,
            isValid: true,
            token: req.body.token
        })

    }
  
    const doctor = await Models.Doctor.findOne({ email })

    if (!doctor) {

      throw new Errors.UnauthenticatedError('Email not found')
    
    }
    
    const isPasswordCorrect = await doctor.comparePassword(password)
    
    if (!isPasswordCorrect) {
    
        throw new Errors.UnauthenticatedError('Password is incorrect')
    
    }

    const token = doctor.createJWT()

    delete doctor.password

    return res.status(StatusCodes.OK).json({

        doctor,
        isValid: true,
        token

    })

}


const doctorDetail = async (req, res) => {

    const { doctorID } = req.params

    const doctor = await Models.Doctor.findOne({ _id: doctorID })

    delete doctor.password

    console.log(doctor)

    return res.status(StatusCodes.OK).json({

        doctor,
        isValid: true,
    })

}

module.exports = {
    
    createDoctor,
    doctorsList,
    doctor,
    doctorDetail
}