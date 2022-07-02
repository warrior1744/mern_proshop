import asyncHandler from 'express-async-handler'


const uploadImage = asyncHandler(async(req, res) => {
    res.send(`/${req.file.path}`)
})


export { uploadImage}