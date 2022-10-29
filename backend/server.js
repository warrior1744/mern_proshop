import path from 'path'
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler} from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import {engine} from 'express-handlebars'
import cors from 'cors'

import {v2 as cloudinary} from 'cloudinary'
const app = express()


dotenv.config()
connectDB()
app.use(cors())
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json()) //accept json format in the body. replaced bodyParser.json() since the new release
app.use(express.urlencoded({extended: false}))

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
})

const __dirname = path.resolve()

// app.engine('handlebars', engine({ 
//     defaultLayout: "main"
//   }));
// app.set('views', path.join(__dirname, 'backend/views'));
// app.set('view engine', 'handlebars')

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}else{
    
    app.get('/', (req, res) => {
    res.send('API is running...')
})
}

//throw an error if the request is not found
app.use(notFound)
//send as JSON
app.use(errorHandler)

const PORT = process.env.PORT || 5000
//please see .env file on the root folder
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)