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
import path from 'path'
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

app.use(express.static(path.join(__dirname,'./client/build')))

app.use('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})


const PORT = process.env.PORT || 8080

//routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/openai', openaiRoute)

app.listen(PORT, ()=>{
    console.log(`Listening at port ${PORT}`.bgCyan.white);
})