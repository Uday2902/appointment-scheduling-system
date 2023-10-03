const { StatusCodes } = require('http-status-codes')

const Models = require('../models/index')
const Errors = require('../errors/index')


const create = async (req, res) => {

    req.body["date"] = req.body["slot"].split(' ')[0]
    req.body["time"] = req.body["slot"].split(' ')[1]

    console.log(req.body)

    const appointment = await Models.Appointment.create({ ...req.body })
    
    return res.status(StatusCodes.CREATED).json({

        appointment,
        isValid: true,
    })
}

const list = async (req, res) => {

    const { id, type, date } = req.body

    console.log({id,type, date})

    let appointments = []

    if(type==="patient")
    {
        let filterObj = {}
        filterObj.patient = id

        if(date)
        filterObj.date = date

        appointments = await Models.Appointment.find(filterObj).populate('patient').populate('doctor')
    }
    else if(type==="doctor")
    {
        let filterObj = {}
        filterObj.doctor = id

        if(date)
        filterObj.date = date

        console.log(filterObj)
    
        appointments = await Models.Appointment.find(filterObj).populate('patient').populate('doctor')
    }
    else
    {
        appointments = await Models.Appointment.find({}).populate('patient').populate('doctor')
        console.log(appointments)
    }

    console.log(appointments)
    
    return res.status(StatusCodes.OK).json({

        appointments,
        nbHits: appointments.length,
        isValid: true,
    })
}


const cancel = async (req, res) => {

    const { appointmentID } = req.body

    let result = Models.Appointment.findOneAndDelete(appointmentID);

    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 10;
    // const skip = (page - 1) * limit;

    // result = result.skip(skip).limit(limit);

    

    return res.status(StatusCodes.OK).json({

        isValid: true 
    
    });

}



const update = async (req, res) => {

    const { appointmentID } = req.body

    const filter = { _id: appointmentID };
    
    const update = { ...req.body };

    req.body["data"] = req.body["slot"].split(' ')[0]
    req.body["time"] = req.body["slot"].split(' ')[1]

    const appointment = await Models.Appointment.findOneAndUpdate(filter, update, { new: true });


    return res.status(StatusCodes.OK).json({

        appointment,
        isValid: true,
    })

}


module.exports = {
    
    create,
    update,
    cancel,
    list
}