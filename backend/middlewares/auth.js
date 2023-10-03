const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const auth = async (req, res, next) => {
  
    const { istoken, token, purpose, email, password } = req.body

    if(istoken == false)
    {
        next()
        return
    }


    // if (!token.startsWith('Bearer ')) {

    //     throw new UnauthenticatedError('Unauthenticated')
    // }


    // const payload = token.split(' ')[0]
    const payload = token


    try {

        const decoded = jwt.verify(payload, process.env.JWT_SECRET)
        
        const { mongoID, email } = decoded

        req.body["mongoID"] =  mongoID
        
        next()
    
    } catch (error) {

        throw new UnauthenticatedError('Not authorized to access this route')
    }
}

module.exports = auth
