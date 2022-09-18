// commonJS style
// const express = require('express')
// const dotenv = require('dotenv')
// const products = require('./data/products')

//ECMAScript (ES) Modules in Node.js
import path from 'path'
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import colors from 'colors'

import {engine} from 'express-handlebars'
import cors from 'cors'

import pkg from 'cloudinary'
const cloudinary = pkg

// import products from './data/products.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler} from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'


dotenv.config()
connectDB()
const app = express()

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.json()) //accept json format in the body. replaced bodyParser.json() since the new release
app.use(express.urlencoded({extended: false}))

app.use('/api', cors())//chapter15

const __dirname = path.resolve() // D:\Dropbox\Dev\WebDev\MERN_E-commerce\proshop

app.engine('handlebars', engine({  //configure Handlebars view engine by specifing the default layout 'main'
    defaultLayout: "main"
  }));//you can change the extension to .hbs by giving a new instance {extname: '.hbs'}
app.set('view cache', true)
app.set('views', path.join(__dirname, 'backend/views'));
app.set('view engine', 'handlebars')

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