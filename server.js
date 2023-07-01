const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const authRoute = require('./routes/authRoute')
const openaiRoute = require('./routes/openaiRoutes')
const errorHandler = require('./middlewares/errorMiddleware')

//dotenv
dotenv.config()

//mongo connection
connectDB()

//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(errorHandler)

const PORT = process.env.PORT || 8080

//routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/openai', openaiRoute)

app.listen(PORT, ()=>{
    console.log(`Listening at port ${PORT}`.bgCyan.white);
})