//imports
require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const cors = require('cors')

const cookieParser = require('cookie-parser')

const connectDB = require('./db/connect')


//routes
const routes = require('./routes/index')


//middlewares
const middlewares  = require('./middlewares/index')


//variables
const PORT = process.env.PORT || 5000






//middlewares

// app.use(express.static('./public'))
app.use(cors())
app.use(express.json())
app.use(cookieParser())




//routes
app.use('/doctor', routes.doctor)
app.use('/patient', routes.patient)
app.use('/appointment', routes.appointment)
// app.use('/admin', routes.admin)



    //temp
      app.get('/', (req,res)=>{

          res.send("<h1>Appointment-Scheduling-System</h1>")

      })




//errors

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)





const start = async () => {

  try {

    await connectDB(process.env.MONGODB_URI);
    
    app.listen(PORT, () => console.log(`Server is running at http://127.0.0.1:${PORT}`) )

  } catch (error) {

    console.log(error)
  
  }
}
  
start()