const express = require('express')
const router = express.Router()
const {registerUser, aboutUser, loginUser, PostContact} = require('../Controller/UserCtrl')
const auth = require("../Middleware/auth")

router.post("/register",registerUser )
router.post("/signin", loginUser)
router.get("/abouts",auth, aboutUser)
router.post("/contact", auth, PostContact )
module.exports = router