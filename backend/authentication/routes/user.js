const express = require('express')
const router = express.Router()
const {loginUser,signupUser,getUsers} = require('../controllers/userController')


router.post('/login',loginUser)


router.post('/signup',signupUser)

router.get('/all',getUsers)




module.exports = router