import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {config} from'dotenv'
import morgan from 'morgan'
import userRoutes from'./routes/userRoutes.js'
import courseRoutes from './routes/course.route.js'
import paymentRoutes from './routes/payment.route.js'
import errorMiddleware from './middlewares/error.midleware.js'

config()
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(express.json())

app.use(cors({
    origin: [process.env.FRONTIED_URL],
    credentials: true
}))

app.use(cookieParser())

app.use(morgan('dev'))

app.use('/ping', function(req, res){
    res.send('/pong')
})

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/courses', courseRoutes)
app.use('/api/v1/payment', paymentRoutes)
 
app.all('*', (req, res)=>{
    res.status(400).send('OOPS! 404 page not found')

 })

 app.use(errorMiddleware)


export default app;