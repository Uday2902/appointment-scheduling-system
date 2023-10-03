const { StatusCodes } = require('http-status-codes')

const Errors = require('../errors/index')

const errorHandler = (err, req, res, next) => {

  let customError = {
    
    // set default

    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
    isValid: err.isValid || false
  
  }

  
  if (err instanceof Errors.CustomAPIError) {

    return res.status(err.statusCode).json({ msg: err.message, isValid: err.isValid })
  
  }

  if (err.name === 'ValidationError') {

    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')

    // customError.msg = "validation failed"
    customError.statusCode = StatusCodes.BAD_REQUEST

  }

  if (err.code && err.code === 11000) {

    // customError.msg = `Duplicate value entered for ${Object.keys(
    //   err.keyValue
    // )} field, please choose another value`

    customError.msg = "duplicate email"
    customError.statusCode = StatusCodes.BAD_REQUEST
  
  }

  if (err.name === 'CastError') {

    // customError.msg = `No item found with id : ${err.value}`
    
    customError.msg = "invalid id"
    customError.statusCode = StatusCodes.BAD_REQUEST
    
  }

  return res.status(customError.statusCode).json({ msg: customError.msg, isValid: customError.isValid })
}

module.exports = errorHandler
