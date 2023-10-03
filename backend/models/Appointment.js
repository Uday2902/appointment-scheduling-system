const mongoose = require('mongoose')


const AppointmentSchema = new mongoose.Schema({

  patient:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Patient",
    required:true,
  },
  doctor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Doctor",
    required:true,
  },
  slot:{
    type: String,
    required: [true, "Please provide slot"],
    trim: true
  },
  issue:{
    type:String,
    default: "none",
    trim:true,
  },
  prescription: {
    type: String,
    default: "none",
    trim: true
  },
  tokenNo:{
    type:String,
    default:"-1",
    trim:true,
  },
  date:{
    type: String,
    required: [true, "Please provide date"],
    trim: true
  },
  time:{
    type: String,
    required: [true, "Please provide time"],
    trim: true
  },
},
  { timestamps: true }
);


module.exports = mongoose.model('Appointment', AppointmentSchema)