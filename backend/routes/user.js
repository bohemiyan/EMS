const express = require('express')

// controller functions
const { loginUser, signupUser, updateUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// update route
router.put('/update', updateUser)

module.exports = router