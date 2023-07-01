import express from 'express'
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoute from './routes/authRoute';
import openaiRoute from './routes/openaiRoutes';
import errorHandler from './middlewares/errorMiddleware';
import path from 'path';
import { fileURLToPath } from 'url';


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