import jwt from 'jsonwebtoken'
import AsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = AsyncHandler(async( req, res, next) => {
    let token
    //req comes from frontend headers
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET) //{"id":"629751359154dc4ea66c7634","iat":1655352900,"exp":1657944900}
            req.user = await User.findById(decoded.id).select('-password') //eliminate password query
            next()
        }catch( error){
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token found')
    }
})

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('Not authorized as an Admin')
    }
}

export {protect, admin}