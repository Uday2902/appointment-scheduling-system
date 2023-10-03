const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const DoctorSchema = new mongoose.Schema({
  name:{
    type:String,
    required: [true, 'Please provide Doctor\'s Name'],
    trim:true,
  },
  phoneNumber:{
    type: String,
    required: [true, 'Please provide Doctor\'s Phone Number'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide Doctor\'s Email'],
    match: [
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Please provide a valid email',
    ],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide Doctor password'],
    trim: true,
  },
  age: {
    type: String,
    required: [true, 'Please provide Doctor\'s Age'],
    trim: true,
  },
  speciality:{
    type: String,
    required: [true, 'Please provide Doctor\'s Age'],
    trim: true,
  },
  venue:{
    type: String,
    required: [true, 'Please provide Doctor\'s Venue'],
    trim: true,
  }
},
  {timestamps:true}
);



DoctorSchema.pre('save', async function () {

  if (!this.isModified('password')) return

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

})



DoctorSchema.methods.createJWT = function () {

  return jwt.sign (

    { mongoID: this._id, email: this.email },
    
    process.env.JWT_SECRET,
    
    {
      expiresIn: process.env.JWT_LIFETIME
    }

  )
}



DoctorSchema.methods.comparePassword = async function (doctorPassword) {

  const isMatch = await bcrypt.compare(doctorPassword, this.password)
  return isMatch

};



module.exports = mongoose.model('Doctor', DoctorSchema)