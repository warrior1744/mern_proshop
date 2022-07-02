import express from 'express'
import multer from 'multer'
import path from 'path'
import {uploadImage} from '../controllers/uploadController.js'

const router = express.Router()
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb){
        const filename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        console.log(`diskStorage filename >>> ${filename}`)
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

router.route('/').post(upload.single('image'), uploadImage)

export default router