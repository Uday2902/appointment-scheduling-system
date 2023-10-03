const {StatusCodes} = require('http-status-codes')

const notFound = (req,res) => res.status(StatusCodes.NOT_FOUND).send('Route does not exist! Redirect to unity.com')

module.exports = notFound