import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

// @desc get users api
// @route GET /api/users/
// @access Private/Admin
const getUsers = asyncHandler (async (req, res) =>{
    const users = await User.find({})
    res.json(users)
})

// @desc Auth user & get token
// @route GET /api/users/login
// @access Public
const authUser = asyncHandler (async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }) // equal to  User.findOne( { email: email })

    if(user && (await user.matchPassword(password))) { //compare the user iput password to the password in the db
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc GET user profile
// @route GET /api/users/profile
// @access Private (requires Token)
const getUserProfile = asyncHandler (async (req, res) => {

  const user = await User.findById(req.user._id)

  if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
  }else{
      res.status(404)
      throw new Error('user not found')
  }

})


// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler (async (req, res) => {
    const { name, email, password, isAdmin } = req.body
    const userExists = await User.findOne({ email }) // equal to  User.findOne( { email: email })

    if(userExists){
        res.status(400)
        throw new Error('user already exists')
    }

    const user = await User.create({
        name,
        email,
        password,
        isAdmin
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('invalid user data')
    }
})

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id) //you get logged in user id from the req.user data in protect middleware

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    }else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc delete an user
// @route DELETE /api/users/:id
// @access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        const userName = user.name
        await user.remove()
        res.json({ message: `The user ${userName} is removed`})
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})


// @desc GET an user by ID
// @route GET /api/users/:id
// @access Private/Admin

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error(`Failed retrieving ${user.name}'s information`)
    }
})

// @desc Update user by ID
// @route PUT /api/users/:id
// @access Private/Admin

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        user.name = req.body.name || user.name     //get req.body from user object
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error(`Failed updating ${user.name}`)
    }
})


export { getUsers, authUser, getUserProfile, registerUser, updateUserProfile, deleteUser, getUserById, updateUser}