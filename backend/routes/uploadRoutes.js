import express from 'express'
import multer from 'multer'
import path from 'path'
import asyncHandler from 'express-async-handler'
import {v2 as cloudinary} from 'cloudinary'


const router = express.Router()

//https://betterprogramming.pub/a-complete-guide-of-file-uploading-in-javascript-2c29c61336f5
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/') 
    },
    filename(req, file, cb){
        const filename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        cb(null, filename)
    }
})

function checkFileType(file, cb){
    const filetypes =  /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null, true)
    }else{
        cb('Image Only')
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
})


router.post('/', upload.single('image'), asyncHandler(async (req, res) => {
    const uploadPhoto = await cloudinary.uploader.upload(`${req.file.path}`)
    console.log(uploadPhoto)
    console.log(uploadPhoto.url)
    res.send(uploadPhoto.url)
}))

export default router