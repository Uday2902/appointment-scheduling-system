const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const PatientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please provide Patient\'s Full name'],
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide Patient\'s Phone Number'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide Ptient\'s Email'],
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
        ],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide Patient\'s password'],
        trim: true,
    },
    age: {
      type: String,
        required: [true, 'Please provide Patient\'s Age'],
        trim: true,
    },
    weight: {
        type: String,
        required: [true, 'Please provide Patient\'s Weight'],
        trim: true,
        default:"0"
    },
    height: {
        type: String,
        required: [true, 'Please provide Patient\'s Height'],
        trim: true,
        default:"0"
    },
    gender: {
      type: String,
      required: [true, 'Please provide Patient\'s Gender'],
      trim: true,
    },
    disability:{
      type: Boolean,
      default: false,
      trim:true,
    }
    
},
  { timestamps: true }
);


PatientSchema.pre('save', async function () {

  if (!this.isModified('password')) return

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

})


PatientSchema.methods.createJWT = function () {

  return jwt.sign (
    
    { mongoID: this._id, email: this.email },
    
    process.env.JWT_SECRET,
    
    {
      expiresIn: process.env.JWT_LIFETIME
    }

  )
}


PatientSchema.methods.comparePassword = async function (patientPassword) {

  const isMatch = await bcrypt.compare(patientPassword, this.password)
  return isMatch

}


module.exports = mongoose.model('Patient', PatientSchema)
